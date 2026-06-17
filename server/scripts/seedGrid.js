require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Cell = require("../models/Cell");

const GRID_SIZE = 30;

const seedGrid = async () => {
  try {
    await connectDB();

    await Cell.deleteMany();

    const cells = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        cells.push({
          row,
          col,
          ownerId: null,
          ownerName: null,
          ownerColor: null,
          claimedAt: null,
        });
      }
    }

    await Cell.insertMany(cells);

    console.log(`Created ${cells.length} cells`);

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);

    process.exit(1);
  }
};

seedGrid();