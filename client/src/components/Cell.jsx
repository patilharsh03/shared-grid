function Cell({ cell, onClick }) {
  const claimed = !!cell.ownerId;

  return (
    <button
      onClick={() => onClick(cell)}
      disabled={claimed}
      title={
        claimed
          ? `${cell.ownerName} owns this cell`
          : "Click to claim"
      }
      className={`
        w-7 h-7 md:w-8 md:h-8
        rounded-md
        border
        flex items-center justify-center
        text-[10px] font-bold
        transition-all duration-200

        ${
          claimed
            ? "text-white cursor-not-allowed border-transparent"
            : `
              bg-slate-100
              border-slate-200
              hover:bg-slate-200
              hover:scale-110
              hover:shadow-md
              active:scale-95
            `
        }
      `}
      style={{
        backgroundColor: claimed
          ? cell.ownerColor
          : undefined,
      }}
    >
      {claimed ? cell.ownerName?.charAt(0) : ""}
    </button>
  );
}

export default Cell;