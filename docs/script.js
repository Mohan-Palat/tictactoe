// Intialize local storage
localStorage["personTile"] = "circle";
localStorage["otherTile"] = "square";

const playSound = () => {
  let audio = document.getElementById("clickSound");
  audio.play();
};

const playSound2 = () => {
  let audio = document.getElementById("clickSound2");
  audio.play();
};

let playback = [];

//assign classes to tiles from local storage on refresh/load
document.querySelectorAll(".tile").forEach((element, index) => {
  element.children[0].className = localStorage[`tile${index}`];
});

// assign winning tile class styles/animation from local storage on refresh/load
document.querySelectorAll(".tile").forEach((element, index) => {
  if (parseInt(localStorage.wins1) === index) {
    element.children[0].id = "win";
  } else if (parseInt(localStorage.wins2) === index) {
    element.children[0].id = "win";
  } else if (parseInt(localStorage.wins3) === index) {
    element.children[0].id = "win";
  }
});

// reduce screen opacity and add alert element to dom
const dimScreen = (text) => {
  //prevent other buttons from being clicked when modal is open
  document.querySelector(".space1").style.pointerEvents = "none";
  document.querySelector("#newGame").style.pointerEvents = "none";

  document.querySelectorAll("body :not(.congrats").forEach((element) => {
    element.classList.add("dim");
  });
  document.querySelector(".congrats").classList.add("alert");
  document.querySelector("#congrats").innerHTML = text;
};

const clearModal = () => {
  document.querySelectorAll("body :not(.congrats").forEach((element) => {
    element.classList.remove("dim");
  });
  document.querySelector(".congrats").classList.remove("alert");
};
class Tally {
  constructor() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.ties = 0;
    this.roundWon = false;
    this.nextPlayer = "";
    this.mode = localStorage.mode;
    this.boardClear = true;
    this.names = [
      localStorage.name,
      this.mode === "self" ? "Other Person" : "Computer",
    ];
  }

  changeNextPlayer(nextt) {
    if (nextt) {
      this.nextPlayer = nextt;
    }
  }
  resetAll() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.ties = 0;
    this.roundWon = false;
    this.nextPlayer = "";
    this.mode = "";
    this.boardClear = true;
    this.names = ["", ""];
    clearAll();
    this.changeNextPlayer();
    this.chooseMode();
    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
  }
  updatePlayerScore() {
    this.playerScore += 1;
  }
  updateComputerScore() {
    this.computerScore += 1;
  }
  updateTies() {
    this.ties += 1;
  }
  updateBoardClear(update) {
    this.boardClear = update;
  }
  updatePlayerNames() {
    if (localStorage.mode === "self") {
      localStorage.otherPersonName = "Other Person";
    } else if (localStorage.mode === "comp") {
      localStorage.otherPersonName = "Computer";
    }

    document.querySelector("#playerName").innerHTML = localStorage.name;
    document.querySelector("#otherName").innerHTML =
      localStorage.otherPersonName;
    document.querySelector("#playerMode").innerHTML =
      localStorage.mode === "self"
        ? "Player vs Other Person"
        : localStorage.mode === "comp"
        ? "Player vs Computer"
        : "";
    document.getElementById("player").innerHTML = localStorage.playerScore;
    document.getElementById("computer").innerHTML = localStorage.computerScore;
    document.getElementById("ties").innerHTML = localStorage.ties;
  }
  chooseMode() {
    if (localStorage.getItem("mode") === null) {
      localStorage.playback = "";
      dimScreen(
        `<h1>What mode do you want to play?</h1><button type="button" id="self">Play against Others/Myself</button></button><button type="button" id="comp">Play against Computer</button></button>`
      );
    } else {
      return;
    }
  }
  chooseModeWithoutName() {
    localStorage.playback = "";
    dimScreen(
      `<h1>What mode do you want to play?</h1><button type="button" id="selfUpdate">Play against Others/Myself</button></button><button type="button" id="compUpdate">Play against Computer</button></button>`
    );
  }
  showWarning() {
    dimScreen(
      `<h1>This Round is over. Click the next round button to go to the next round</h1><button type="button" id="confirm">OK</button></button>`
    );
  }
  askPlayer() {
    dimScreen(
      `<h1>What is your name?</h1><input type="text" placeholder="enter name" autocomplete=${"off"} id="nameInput"><button type="button" id="submitName">Submit</button>`
    );
  }
  updateMode(mode) {
    this.mode = mode;
  }
}

const tally = new Tally();

tally.chooseMode();
tally.changeNextPlayer();
tally.updatePlayerNames();

//calculate what tile AI plays on
const nextTile = (blockTiles, emptyClasses, empty) => {
  let unOccupiedTiles = 0;
  let x = Math.floor(Math.random() * empty.length);

  // get the tiles classes that are free from array of tiles given
  for (let index = 0; index < blockTiles.length; index++) {
    if (emptyClasses.indexOf(blockTiles[index]) !== -1) {
      unOccupiedTiles += 1;
    }
  }
  if (unOccupiedTiles > 0) {
    for (let index = 0; index < blockTiles.length; index++) {
      if (emptyClasses.indexOf(blockTiles[index]) !== -1) {
        // play on the first one in array that is empty
        document.querySelector(`${blockTiles[index]}`).children[0].className =
          "square";
        const tileClass = blockTiles[index].substring(1);
        localStorage[`${tileClass}`] = localStorage.otherTile;
        playback.push(tileClass);
        localStorage.playback += `${tileClass},`;
        break;
      }
    }
  } else {
    // if none is unOcupied, play on any random tile.
    document.querySelector(`.tile${empty[x]}`).children[0].className = "square";
    playback.push(`tile${empty[x]}`);
    localStorage.playback += `tile${empty[x]}`;
    localStorage[`tile${empty[x]}`] = localStorage.otherTile;
  }
};

var empty = [];

function addSign(tile) {
  if (localStorage.mode === "self") {
    if (JSON.parse(localStorage.nextSymbol) === false) {
      playback.push(tile);
      localStorage.playback += `${tile},`;

      document.querySelector(`.${tile}`).children[0].className =
        localStorage.personTile;
      localStorage.nextSymbol = !!JSON.stringify("false");
      localStorage[`${tile}`] = localStorage.personTile;
    } else {
      playback.push(tile);
      localStorage.playback += `${tile},`;
      document.querySelector(`.${tile}`).children[0].className =
        localStorage.otherTile;

      localStorage.nextSymbol = !JSON.stringify("true");
      localStorage[`${tile}`] = localStorage.otherTile;
    }
  } else {
    document.querySelector(`.${tile}`).children[0].className =
      localStorage.personTile;
    playback.push(tile);
    localStorage.playback += `${tile},`;

    localStorage[`${tile}`] = localStorage.personTile;
    const list = document.querySelector("#board").children;
    const newList = Object.assign({}, list);

    for (const key in newList) {
      if (newList[key].firstElementChild.classList.length < 1) {
        empty.push(parseInt(key));
      }
    }

    let emptyClasses = empty.map((each) => {
      return `.tile${each}`;
    });

    if (tile === "tile0") {
      let blockTiles = [".tile2", ".tile8", ".tile1"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile1") {
      let blockTiles = [".tile2", ".tile7", ".tile0"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile3" || tile === "tile6") {
      let blockTiles = [".tile0", ".tile6", ".tile3", ".tile4", ".tile2"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile2" || tile === "tile5") {
      let blockTiles = [".tile8", ".tile5", ".tile2", ".tile4", ".tile6"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile7") {
      let blockTiles = [".tile1", ".tile6", ".tile4", ".tile7", ".tile2"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile4") {
      let blockTiles = [".tile5", ".tile6", ".tile4", ".tile7", ".tile8"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile8") {
      let blockTiles = [".tile0", ".tile6", ".tile2"];
      nextTile(blockTiles, emptyClasses, empty);
    } else {
      document.querySelector(`.tile${empty[x]}`).children[0].className =
        "square";

      localStorage[`tile${empty[x]}`] = localStorage.otherTile;
    }

    empty = [];
    emptyClasses = [];
  }
}

function clearAll() {
  document.querySelectorAll(".circle").forEach((element) => {
    if (element.classList.contains("circle")) {
      element.classList.remove("circle");
    }
  });

  document.querySelectorAll(".square").forEach((element) => {
    if (element.classList.contains("square")) {
      element.classList.remove("square");
    }
  });
  document.querySelectorAll("#win").forEach((element) => {
    element.id = "";
  });

  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((one, index) => {
    localStorage[`tile${one}`] = "";
  });

  localStorage.wins1 = "";
  localStorage.wins2 = "";
  localStorage.wins3 = "";
  playback = [];
  localStorage.removeItem("playback");
  localStorage.removeItem("winningSnapshot");
  document.getElementById("replay").classList.remove("visible");
}
const notEmpty = [];

const numWins = document.querySelectorAll("#win").forEach((element) => {
  if (element !== "") {
    notEmpty.push(element);
  }
});

document.querySelector("#board").addEventListener("click", function (e) {
  if (e.target.className === "circle" || e.target.className === "square") {
    return;
  } else if (
    e.target.firstElementChild.classList[0] === "circle" ||
    e.target.firstElementChild.classList[0] === "square"
  ) {
    return;
  } else {
    if (!tally.boardClear || notEmpty > 0) {
      tally.showWarning();
    } else {
      setTimeout(() => {
        for (let index = 0; index < 9; index++) {
          if (e.target.className === `tile tile${index}`) {
            addSign(e.target.classList[1]);
          }
        }
      }, 10);

      var tileElements = [];

      function getTiles() {
        setTimeout(function () {
          const list = document.querySelector("#board").children;
          const newList = Object.assign({}, list);
          //get each tile's firstchild classname (to know which player played on the tile)
          for (const key in newList) {
            tileElements.push(newList[key].firstElementChild.className);
          }

          scoreTiles();
        }, 10);
      }

      getTiles();

      let winningTileValues = [];

      function checkScoreCircles(arr, check1, check2, check3) {
        if (arr[check1] + arr[check2] + arr[check3] === "circlecirclecircle") {
          winningTileValues.push(check1);
          winningTileValues.push(check2);
          winningTileValues.push(check3);
          return "circle";
        }
      }

      function checkScoreSquares(arr, check1, check2, check3) {
        if (arr[check1] + arr[check2] + arr[check3] === "squaresquaresquare") {
          winningTileValues.push(check1);
          winningTileValues.push(check2);
          winningTileValues.push(check3);
          return "square";
        }
      }

      function scoreTiles() {
        const squareTiles = document.querySelectorAll(".square").length;
        const circleTiles = document.querySelectorAll(".circle").length;
        const bothTiles = squareTiles + circleTiles;

        const functionArr = [
          checkScoreCircles(tileElements, 0, 1, 2),
          checkScoreCircles(tileElements, 3, 4, 5),
          checkScoreCircles(tileElements, 6, 7, 8),
          checkScoreCircles(tileElements, 1, 4, 7),
          checkScoreCircles(tileElements, 2, 5, 8),
          checkScoreCircles(tileElements, 0, 3, 6),
          checkScoreCircles(tileElements, 2, 4, 6),
          checkScoreCircles(tileElements, 0, 4, 8),

          checkScoreSquares(tileElements, 0, 1, 2),
          checkScoreSquares(tileElements, 3, 4, 5),
          checkScoreSquares(tileElements, 6, 7, 8),
          checkScoreSquares(tileElements, 1, 4, 7),
          checkScoreSquares(tileElements, 2, 5, 8),
          checkScoreSquares(tileElements, 0, 3, 6),
          checkScoreSquares(tileElements, 2, 4, 6),
          checkScoreSquares(tileElements, 0, 4, 8),
        ];

        const allEqual = (arr) => arr.every((v) => v === arr[0]);
        //loop through and break when any winning permutation is returned
        for (i = 0; i < functionArr.length; i++) {
          if (functionArr.indexOf("circle") !== -1) {
            playSound2();
            document.querySelector(
              `.tile${winningTileValues[0]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[1]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[2]}`
            ).children[0].id = "win";
            localStorage.wins1 = winningTileValues[0];
            localStorage.wins2 = winningTileValues[1];
            localStorage.wins3 = winningTileValues[2];

            let m = localStorage.playback;
            n = m.split(",");
            n.pop();

            //localStorage.winningSnapshot = JSON.stringify(playback);
            localStorage.winningSnapshot = JSON.stringify(n);
            setTimeout(() => {
              dimScreen(
                `<h1>${localStorage.name} Wins this round!</h1>${
                  localStorage.mode === "self"
                    ? `<p>${localStorage.otherPersonName} gets to start the next turn </p>`
                    : ""
                } <button type="button" id="next">Next Round</button></button><a href="#">Go back to board</a>`
              );
            }, 400);

            localStorage.playerScore++;

            document.getElementById("player").innerHTML =
              localStorage.playerScore;

            tally.changeNextPlayer(localStorage.personTile);

            break;
          } else if (functionArr.indexOf("square") !== -1) {
            playSound2();
            document.querySelector(
              `.tile${winningTileValues[0]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[1]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[2]}`
            ).children[0].id = "win";

            localStorage.wins1 = winningTileValues[0];
            localStorage.wins2 = winningTileValues[1];
            localStorage.wins3 = winningTileValues[2];
            // localStorage.winningSnapshot = JSON.stringify(playback);
            let m = localStorage.playback;
            n = m.split(",");
            n.pop();

            localStorage.winningSnapshot = JSON.stringify(n);
            setTimeout(() => {
              dimScreen(
                `<h1>${localStorage.otherPersonName} Wins this round!</h1><p>${
                  localStorage.mode === "self"
                    ? localStorage.name
                    : localStorage.otherPersonName
                } gets to start the next turn</p><button type="button" id="next">Next Round</button></button><a href="#">Go back to board</a>`
              );
            }, 400);

            localStorage.computerScore++;

            tally.updateComputerScore();
            document.getElementById("computer").innerHTML =
              localStorage.computerScore;
            if (localStorage.mode === "comp") {
              tally.changeNextPlayer(localStorage.otherTile);
            }

            break;
          }
        }

        // if all the values in funtionArr are undefined(gotten if neither circle or square combinations are found) and if all tiles are occupied, declare a tie)
        if (allEqual(functionArr) && bothTiles === 9) {
          playSound();
          //localStorage.winningSnapshot = JSON.stringify(playback);
          localStorage.nextSymbol = !JSON.stringify("true");
          dimScreen(
            `<h1>This round ends in a tie!!</h1><p>${localStorage.name} gets to start the next turn</p><button type="button" id="next">start next round now</button></button><a href="#">Go back to board</a>`
          );
          tally.nextPlayer = "circle";
          localStorage.ties++;
          document.getElementById("ties").innerHTML = localStorage.ties;
          let m = localStorage.playback;
          n = m.split(",");
          n.pop();

          localStorage.winningSnapshot = JSON.stringify(n);
        }
      }
      scoreTiles();
    }
  }
});

document.querySelector("#congrats").addEventListener("click", function (e) {
  document.querySelector(".space1").style.pointerEvents = "auto";
  document.querySelector("#newGame").style.pointerEvents = "auto";
  if (e.target.id === "next") {
    playback = [];
    localStorage.removeItem("winningSnapshot");
    document.getElementById("replay").classList.remove("visible");

    clearModal();
    clearAll();
    let x = Math.floor(Math.random() * 8);
    if (tally.nextPlayer === "square" && localStorage.mode === "comp") {
      document.querySelector(
        `.tile${x}`
      ).children[0].className = `${tally.nextPlayer}`;
      localStorage[`tile${x}`] = tally.nextPlayer;
      playback.push(`tile${x}`);
      localStorage.playback += `tile${x},`;
    }
  } else if (e.target.tagName === "A") {
    clearModal();
    tally.updateBoardClear(false);
    document.querySelector("#clear").classList.add("button-anim");
    document.getElementById("replay").classList.add("visible");
  } else if (e.target.id === "self") {
    localStorage.nextSymbol = !JSON.stringify("true");
    tally.updateMode("self");
    clearModal();
    document.getElementById("playerMode").innerHTML =
      "Player vs Other Player/Self";
    localStorage.setItem("mode", "self");
    localStorage.setItem(
      "otherName",
      localStorage.mode === "self"
        ? "Other Person"
        : localStorage.mode === "comp"
        ? "Computer"
        : ""
    );
    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
    //tally.updatePlayerNames();
    tally.askPlayer();
  } else if (e.target.id === "comp") {
    tally.updateMode("comp");
    clearModal();
    document.getElementById("playerMode").innerHTML = "Player vs Computer";
    localStorage.setItem("mode", "comp");
    localStorage.setItem(
      "otherName",
      localStorage.mode === "self"
        ? "Other Person"
        : localStorage.mode === "comp"
        ? "Computer"
        : ""
    );
    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
    //tally.updatePlayerNames();
    tally.askPlayer();
  } else if (e.target.id === "selfUpdate") {
    localStorage.removeItem("winningSnapshot");
    localStorage.nextSymbol = !JSON.stringify("true");
    playback = [];
    document.getElementById("replay").classList.remove("visible");
    localStorage.mode = "self";
    clearModal();

    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
    tally.updatePlayerNames();
    tally.boardClear = true;
  } else if (e.target.id === "compUpdate") {
    localStorage.mode = "comp";
    localStorage.removeItem("winningSnapshot");
    playback = [];
    document.getElementById("replay").classList.remove("visible");
    clearModal();

    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
    tally.updatePlayerNames();
    tally.boardClear = true;
  } else if (e.target.id === "confirm") {
    clearModal();
  } else if (e.target.id === "submitName") {
    const value = document.querySelector("#nameInput").value;
    localStorage.name = value;

    tally.updatePlayerNames();
    clearModal();
  }
});

document.querySelector("#space").addEventListener("click", function (e) {
  if (e.target.id === "clear") {
    clearAll();
    if (e.target.classList.contains("button-anim")) {
      e.target.classList.remove("button-anim");
    }
    document.getElementById("replay").classList.remove("visible");
    tally.updateBoardClear(true);
    localStorage.playback = "";
  } else if (e.target.id === "changeName") {
    tally.askPlayer();
    if (!tally.boardClear) {
      clearAll();
      tally.boardClear = !tally.boardClear;
    }
  } else if (e.target.id === "changeMode") {
    if (document.getElementById("clear").classList.contains("button-anim")) {
      document.getElementById("clear").classList.remove("button-anim");
    }
    tally.chooseModeWithoutName();
    clearAll();
  }
});

document.querySelector("#replay").addEventListener("click", function (e) {
  document.getElementById("newGame").style.pointerEvents = "none";
  let z = JSON.parse(localStorage.winningSnapshot);
  let replayIndexes = z.map((each) => {
    return parseInt(each[each.length - 1]);
  });

  document.querySelectorAll("body section:not(#playback").forEach((element) => {
    element.classList.add("dim");
  });
  document.querySelector("#playback").classList.add("replay-add");

  setTimeout(() => {
    let interval = 1000;
    replayIndexes.forEach((element, index) => {
      setTimeout(function () {
        document.querySelectorAll(".tileReplay")[
          element
        ].children[0].className =
          document.querySelectorAll(".tile")[element].children[0].className ===
          "circle"
            ? "circleReplay"
            : document.querySelectorAll(".tile")[element].children[0]
                .className === "square"
            ? "squareReplay"
            : "";
      }, index * interval);
    });

    setTimeout(() => {
      document.querySelectorAll(`.tileReplay`)[
        localStorage.wins1
      ].children[0].id = "win";
      document.querySelectorAll(`.tileReplay`)[
        localStorage.wins2
      ].children[0].id = "win";
      document.querySelectorAll(`.tileReplay`)[
        localStorage.wins3
      ].children[0].id = "win";
    }, replayIndexes.length * 1000);

    setTimeout(() => {
      document.querySelector(".closeReplay").classList.add("visible");
    }, replayIndexes.length * 900);
  }, 900);
});

document.querySelector("#closeReplay").addEventListener("click", function (e) {
  document.getElementById("newGame").style.pointerEvents = "auto";

  document.querySelectorAll("body section:not(#playback").forEach((element) => {
    element.classList.remove("dim");
  });
  document.querySelector("#playback").classList.remove("replay-add");
  document.querySelectorAll(".tileReplay").forEach((element, index) => {
    element.children[0].className = "";
  });

  document.querySelectorAll(`.tileReplay`).forEach((element, index) => {
    element.children[0].id = "";
  });
  document.querySelector(".closeReplay").classList.remove("visible");
});

document.querySelector("#newGame").addEventListener("click", function (e) {
  if (document.getElementById("clear").classList.contains("button-anim")) {
    document.getElementById("clear").classList.remove("button-anim");
  }
  tally.resetAll();
  localStorage.removeItem("mode");
  tally.chooseMode();
});
