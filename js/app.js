const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const playersSelectionSection = $("#playersSelection");
const playersSelectionSectionBtn = $("#playersSelection button");
const playersNameSection = $("#playersNameSection");
const playersNameSectionBtn = $("#playersNameSection button");


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
    const gameSection = $("#game");
    playersSelectionSectionBtn.addEventListener("click", () => {
      playersNameSection.style.display = "block";
    });
    playersNameSectionBtn.addEventListener("click", () => {
      playersSelectionSection.style.display = "none";
      playersNameSection.style.display = "none";
      gameSection.style.display = "flex";
    });
  }

  setPlayersNames() {
    // const isTwoPlayers = $("#twoPlayers").checked;
    let playersNameSpan = $$("#playersName span");
    console.log(playersNameSpan)
    playersNameSectionBtn.addEventListener("click", () => {
      const player1Name = $("#player1").value;
      if (!player1Name) {
        this.player1.setName("Player1");
      } else {
        this.player1.setName(player1Name);
        playersNameSpan[0].innerHTML = player1Name;
      }
      this.player2.setName("CPU");
      playersNameSpan[1].innerHTML = "CPU"
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
    $('#roundNumber').innerHTML = this.round;
  }

  battle(player1Choice) {
    let player2ChoiceIndex = Math.floor(Math.random() * this.choices.length);
    let player2Choice = this.choices[player2ChoiceIndex];
    this.player2.setChoice(player2Choice);

    this.displayChoices(player1Choice, player2Choice);

    switch (player1Choice + player2Choice) {
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
    this.displayRound()
  }

  getGameWinner() {
    return "Daniel";
  }

  startCountdown(el, cb) {
    let countdown = 3;
    el.classList.remove("hidden");
    el.innerHTML = countdown;

    let interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);
        el.classList.add("hidden");
        $('#choicesDisplay').classList.remove('hidden')
        $('#choicesDisplay').classList.add('flex')
        cb();
      } else {
        el.innerHTML = countdown;
      }
    }, 1000);
  }
  
  startGame() {
    let battleBtn = $('[name="battle"]');
    let choicesOptions = $$("#gameButtons button");
    let countdownSpan = $("#countdown");
    
    this.toggleHowToPlay();
    console.log("The game started!");
    
    this.setUpGame();
    this.setPlayersNames();
    
    choicesOptions.forEach((choice) => {
      choice.addEventListener("click", () => {
        this.player1.setChoice(choice.name);
      });
    });
    
    battleBtn.addEventListener("click", () => {
      $('#choicesDisplay').classList.add('hidden')
      this.startCountdown(countdownSpan, () => {
        if (!this.player1.choice) {
          let randomChoiceIndex = Math.floor(
            Math.random() * this.choices.length
          );
          this.player1.setChoice(this.choices[randomChoiceIndex]);
        }
        this.battle(this.player1.choice);
      });
    });
  }
}

const Player1 = new Player();
const Player2 = new Player();

const game = new RPS();
game.startGame();
