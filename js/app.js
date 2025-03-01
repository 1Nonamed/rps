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
}

class RPS {
  constructor() {
    this.round = 0;
    this.isGameOver = false;
    this.player1 = Player1;
    this.player2 = Player2;
    this.numberOfPlayers = 1;
    this.numberOfRounds = 3;
    this.choices = ["rock", "paper", "scissors"];
  }

  toggleHowToPlay() {
    const howToPlayBtn = $("header button");
    const howToPlayAside = $("aside");

    howToPlayBtn.addEventListener("click", () => {
      howToPlayAside.classList.toggle("hidden");
    });
    // PENDING: Toggle aside button icon when clicked
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
        this.player1.setName("Player1");
      } else {
        this.player1.setName(player1Name);
      }
    });

    // p2 is missing when input -- need to fix
    // if (!Player2.name) {
    //   this.player2 = Player2.setName("Computer");
    //   this.numberOfPlayers = 1;
    // }
  }

  parseChoiceToEmoji(choice) {
    if (choice === "rock") return "✊🏼";
    if (choice === "paper") return "🖐🏼";
    return "✌🏼";
  }

  displayChoices(p1Choice, p2Choice) {
    const choices = $$(".choiceDisplay span");
    const [p1ChoiceSpan, p2ChoiceSpan] = choices
    p1ChoiceSpan.innerHTML = this.parseChoiceToEmoji(p1Choice);
    p2ChoiceSpan.innerHTML = this.parseChoiceToEmoji(p2Choice);
  }

  battle(player1Choice) {
    let CPUChoiceIndex = Math.floor(Math.random() * this.choices.length);
    let CPUChoice = this.choices[CPUChoiceIndex];
    this.player2.setChoice(CPUChoice);

    this.displayChoices(player1Choice, CPUChoice);

    switch (player1Choice + CPUChoice) {
      case "rockscissors":
      case "scissorspaper":
      case "paperrock":
        console.log("Player 1 Wins");
        this.player1.score++;
        break;

      case "rockpaper":
      case "scissorsrock":
      case "paperscissors":
        console.log("CPU Wins");
        this.player2.score++;
        break;
      default:
        console.log("Its a TIE");
        break;
    }
    this.round++;
  }

  getGameWinner() {
    return "Daniel";
  }

  startGame() {
    let battleBtn = $('[name="battle"]');
    let choicesOptions = $$("#gameButtons button");

    this.toggleHowToPlay();
    console.log("The game started!");

    this.setUpGame();
    this.setPlayersNames();

    choicesOptions.forEach((choice) => {
      choice.addEventListener("click", () => {
        this.player1.setChoice(choice.name);
        this.battle(this.player1.choice);
      });
    });
  }
}

const Player1 = new Player();
const Player2 = new Player();

const game = new RPS();
game.startGame();
