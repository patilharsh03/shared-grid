import Cell from "./Cell";

function Grid({ cells, onCellClick }) {
  return (
    <div className="grid grid-cols-30 gap-1">
      {cells.map((cell) => (
        <Cell
          key={`${cell.row}-${cell.col}`}
          cell={cell}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}

export default Grid;