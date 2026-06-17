function Leaderboard({ leaders }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        🏆 Leaderboard
      </h2>

      {leaders.length === 0 ? (
        <p className="text-slate-500">
          No claims yet
        </p>
      ) : (
        <div className="space-y-3">
          {leaders.map((player, index) => (
            <div
              key={player._id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-500 w-5">
                  {index + 1}
                </span>

                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: player.color,
                  }}
                />

                <span className="font-medium text-slate-800">
                  {player.name}
                </span>
              </div>

              <span className="font-bold text-slate-700">
                {player.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;