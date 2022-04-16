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

  return { board, renderBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const game = (() => {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
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

  const checkWinner = (marker) => {
    const horizontal = [0, 3, 6].map((i) => [i, i + 1, i + 2]);
    const vertical = [0, 1, 2].map((i) => [i, i + 3, i + 6]);
    const diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    const allWins = [...horizontal, ...vertical, ...diagonal];
    const board = gameBoard.board;

    const res = allWins.some((winCon) => {
      return (
        board[winCon[0]] == marker &&
        board[winCon[1]] == marker &&
        board[winCon[2]] == marker
      );
    });

    return res;
  };

  const playRound = (e) => {
    const boardPosition = e.target.getAttribute("data-position");

    if (gameBoard.board[boardPosition] !== "") {
      window.alert("Position already filled! Choose another one!");
      return;
    }

    gameBoard.board[boardPosition] = activePlayer.marker;
    e.target.textContent = activePlayer.marker;

    const isWinner = checkWinner(activePlayer.marker);

    if (isWinner) {
      console.log(`${activePlayer.name} wins the game!`);
      return;
    } else if (!gameBoard.board.includes("")) {
      console.log(`The game is a draw!`);
      return;
    } else {
      setActivePlayer();
    }
  };

  const playGame = () => {
    const boardItems = document.querySelectorAll(".board-item");

    boardItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        playRound(e);
      });
    });
  };

  return { start, activePlayer, setActivePlayer, playGame };
})();

game.start();
