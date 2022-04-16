const gameBoard = (() => {
  const board = new Array(9).fill("");

  const renderBoard = () => {
    const mainSection = document.querySelector("main");

    const boardSection = document.createElement("div");
    boardSection.classList.add("board");
    mainSection.appendChild(boardSection);

    board.forEach((ele, i) => {
      const newBoardItem = document.createElement("div");
      newBoardItem.classList.add("board-item");
      newBoardItem.textContent = ele;
      newBoardItem.setAttribute("data-position", i);
      boardSection.appendChild(newBoardItem);
    });
  };

  const addMarker = (marker) => {
    const boardItems = document.querySelectorAll(".board-item");
    boardItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        boardPosition = e.target.getAttribute("data-position");
        board[boardPosition] = marker;
        e.target.textContent = marker;
      });
    });
  };

  return { board, renderBoard, addMarker };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const player1 = Player("player1", "X");
const player2 = Player("player2", "0");

gameBoard.renderBoard();
gameBoard.addMarker(player1.marker);
