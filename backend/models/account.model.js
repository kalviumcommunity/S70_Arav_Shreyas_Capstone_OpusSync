/* This JavaScript code snippet is defining a Mongoose schema for an "Account" model. Here's a
breakdown of what each part of the code is doing: */
const mongoose = require('mongoose')
const  ProviderEnum  = require("../enums/account-provider.enum");

const accountSchema = new mongoose.Schema(
    {
      // Reference to the user who owns the account
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      provider: {
        type: String,
        enum: Object.values(ProviderEnum),
        required: true,
      },
      providerId: {
        type: String,
        required: true,
        unique: true,
      },
      refreshToken: { type: String, default: null },
      tokenExpiry: { type: Date, default: null },
    },
    {
      timestamps: true,
      toJSON: {
        transform(doc, ret) {
          delete ret.refreshToken;
        },
      },
    }
  );

  const AccountModel = mongoose.model("Account", accountSchema);
module.exports = AccountModel;
