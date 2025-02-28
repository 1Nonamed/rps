const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const playersSelectionSection = $("#playersSelection");
const playersSelectionSectionBtn = $("#playersSelection button");
const playersNameSection = $("#playersNameSection");
const playersNameSectionBtn = $("#playersNameSection button");
const gameSection = $("#game");

class Player {
  constructor() {
    this.name = "";
    this.score = 0;
    this.choice = "";
  }

  setName(name) {
    this.name = name;
  }
  setScore(score) {
    this.score = score;
  }
  setChoice(choice) {
    this.choice = choice;
  }

  getChoice() {
    let choices = $$("#game button");
    console.log(choices);
    choices.forEach((choice) => {
      console.log(choice.innerText);
      choice.addEventListener("click", () => {
        this.setChoice(choice);
        console.log(choice);
      });
    });
  }
}

class RPS {
  constructor() {
    this.round = 0;
    this.isGameOver = false;
    this.player1 = Player1;
    this.player2 = Player2;
    this.numberOfPlayers = null;
    this.numberOfRounds = null;
  }

  toggleHowToPlay() {
    const howToPlayBtn = $("header button");
    const howToPlayAside = $("aside");

    howToPlayBtn.addEventListener("click", () => {
      howToPlayAside.classList.toggle("hidden");
    });
    // PENDING: Toggle aside button icon when clicked
  }

  startGame() {
    this.round++;
    console.log("The game started!");

    this.toggleHowToPlay();
    this.setUpGame();
    this.setPlayersNames();
    Player1.getChoice();
  }

  setUpGame() {
    playersSelectionSectionBtn.addEventListener("click", () => {
      playersNameSection.style.display = "block";
    });
    playersNameSectionBtn.addEventListener("click", () => {
      playersSelectionSection.style.display = "none";
      playersNameSection.style.display = "none";
      gameSection.style.display = "block";
    });
  }

  setPlayersNames() {
    // const isTwoPlayers = $("#twoPlayers").checked;
    playersNameSectionBtn.addEventListener("click", () => {
      const player1Name = $("#player1").value;
      if (!player1Name) {
        Player1.setName("Player1");
      } else {
        Player1.setName(player1Name);
      }
    });
    this.player1 = Player1;

    // p2 is missing when input -- need to fix
    if (!Player2.name) {
      this.player2 = Player2.setName("Computer");
      this.numberOfPlayers = 1;
    }
  }

  getGameWinner() {
    return "Daniel";
  }
}
const Player1 = new Player();
const Player2 = new Player();

const game = new RPS();
game.startGame();
