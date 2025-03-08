const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

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
    const numberOfPlayersSection = $("#numberOfPlayers");
    const numberOfPlayersBtn = $("#numberOfPlayersBtn");
    const namesSection = $("#namesSection");
    const namesSectionBtn = $("#namesSectionBtn");
    const gameSection = $("#game");
    const twoPlayersRadio = $("#twoPlayers");
    const twoPlayersInput = $("#player2Input");

    // Show number of players section
    numberOfPlayersBtn.addEventListener("click", () => {
      // Show player 2 input when two players are selected
      if (twoPlayersRadio.checked) {
        twoPlayersInput.style.display = "flex";
        this.numberOfPlayers = 2;
      } else {
        twoPlayersInput.style.display = "none";
      }
      namesSection.style.display = "block";
    });

    // Show game section after names are set
    namesSectionBtn.addEventListener("click", () => {
      numberOfPlayersSection.style.display = "none";
      namesSection.style.display = "none";

      this.setPlayersNames();

      gameSection.style.display = "flex";
    });
  }

  setPlayersNames() {
    let playersNameSpan = $$("#playersName span");
    let player1Name = $("#player1").value;
    let player2Name = $("#player2").value;

    this.player1.setName(player1Name);
    playersNameSpan[0].innerHTML = player1Name;

    if (!player1Name) {
      this.player1.setName("Player 1");
      playersNameSpan[0].innerHTML = "Player 1";
    }

    // Player vs CPU
    if (this.numberOfPlayers === 1) {
      this.player2.setName("CPU");
      playersNameSpan[1].innerHTML = "CPU";
    }

    // Player vs Player
    if (this.numberOfPlayers === 2) {
      this.player2.setName(player2Name);
      playersNameSpan[1].innerHTML = player2Name;

      if (!player2Name) {
        this.player2.setName("Player 2");
        playersNameSpan[1].innerHTML = "Player 2";
      }
    }
  }

  parseChoiceToEmoji(choice) {
    if (choice === "rock") return "✊🏼";
    if (choice === "paper") return "🖐🏼";
    return "✌🏼";
  }

  displayChoices(p1Choice, p2Choice) {
    const choices = $$(".choiceDisplay span");
    const [p1ChoiceSpan, p2ChoiceSpan] = choices;
    p1ChoiceSpan.innerHTML = this.parseChoiceToEmoji(p1Choice);
    p2ChoiceSpan.innerHTML = this.parseChoiceToEmoji(p2Choice);
  }

  displayScores(p1Score, p2Score) {
    console.log(p1Score, p2Score);
    const scores = $$("#playerScore span");
    const [p1ScoreSpan, p2ScoreSpan] = scores;
    p1ScoreSpan.innerHTML = p1Score;
    p2ScoreSpan.innerHTML = p2Score;
  }

  displayRound() {
    this.round++;
    $("#roundNumber").innerHTML = this.round;
  }

  battle() {
    let player2ChoiceIndex = Math.floor(Math.random() * this.choices.length);
    let player2Choice = this.choices[player2ChoiceIndex];
    this.player2.setChoice(player2Choice);

    this.displayChoices(this.player1.choice, player2Choice);

    switch (this.player1.choice + player2Choice) {
      case "rockscissors":
      case "scissorspaper":
      case "paperrock":
        console.log("Player 1 Wins");
        this.player1.score++;
        this.displayScores(this.player1.score, this.player2.score);
        break;

      case "rockpaper":
      case "scissorsrock":
      case "paperscissors":
        console.log("CPU Wins");
        this.player2.score++;
        this.displayScores(this.player1.score, this.player2.score);
        break;
      default:
        console.log("Its a TIE");
        break;
    }
    this.displayRound();
  }

  // getRoundWinner() {
  //   if (this.player1.score > Math.ceil(this.numberOfRounds / 2)) {
  //     return this.player1.name;
  //   } else {
  //     return this.player2.name;
  //   }
  // }

  // getGameWinner() {

  // }

  startCountdown(el, cb) {
    let countdown = 3;
    el.classList.remove("hidden");
    el.innerHTML = countdown;

    let interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);
        el.classList.add("hidden");
        $("#choicesDisplay").classList.remove("hidden");
        $("#choicesDisplay").classList.add("flex");
        cb();
      } else {
        el.innerHTML = countdown;
      }
    }, 1000);
  }

  startGame() {
    let battleBtn = $("#battle");
    let choicesOptions = $$("#gameButtons button");
    let countdownSpan = $("#countdown");

    this.toggleHowToPlay();
    console.log("The game started!");

    this.setUpGame();
    // this.setPlayersNames();

    choicesOptions.forEach((choice) => {
      choice.addEventListener("click", () => {
        this.player1.setChoice(choice.name);
      });
    });

    battleBtn.addEventListener("click", () => {
      choicesOptions.forEach((choice) => {
        choice.disabled = false;
      });
      $("#choicesDisplay").classList.add("hidden");
      this.startCountdown(countdownSpan, () => {
        if (!this.player1.choice) {
          let randomChoiceIndex = Math.floor(
            Math.random() * this.choices.length
          );
          this.player1.setChoice(this.choices[randomChoiceIndex]);
        }
        this.battle();
      });
    });
  }
}

const Player1 = new Player();
const Player2 = new Player();

const game = new RPS();
game.startGame();
