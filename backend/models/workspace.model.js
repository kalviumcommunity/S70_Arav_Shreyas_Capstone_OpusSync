const mongoose = require("mongoose");
const { generateInviteCode } = require("../utils/uuid");

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false },

    // Reference to the owner of the workspace
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model (the workspace creator)
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      default: generateInviteCode,
    },
  },
  {
    timestamps: true,
  }
);

workspaceSchema.methods.resetInviteCode = function () {
  this.inviteCode = generateInviteCode();
};

const WorkspaceModel = mongoose.model("Workspace", workspaceSchema);

module.exports = WorkspaceModel;
