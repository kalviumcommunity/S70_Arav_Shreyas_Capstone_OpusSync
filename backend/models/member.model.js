
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    // Reference to the user who is a member of the workspace
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the workspace the user is a member of
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    // Reference to the role of the user in the workspace
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel = mongoose.model("Member", memberSchema);
module.exports = MemberModel;

