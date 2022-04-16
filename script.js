// GAME BOARD OBJECT
const gameBoard = (() => {
  const board = new Array(9).fill("");

  const renderBoard = () => {
    const mainSection = document.querySelector(".main");

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

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }

    const boardItems = document.querySelectorAll(".board-item");
    boardItems.forEach((item) => {
      item.textContent = "";
    });
  };

  return { board, renderBoard, resetBoard };
})();

// DISPLAY CONTROLLER OBJECT
const displayController = (() => {
  const mainSection = document.querySelector(".main");

  const playerCards = (player1, player2) => {
    // Creates the players section
    const playersSection = document.createElement("div");
    playersSection.classList.add("players");
    mainSection.appendChild(playersSection);

    // Creates the player cards
    const playerOne = document.createElement("div");
    const playerTwo = document.createElement("div");
    playerOne.classList.add("player-card");
    playerTwo.classList.add("player-card");
    playerOne.setAttribute("id", "player-one");
    playerTwo.setAttribute("id", "player-two");
    playersSection.appendChild(playerOne);
    playersSection.appendChild(playerTwo);

    // Creates the card headers for player names
    const playerOneName = document.createElement("h2");
    playerOneName.textContent = `${player1.name} (${player1.marker})`;
    playerOne.appendChild(playerOneName);

    const playerTwoName = document.createElement("h2");
    playerTwoName.textContent = `${player2.name} (${player2.marker})`;
    playerTwo.appendChild(playerTwoName);

    // Creates paragraphs to show the player score
    const playerOneScore = document.createElement("p");
    playerOneScore.textContent = game.player1.score;
    playerOneScore.setAttribute("id", "player-one-score");
    playerOneScore.classList.add("player-score");
    playerOne.appendChild(playerOneScore);

    const playerTwoScore = document.createElement("p");
    playerTwoScore.textContent = game.player2.score;
    playerTwoScore.setAttribute("id", "player-two-score");
    playerTwoScore.classList.add("player-score");
    playerTwo.appendChild(playerTwoScore);
  };

  const updateScores = () => {
    const playerOneScore = document.getElementById("player-one-score");
    const playerTwoScore = document.getElementById("player-two-score");

    playerOneScore.textContent = game.player1.score;
    playerTwoScore.textContent = game.player2.score;
  };

  const setActiveCard = (player1, player2) => {
    const playerOne = document.getElementById("player-one");
    const playerTwo = document.getElementById("player-two");

    if (game.getActivePlayer() === player1) {
      playerOne.classList.add("active");
      playerTwo.classList.remove("active");
    } else {
      playerOne.classList.remove("active");
      playerTwo.classList.add("active");
    }
  };

  return {
    playerCards,
    updateScores,
    setActiveCard,
  };
})();

// PLAYER OBJECT
const Player = (name, marker) => {
  const score = 0;

  return { name, marker, score };
};

// GAME OBJECT
const game = (() => {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let activePlayer;

  const start = () => {
    gameBoard.renderBoard();
    displayController.playerCards(player1, player2);
    setActivePlayer();
    displayController.setActiveCard(player1, player2);
    playGame();
  };

  const setActivePlayer = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };

  const getActivePlayer = () => {
    return activePlayer;
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
      window.alert(`${activePlayer.name} wins this round!`);
      updateScore();
      gameBoard.resetBoard();
      return;
    } else if (!gameBoard.board.includes("")) {
      window.alert(`The game is a draw!`);
      gameBoard.resetBoard();
      return;
    } else {
      setActivePlayer();
    }
  };

  const updateScore = () => {
    if (activePlayer === player1) {
      player1.score++;
    } else {
      player2.score++;
    }

    displayController.updateScores();
  };

  const playGame = () => {
    const boardItems = document.querySelectorAll(".board-item");

    boardItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        playRound(e);
        displayController.setActiveCard(player1, player2);
      });
    });
  };

  return {
    player1,
    player2,
    start,
    getActivePlayer,
    setActivePlayer,
    playGame,
  };
})();

game.start();

const resetBoardBtn = document.getElementById("reset-board");
const resetScoreBtn = document.getElementById("reset-score");

resetBoardBtn.addEventListener("click", () => {
  gameBoard.resetBoard();
});

resetScoreBtn.addEventListener("click", () => {
  game.player1.score = 0;
  game.player2.score = 0;
  displayController.updateScores();
});
