// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
BASE_API_URL = "http://deckofcardsapi.com/api/deck/";

async function drawCardFromNewDeck() {
  const response = await axios.get(`${BASE_API_URL}new/draw/?count=1`);
  console.log(
    `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
  );
}
drawCardFromNewDeck();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

async function drawTwoCardsFromNewDeck() {
  let deckID, cardOne, cardTwo;
  const response = await axios.get(`${BASE_API_URL}new/draw/?count=1`);
  console.log(response);
  // response.data sample:
  // {
  //   "success": true,
  //   "deck_id": "j9n8lw3vzf9h",
  //   "cards": [
  //     {
  //       "code": "QD",
  //       "image": "https://deckofcardsapi.com/static/img/QD.png",
  //       "images": {
  //         "svg": "https://deckofcardsapi.com/static/img/QD.svg",
  //         "png": "https://deckofcardsapi.com/static/img/QD.png"
  //       },
  //       "value": "QUEEN",
  //       "suit": "DIAMONDS"
  //     }
  //   ],
  //   "remaining": 51
  // }
  deckID = response.data.deck_id;
  cardOne = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;
  const cardTwoResponse = await axios.get(
    `${BASE_API_URL}${deckID}/draw/?count=1`
  );
  cardTwo = `${cardTwoResponse.data.cards[0].value} of ${cardTwoResponse.data.cards[0].suit}`;
  console.log(cardOne, cardTwo);
}

// Once you have both cards, console.log the values and suits of both cards.

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deckIDTwo = null;
let $button = $("button");
let $cardArea = $("#card-area");

async function shuffleNewDeck() {
  let response = await axios.get(`${BASE_API_URL}/new/shuffle/`);
  deckIDTwo = response.data.deck_id;
  $button.show();
}
shuffleNewDeck();

$button.on("click", async function () {
  let response = await axios.get(`${BASE_API_URL}${deckIDTwo}/draw/`);
  let cardSrc = response.data.cards[0].image;
  let angle = Math.random() * 90 - 45;
  let randomX = Math.random() * 40 - 20;
  let randomY = Math.random() * 40 - 20;
  console.log(cardSrc, deckIDTwo);
  $cardArea.append(
    $(`<img>`, {
      src: cardSrc,
      css: {
        transform: `translate(${randomX}px,${randomY}px) rotate(${angle}deg)`,
      },
    })
  );
  if (response.data.remaining === 0) $button.remove();
});
