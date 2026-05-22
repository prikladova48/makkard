const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const startScreen = document.getElementById("startScreen");
const cardScreen = document.getElementById("cardScreen");
const drawRandomCardButton = document.getElementById("drawRandomCard");
const drawRandomCardBottomButton = document.getElementById("drawRandomCardBottom");
const backToStartButton = document.getElementById("backToStart");
const showMessageButton = document.getElementById("showMessage");
const showQuestionButton = document.getElementById("showQuestion");

const cardBackImage = document.getElementById("cardBackImage");
const cardImage = document.getElementById("cardImage");

const revealBox = document.getElementById("revealBox");
const revealLabel = document.getElementById("revealLabel");
const revealText = document.getElementById("revealText");

let currentCard = null;

if (cardBackImage && window.CARD_BACK_IMAGE) {
  cardBackImage.src = window.CARD_BACK_IMAGE;
}

function getRandomCard() {
  const index = Math.floor(Math.random() * window.CARDS.length);
  return window.CARDS[index];
}

function getRandomQuestion() {
  const index = Math.floor(Math.random() * window.QUESTIONS.length);
  return window.QUESTIONS[index];
}

function renderCard(card) {
  currentCard = card;

  cardImage.src = card.image;
  cardImage.alt = card.title;

  revealBox.classList.add("hidden");
  revealLabel.textContent = "";
  revealText.textContent = "";

  startScreen.classList.add("hidden");
  cardScreen.classList.remove("hidden");

  tg?.HapticFeedback?.impactOccurred?.("light");
}

function drawCard() {
  renderCard(getRandomCard());
}

drawRandomCardButton.addEventListener("click", drawCard);
drawRandomCardBottomButton.addEventListener("click", drawCard);

backToStartButton.addEventListener("click", () => {
  cardScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  tg?.HapticFeedback?.selectionChanged?.();
});

showMessageButton.addEventListener("click", () => {
  if (!currentCard) return;

  revealLabel.textContent = "Послание";
  revealText.textContent = `${currentCard.title}\n\n${currentCard.message}`;
  revealBox.classList.remove("hidden");
  tg?.HapticFeedback?.notificationOccurred?.("success");
});

showQuestionButton.addEventListener("click", () => {
  revealLabel.textContent = "Вопрос";
  revealText.textContent = getRandomQuestion();
  revealBox.classList.remove("hidden");
  tg?.HapticFeedback?.impactOccurred?.("medium");
});
