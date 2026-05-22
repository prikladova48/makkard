const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const startScreen = document.getElementById("startScreen");
const cardScreen = document.getElementById("cardScreen");
const drawDailyCardButton = document.getElementById("drawDailyCard");
const drawRandomCardButton = document.getElementById("drawRandomCard");
const backToStartButton = document.getElementById("backToStart");
const showMessageButton = document.getElementById("showMessage");
const showQuestionButton = document.getElementById("showQuestion");

const cardCategory = document.getElementById("cardCategory");
const cardImage = document.getElementById("cardImage");
const cardNumber = document.getElementById("cardNumber");
const cardTitle = document.getElementById("cardTitle");
const cardDescription = document.getElementById("cardDescription");

const revealBox = document.getElementById("revealBox");
const revealLabel = document.getElementById("revealLabel");
const revealText = document.getElementById("revealText");

let currentCard = null;

function getTelegramUserKey() {
  const user = tg?.initDataUnsafe?.user;
  if (user?.id) return String(user.id);
  return localStorage.getItem("demoUserKey") || createDemoUserKey();
}

function createDemoUserKey() {
  const key = "demo-" + Math.random().toString(36).slice(2);
  localStorage.setItem("demoUserKey", key);
  return key;
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDailyCard() {
  const seed = `${getTelegramUserKey()}-${getTodayKey()}`;
  const index = hashString(seed) % window.CARDS.length;
  return window.CARDS[index];
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

  cardCategory.textContent = card.category;
  cardImage.src = card.image;
  cardImage.alt = card.title;
  cardNumber.textContent = `Карта ${card.number}`;
  cardTitle.textContent = card.title;
  cardDescription.textContent = card.description;

  revealBox.classList.add("hidden");
  revealLabel.textContent = "";
  revealText.textContent = "";

  startScreen.classList.add("hidden");
  cardScreen.classList.remove("hidden");

  tg?.HapticFeedback?.impactOccurred?.("light");
}

drawDailyCardButton.addEventListener("click", () => {
  renderCard(getDailyCard());
});

drawRandomCardButton.addEventListener("click", () => {
  renderCard(getRandomCard());
});

backToStartButton.addEventListener("click", () => {
  cardScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  tg?.HapticFeedback?.selectionChanged?.();
});

showMessageButton.addEventListener("click", () => {
  if (!currentCard) return;

  revealLabel.textContent = "Послание";
  revealText.textContent = currentCard.message;
  revealBox.classList.remove("hidden");
  tg?.HapticFeedback?.notificationOccurred?.("success");
});

showQuestionButton.addEventListener("click", () => {
  revealLabel.textContent = "Вопрос";
  revealText.textContent = getRandomQuestion();
  revealBox.classList.remove("hidden");
  tg?.HapticFeedback?.impactOccurred?.("medium");
});
