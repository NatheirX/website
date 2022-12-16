// const values for normal 52 card deck
const types = ["hearts", "spades", "clover", "diamonds"];
const nums = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

// getting values
const balance = document.querySelector("#bal");
const cards = document.querySelector(".cards");
const dealerValue = document.querySelector("#Dealer-value");
const value = document.querySelector("#value");
const winner = document.querySelector("#announcement");
const always_bet = 100;
// const for betting
const bet_up = document.querySelector(".bet-btn-up");
const bet_down = document.querySelector(".bet-btn-down");
const bet_amount = document.querySelector("#money");
// creating and shuffling deck
let deck = new Deck();
shuffleArray(deck.deck);
let bettable = true;
let turn = 0;

// initiating the player and dealer
let player = new Player();
let dealer = new Dealer();

// calculating probability
const prob = document.querySelector("#prob");
const probWinning = document.querySelector("#proba");

// used for calculating dealer cards
let doable = true;
show_deck();
// hit and stay buttons
const hit = document.querySelector(".hit");
const stay = document.querySelector(".stay");

hit.addEventListener("click", function () {
  remove_all_cards();
  if (dealer.cards.length == 0) {
    dealer.cards.push(draw_card());
    dealer.value = calculate(dealer.cards);
    dealerValue.textContent = dealer.value;
    cards.textContent -= 2;
    dealer.cards.push(deck.deck.shift());
    dealer.hidden_value = calculate(dealer.cards, dealer.hidden_value);
  }
  if (player.playable == true && player.value < 21) {
    if (player.cards.length < 2) {
      for (let i = 0; i < 2; i++) {
        player.cards.push(draw_card());
        player.value = calculate(player.cards, player.value);
        cards.textContent -= 1;
      }
    } else {
      player.cards.push(draw_card());
      player.value = calculate(player.cards, player.value);
      cards.textContent -= 1;
    }
    bettable = false;
  }
  value.textContent = player.value;
  if (player.value > 21) {
    calculating_winner();
    probability();
    proba.textContent = 0;
  } else {
    probability();
    simulation_trial();
  }
  for (let i = 0; i < player.cards.length; i++) {
    user_card_show(player.cards[i]);
  }
  for (let i = 0; i < dealer.cards.length; i++) {
    dealer_card_show(dealer.cards[i]);
  }
});

stay.addEventListener("click", function () {
  if (player.cards.length >= 2 && player.value <= 21) {
    if (dealer.value < dealer.hidden_value) {
      dealer.value = dealer.hidden_value;
    }
    while (dealer.value < 17) {
      dealer.cards.push(draw_card());
      dealer.value = calculate(dealer.cards, dealer.value);
    }
    dealerValue.textContent = dealer.value;
    if (doable) {
      cards.textContent -= dealer.cards.length;
    }
    doable = false;
    player.playable = false;
    dealer_reveal();
    calculating_winner();
  }
});

function Player(name) {
  // player class
  this.money = 0;
  this.name = name;
  this.cards = [];
  this.value = 0;
  this.playable = true;
}

function Dealer() {
  // dealer class
  this.cards = [];
  this.value = 0;
  this.hidden_value = 0;
}

function Deck() {
  // function class of a deck
  this.deck = [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < types.length; j++) {
      let card = new Card(types[j], nums[i]);
      add_card_picture(card);
      this.deck.push(card);
    }
  }
}

function Card(type, number) {
  // function class of a specific card in the deck
  this.type = type;
  this.number = number;
  this.flipped = false;
  this.back = "images/blue_back.png";
  this.front = "";
}

function shuffleArray(array) {
  // randomly suffled algorithm
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function draw_card() {
  // drawing card and adding to player / dealer
  deck.deck[0].flipped = true;
  return deck.deck.shift();
}

function calculate(array, num) {
  let val = 0;
  if (array[0].number == "A") {
    val += 11;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].number == "A" && i != 0) {
      if (num + 11 >= 21) {
        val += 1;
      } else {
        val += 11;
      }
    } else if (array[i].number == "K") {
      val += 10;
    } else if (array[i].number == "Q") {
      val += 10;
    } else if (array[i].number == "J") {
      val += 10;
    } else {
      if (array[i].number == "A") {
        val += 0;
      } else {
        val += array[i].number;
      }
    }
  }
  return val;
}

function dealer_wins() {
  winner.textContent = "Dealer has won";
  winner.style.color = "red";
  bet("L");
}
function player_wins() {
  winner.textContent = "you won";
  winner.style.color = "green";
  bet("W");
}
async function calculating_winner() {
  if (player.value > 21) {
    winner.textContent = "You have busted";
    winner.style.color = "red";
    bet("L");
  } else if (dealer.value >= player.value && dealer.value <= 21) {
    dealer_wins();
  } else if (dealer.value < player.value && player.value <= 21) {
    player_wins();
  } else if (dealer.value > 21 && player.value <= 21) {
    player_wins();
  }
  await new Promise((r) => setTimeout(r, 2000));
  restart();
}

function put_back() {
  for (let i = 0; i <= player.cards.length; i++) {
    if (player.cards.length > 0) {
      deck.deck.push(player.cards.shift());
    }
  }
  for (let i = 0; i <= dealer.cards.length; i++) {
    if (dealer.cards.length > 0) {
      deck.deck.push(dealer.cards.shift());
    }
  }
  if (player.cards.length != 0 || dealer.cards.length != 0) {
    put_back();
  }
  player.playable = true;
  player.value = 0;
  dealer.value = 0;
}

// restarts game
function restart() {
  turn++;
  player.value = 0;
  dealer.value = 0;
  winner.textContent = "";
  put_back();
  cards.textContent = deck.deck.length;
  dealerValue.textContent = 0;
  value.textContent = 0;
  bettable = true;
  doable = true;
  prob.textContent = 0;
  dealer.hidden_value = 0;
  proba.textContent = 0;
  remove_all_cards();
  if (turn % 5 == 0) {
    deck = new Deck();
    shuffleArray(deck.deck);
  }
}
// bet payout
function bet(WorL) {
  if (WorL == "W") {
    balance.textContent =
      parseInt(balance.textContent) + parseInt(bet_amount.textContent);
  } else if (WorL == "L") {
    balance.textContent =
      parseInt(balance.textContent) - parseInt(bet_amount.textContent);
  }
}
// bet button events
bet_up.addEventListener("click", function () {
  if (
    parseInt(bet_amount.textContent) <= parseInt(balance.textContent) - 100 &&
    bettable == true
  ) {
    bet_amount.textContent = parseInt(bet_amount.textContent) + 100;
  }
});

bet_down.addEventListener("click", function () {
  if (parseInt(bet_amount.textContent) >= 2 * always_bet && bettable == true) {
    bet_amount.textContent = parseInt(bet_amount.textContent) - 100;
  }
});
// probability of busting calculator
function probability() {
  if (player.value <= 11) {
    prob.textContent = 0;
  } else {
    let num = 0;
    let min_bust = 22 - player.value;
    for (let i = 0; i < deck.deck.length; i++) {
      if (return_value(deck.deck[i], player.value) >= min_bust) {
        num++;
      }
    }
    prob.textContent = parseFloat((num / deck.deck.length) * 100).toFixed(3);
  }
}
// return card value
function return_value(card, num) {
  if (card.number == "K") {
    return 10;
  } else if (card.number == "Q") {
    return 10;
  } else if (card.number == "J") {
    return 10;
  } else if (card.number == "A") {
    if (num + 11 > 21) {
      return 1;
    } else {
      return 11;
    }
  } else {
    return card.number;
  }
}

// shows user cards
function user_card_show(card) {
  let img = document.createElement("img");
  img.src = card.front;
  img.height = 125;
  document.querySelector(".user-cards").appendChild(img);
}

// shows dealers cards
function dealer_card_show(card) {
  let img = document.createElement("img");
  if (card.flipped) {
    img.src = card.front;
  } else {
    img.src = card.back;
  }

  img.height = 125;
  document.querySelector(".dealer-cards").appendChild(img);
}

// removes all cards in game to restart
function remove_all_cards() {
  let images = document.querySelector(".dealer-cards");
  let images2 = document.querySelector(".user-cards");
  for (let i = 0; i < images.children.length; i++) {
    images.removeChild(images.children[i]);
  }
  for (let i = 0; i < images2.children.length; i++) {
    images2.removeChild(images2.children[i]);
  }
  while (images2.children.length != 0 || images.children.length != 0) {
    remove_all_cards();
  }
}

// removes all dealer cards
function remove_all_dealer_cards() {
  let images = document.querySelector(".dealer-cards");
  for (let i = 0; i < images.children.length; i++) {
    images.removeChild(images.children[i]);
  }
  while (images.children.length != 0) {
    remove_all_dealer_cards();
  }
}
// adds card picture url
function add_card_picture(card) {
  card.front = String(
    "images/" + String(card.number) + String(card.type[0]) + ".png"
  );
}
// reveals dealer cards
function dealer_reveal() {
  remove_all_dealer_cards();
  for (let i = 0; i < dealer.cards.length; i++) {
    dealer.cards[i].flipped = true;
    dealer_card_show(dealer.cards[i]);
  }
}
// shows deck top left
function show_deck() {
  let img = document.createElement("img");
  img.src = deck.deck[deck.deck.length - 10].back;
  img.height = 125;
  document.querySelector(".deck").appendChild(img);
}
// probability of winning calculator

function simulation_trial() {
  let simulation_runs = deck.deck.length ** 2;
  let num = 0;
  for (let i = 0; i < simulation_runs; i++) {
    let trial_deck = [...deck.deck];
    shuffleArray(trial_deck);
    let hidden = dealer.value;
    while (hidden < 17) {
      let got = trial_deck.shift();
      hidden += return_value(got, dealer.value);
    }
    if (hidden <= 21 && hidden >= player.value && hidden > 17) {
      num++;
    }
  }
  proba.textContent = parseFloat(100 - (num / simulation_runs) * 100).toFixed(
    3
  );
}
