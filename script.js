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

  const setMarker = (marker) => {
    const boardItems = document.querySelectorAll(".board-item");
    boardItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        boardPosition = e.target.getAttribute("data-position");

        console.log(boardPosition);
        if (board[boardPosition] !== "") {
          window.alert("You can not chose that posiotion. Already marked!");
          return;
        }
        board[boardPosition] = marker;
        console.log(gameBoard.board);
        e.target.textContent = marker;
      });
    });
  };

  return { board, renderBoard, setMarker };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const game = (() => {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "0");
  let activePlayer;
  let winner;

  const start = () => {
    gameBoard.renderBoard();
    setActivePlayer();
    playGame();
  };

  const setActivePlayer = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };

  const checkWinner = () => {
    board = gameBoard.board;

    winningCombinations = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    if (winningCombinations.includes(["X", "X", "X"])) {
      winner = player1;
    } else if (winningCombinations.includes(["0", "0", "0"])) {
      winner = player2;
    }
  };

  const playGame = () => {
    gameBoard.setMarker(activePlayer.marker);
    checkWinner();

    if (winner === player1) {
      console.log(`${player1.name} has won the game!`);
      return;
    } else if (winner === player2) {
      console.log(`${player2} has won the game!`);
      return;
    } else if (!gameBoard.board.includes("")) {
      console.log(`The game is a draw!`);
      return;
    }
  };

  return { start, activePlayer, setActivePlayer, playGame };
})();

game.start();
