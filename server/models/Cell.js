const mongoose = require("mongoose");

const cellSchema = new mongoose.Schema(
    {
        row: {
            type: Number,
            required: true,
        },

        col: {
            type: Number,
            required: true,
        },

        ownerId: {
            type: String,
            default: null,
        },

        ownerName: {
            type: String,
            default: null,
        },

        ownerColor: {
            type: String,
            default: null,
        },

        claimedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

cellSchema.index(
    { row: 1, col: 1 },
    { unique: true }
);

module.exports = mongoose.model("Cell", cellSchema);