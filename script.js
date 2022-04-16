const gameBoard = (() => {
  const board = new Array(9).fill("");

  const renderBoard = () => {
    const mainSection = document.querySelector("main");

    const boardSection = document.createElement("div");
    boardSection.classList.add("board");
    mainSection.appendChild(boardSection);

    board.forEach((ele) => {
      const newBoardItem = document.createElement("div");
      newBoardItem.classList.add("board-item");
      newBoardItem.textContent = ele;
      boardSection.appendChild(newBoardItem);
    });
  };

  return { board, renderBoard };
})();

gameBoard.renderBoard();
