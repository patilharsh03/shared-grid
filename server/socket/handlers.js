const Cell = require("../models/Cell");

const sendLeaderboard = async (io) => {
  const leaders = await Cell.aggregate([
    {
      $match: {
        ownerId: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$ownerId",
        name: { $first: "$ownerName" },
        color: { $first: "$ownerColor" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);

  io.emit("leaderboard_updated", leaders);
};

const registerSocketHandlers = (io, socket) => {
  socket.on("get_grid", async () => {
    try {
      const cells = await Cell.find().lean();

      socket.emit("grid_state", cells);

      await sendLeaderboard(io);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("claim_cell", async (data) => {
    try {

      const { row, col, userId, name, color } = data;

      const updatedCell = await Cell.findOneAndUpdate(
        {
          row,
          col,
          ownerId: null,
        },
        {
          ownerId: userId,
          ownerName: name,
          ownerColor: color,
          claimedAt: new Date(),
        },
        {
          new: true,
        }
      );

      if (!updatedCell) {
        socket.emit("claim_error", {
          message: "Cell already claimed",
        });

        return;
      }

      io.emit("cell_updated", updatedCell);
      await sendLeaderboard(io);
    } catch (error) {
      console.error(error);

      socket.emit("claim_error", {
        message: "Failed to claim cell",
      });
    }
  });
};

module.exports = registerSocketHandlers;