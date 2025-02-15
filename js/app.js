const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const weaponsPlayer1 = $$("[title= weaponPlayer1]");

console.log(weaponsPlayer1);

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.weapon = "";
  }
  setWeapon(weapon) {
    this.weapon = weapon;
  }
}

class Rock {
    constructor() {
        this.beats = "scissors";
    }
}

class RPS {
  constructor() {
    this.rock = "rock";
    this.paper = "paper";
    this.scissors = "scissors";
    this.isGameOver = false;
    this.round = 0;
    this.numberOfRounds = 3;
    this.numberOfPlayers = 1;
    this.player1 = Player;
    this.player2 = Player || "Computer";
  }
  startGame() {
    this.round++;
    this.player1 = new Player("Player1", 0);
    if (this.numberOfPlayers === 1) {
      this.player2 = new Player("Computer", 0);
    } else {
      this.player2 = new Player("Player2", 0);
    }
  }
  getGameWinner() {
    return "Daniel";
  }
}

const Player1 = new Player("Daniel", 0);
console.log(Player1);

weaponsPlayer1.forEach((weapon) => {
  weapon.addEventListener("click", () => {
    console.log("test");
    Player1.setWeapon(weapon.innerText);
  });
});
