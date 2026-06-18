import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { socket } from "./services/socket";
import { getUser } from "./utils/user";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [cells, setCells] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const user = getUser();

  useEffect(() => {
    socket.emit("get_grid");

    socket.on("grid_state", (data) => {
      setCells(data);
      setLoading(false);
    });

    socket.on("cell_updated", (updatedCell) => {

      setCells((prev) =>
        prev.map((cell) =>
          cell.row === updatedCell.row &&
            cell.col === updatedCell.col
            ? updatedCell
            : cell
        )
      );
    });

    socket.on("leaderboard_updated", (data) => {
      setLeaders(data);
    })

    socket.on("claim_error", (error) => {
      setError(error.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    });

    return () => {
      socket.off("grid_state");
      socket.off("cell_updated");
      socket.off("claim_error");
      socket.off("leaderboard_updated");
    };
  }, []);

  const handleCellClick = (cell) => {
    socket.emit("claim_cell", {
      row: cell.row,
      col: cell.col,
      userId: user.id,
      name: user.name,
      color: user.color,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-600">
            Waking up server...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Shared Grid
            </h1>

            <p className="text-slate-500 mt-1">
              Claim cells in real time
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm px-4 py-3">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: user.color,
                }}
              />

              <div>
                <p className="text-xs text-slate-500">
                  You are
                </p>

                <p className="font-semibold text-slate-800">
                  {user.name}
                </p>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 overflow-auto">
            <Grid
              cells={cells}
              onCellClick={handleCellClick}
            />
          </div>

          <Leaderboard leaders={leaders} />
        </div>
      </div>
    </div>
  );
}

export default App;