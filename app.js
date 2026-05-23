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

// Эти элементы были в первой версии интерфейса. Оставляем поддержку, чтобы приложение не ломалось,
// если GitHub или Telegram временно подтянули старый index.html.
const legacyCardCategory = document.getElementById("cardCategory");
const legacyCardNumber = document.getElementById("cardNumber");
const legacyCardTitle = document.getElementById("cardTitle");
const legacyCardDescription = document.getElementById("cardDescription");

let currentCard = null;

if (cardBackImage && window.CARD_BACK_IMAGE) {
  cardBackImage.src = window.CARD_BACK_IMAGE;
}

function onClick(element, handler) {
  if (element) {
    element.addEventListener("click", handler);
  }
}

function getRandomCard() {
  const cards = window.CARDS || [];
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
}

function getRandomQuestion() {
  const questions = window.QUESTIONS || [];
  const index = Math.floor(Math.random() * questions.length);
  return questions[index] || "Какой вопрос сейчас важнее всего задать себе?";
}

function renderCard(card) {
  if (!card) return;

  currentCard = card;

  if (cardImage) {
    cardImage.src = card.image;
    cardImage.alt = card.title || "Карта";
  }

  if (legacyCardCategory) legacyCardCategory.textContent = "";
  if (legacyCardNumber) legacyCardNumber.textContent = "";
  if (legacyCardTitle) legacyCardTitle.textContent = "";
  if (legacyCardDescription) legacyCardDescription.textContent = "";

  if (revealBox) revealBox.classList.add("hidden");
  if (revealLabel) revealLabel.textContent = "";
  if (revealText) revealText.textContent = "";

  if (startScreen) startScreen.classList.add("hidden");
  if (cardScreen) cardScreen.classList.remove("hidden");

  tg?.HapticFeedback?.impactOccurred?.("light");
}

function drawCard() {
  renderCard(getRandomCard());
}

onClick(drawRandomCardButton, drawCard);
onClick(drawRandomCardBottomButton, drawCard);

onClick(backToStartButton, () => {
  if (cardScreen) cardScreen.classList.add("hidden");
  if (startScreen) startScreen.classList.remove("hidden");
  tg?.HapticFeedback?.selectionChanged?.();
});

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

onClick(showMessageButton, () => {
  if (!currentCard || !revealBox || !revealLabel || !revealText) return;

  const title = escapeHTML(currentCard.title || "Карта");
  const message = escapeHTML(currentCard.message || "Послание для этой карты нужно добавить.");

  revealLabel.textContent = "Послание";
  revealText.innerHTML = `<strong class="message-title">${title}</strong><br><span class="message-body">${message}</span>`;
  revealBox.classList.remove("hidden");
  tg?.HapticFeedback?.notificationOccurred?.("success");
});
onClick(showQuestionButton, () => {
  if (!revealBox || !revealLabel || !revealText) return;

  revealLabel.textContent = "Вопрос";
  revealText.textContent = getRandomQuestion();
  revealBox.classList.remove("hidden");
  tg?.HapticFeedback?.impactOccurred?.("medium");
});
