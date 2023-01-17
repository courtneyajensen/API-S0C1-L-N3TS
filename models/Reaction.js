const { Schema } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 300,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = reactionSchema;