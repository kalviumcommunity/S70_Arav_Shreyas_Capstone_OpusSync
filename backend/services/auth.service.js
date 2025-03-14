const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const AccountModel = require("../models/account.model");
const WorkspaceModel = require("../models/workspace.model");
const RoleModel = require("../models/roles-permission.model");
const { Roles } = require("../enums/role.enum");
const { NotFoundException } = require("../utils/appError");
const MemberModel = require("../models/member.model");
const { ProviderEnum } = require("../enums/account-provider.enum");

const loginOrCreateAccountService = async (data) => {
    const { providerId, provider, displayName, email, picture } = data;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        console.log("Started Session...");

        let user = await UserModel.findOne({ email }).session(session);

        if (!user) {
            user = new UserModel({
                email,
                name: displayName,
                profilePicture: picture || null,
            });
            await user.save({ session });

            const account = new AccountModel({
                userId: user._id,
                provider: provider,
                providerId: providerId,
            });
            await account.save({ session });

            const workspace = new WorkspaceModel({
                name: `My Workspace`,
                description: `Workspace created for ${user.name}`,
                owner: user._id,
            });
            await workspace.save({ session });

            const ownerRole = await RoleModel.findOne({ name: Roles.OWNER }).session(session);

            if (!ownerRole) {
                throw new NotFoundException("Owner role not found");
            }

            const member = new MemberModel({
                userId: user._id,
                workspaceId: workspace._id,
                role: ownerRole._id,
                joinedAt: new Date(),
            });
            await member.save({ session });

            user.currentWorkspace = workspace._id;
            await user.save({ session });
        }

        await session.commitTransaction();
        console.log("End Session...");
        return { user };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

module.exports = { loginOrCreateAccountService };