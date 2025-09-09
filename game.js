// don’t shadow 'questions'/'values'
let QUESTIONS = Array.isArray(window.questions) ? window.questions : [];
try { if (QUESTIONS.length === 0) QUESTIONS = questions; } catch {}
let VALUES = window.values ?? {};
try { if (!window.values) VALUES = values; } catch {}

// -------------------- Helpers --------------------

// Normalize string
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"“”‘’()\[\]]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

// Fuzzy match
function isCloseMatch(answer, guess) {
  const normAnswer = normalize(answer);
  const normGuess = normalize(guess);
  if (normAnswer === normGuess) return true;
  const dist = levenshtein(normAnswer, normGuess);
  const threshold = Math.max(1, Math.floor(normAnswer.length * 0.2));
  return dist <= threshold;
}

// Utility to pick random item
function pickOne(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// Resolve an answers array for a question object
function resolveAnswers(q) {
  if (!q) return [];
  if (Array.isArray(q.answers)) return q.answers.slice();

  if (q.categoryKey && values[q.categoryKey]) {
    const src = values[q.categoryKey];
    if (Array.isArray(src)) return src.slice();
    if (src && typeof src === "object") {
      const keys = Object.keys(src);
      if (keys.length === 0) return [];
      // choose the sub-key with the most answers
      const maxKey = keys.reduce((a, b) =>
        (Array.isArray(src[a]) ? src[a].length : 0) >
        (Array.isArray(src[b]) ? src[b].length : 0) ? a : b
      );
      return Array.isArray(src[maxKey]) ? src[maxKey].slice() : [];
    }
  }
  return [];
}

// -------------------- Game State --------------------
let currentIndex = 0;
let currentAnswers = [];
let revealed = [];
let currentQuestionText = "";
let roundQuestions = [];
let score = 0;
let roundNumber = 0;
let totalpoints = 0;

// -------------------- UI Helpers --------------------
function updateCounter() {
  const correctCount = revealed.filter(Boolean).length;
  const totalAnswers = currentAnswers.length;
  const el = document.getElementById("counter");
  if (el) el.textContent = `${correctCount}/${totalAnswers}`;
}

function setFeedback(text, color) {
  const fb = document.getElementById("feedback");
  if (!fb) return;
  fb.textContent = text;
  if (color) fb.style.color = color;
}

// -------------------- Querying questions --------------------
function getQuestionsByAnswerCount(min, max) {
  return (QUESTIONS || []).filter((q) => {
    const answers = resolveAnswers(q);
    return answers.length >= min && answers.length <= max;
  });
}

// -------------------- Round / Question Flow --------------------
function startRound() {
  score = 0;
  totalpoints = 0;
  roundNumber = 0;
  currentIndex = 0;

  const q3to6 = getQuestionsByAnswerCount(1, Infinity);
  const q7to15 = getQuestionsByAnswerCount(1, Infinity);
  const q16plus = getQuestionsByAnswerCount(1, Infinity);

  roundQuestions = [pickOne(q3to6), pickOne(q7to15), pickOne(q16plus)].filter(Boolean);

  if (!Array.isArray(roundQuestions) || roundQuestions.length === 0) {
    const qEl = document.getElementById("question");
    if (qEl) qEl.textContent = "No playable questions found. Check your data.js.";
    console.error("No questions available. Ensure window.questions/window.values are defined.");
    return;
  }

  // calculate total points (sum of answers across chosen questions)
  totalpoints = roundQuestions.reduce((sum, q) => sum + resolveAnswers(q).length, 0);

  startQuestion();
}

function startQuestion() {
  if (currentIndex >= roundQuestions.length) {
    showGameOver();
    return;
  }

  const q = roundQuestions[currentIndex];
  currentQuestionText = (q && q.text) ? q.text : "Untitled question";
  currentAnswers = resolveAnswers(q)
    .filter((x) => typeof x === "string" && x.trim().length > 0)
    .sort((a, b) => a.localeCompare(b));

  revealed = currentAnswers.map(() => false);
  roundNumber++;

  const qEl = document.getElementById("question");
  if (qEl) qEl.textContent = `Round ${roundNumber}: ${currentQuestionText}`;

  setFeedback("", null);
  const guess = document.getElementById("guess");
  if (guess) guess.value = "";

  renderAnswers();
  updateCounter();

  if (currentAnswers.length === 0) {
    setFeedback("⚠️ This question has no answers. Press Next.", "#fbbf24");
  }
}

function renderAnswers() {
  const answersDiv = document.getElementById("answers");
  if (!answersDiv) return;

  answersDiv.innerHTML = "";
  if (currentAnswers.length > 10) {
    answersDiv.classList.add("multicolumn");
  } else {
    answersDiv.classList.remove("multicolumn");
  }

  currentAnswers.forEach((ans, i) => {
    const displayText = revealed[i]
      ? ans.toUpperCase()
      : ans.split("").map((ch) => (ch === " " ? " " : "_")).join("");

    const answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    displayText.split("").forEach((ch) => {
      const span = document.createElement("span");
      if (ch === " ") {
        span.classList.add("space");
        span.textContent = "\u00A0"; // nbsp
      } else {
        span.textContent = ch;
      }
      answerDiv.appendChild(span);
    });

    answersDiv.appendChild(answerDiv);
  });
}

function revealNextLetter() {
  const answersDiv = document.getElementById("answers");
  if (!answersDiv) return;

  for (let i = 0; i < currentAnswers.length; i++) {
    const ans = currentAnswers[i];
    if (revealed[i]) continue;

    const spans = answersDiv.children[i]?.querySelectorAll("span");
    if (!spans) continue;

    for (let j = 0; j < ans.length; j++) {
      if (ans[j] === " ") continue;
      if (spans[j]?.textContent === "_") {
        spans[j].textContent = ans[j].toUpperCase();

        // Did we reveal the full answer?
        let allRevealed = true;
        for (let k = 0; k < ans.length; k++) {
          if (ans[k] !== " " && spans[k]?.textContent === "_") {
            allRevealed = false;
            break;
          }
        }
        if (allRevealed) revealed[i] = true;

        updateCounter();
        return;
      }
    }
  }
}

function checkGuess() {
  const guessInput = document.getElementById("guess");
  const feedback = document.getElementById("feedback");
  if (!guessInput || !feedback) return;

  const guess = guessInput.value.trim();
  if (!guess) {
    setFeedback("Please enter a guess.", "#fbbf24");
    return;
  }

  let foundAny = false;
  currentAnswers.forEach((ans, i) => {
    if (!revealed[i] && isCloseMatch(ans, guess)) {
      revealed[i] = true;
      foundAny = true;
      score++;
    }
  });

  if (foundAny) {
    setFeedback("✅ Correct guess!", "#4ade80");
    guessInput.value = "";
    renderAnswers();
    updateCounter();
    if (revealed.every(Boolean)) {
      setFeedback("🎉 All answers found!", "#4ade80");
    }
  } else {
    setFeedback("❌ Incorrect guess, try again.", "#f87171");
  }
}

function nextCategory() {
  currentIndex++;
  startQuestion();
}

function showGameOver() {
  const gameDiv = document.getElementById("game");
  if (!gameDiv) return;

  gameDiv.innerHTML = `<h2>🎮 Game Over</h2>
    <p>Your score: ${score} / ${totalpoints}</p>
    <button id="newGameBtn">Start New Game</button>`;

  document.getElementById("newGameBtn")?.addEventListener("click", () => {
    score = 0;
    roundNumber = 0;
    location.reload();
  });
}

// -------------------- Boot --------------------
document.addEventListener("DOMContentLoaded", () => {
  // Wire up buttons
  document.getElementById("submitBtn")?.addEventListener("click", checkGuess);
  document.getElementById("nextBtn")?.addEventListener("click", nextCategory);
  document.getElementById("revealBtn")?.addEventListener("click", revealNextLetter);

  document.getElementById("guess")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (revealed.length && revealed.every(Boolean)) {
        nextCategory();
      } else {
        checkGuess();
      }
    }
  });

  // Validate data presence
  if (!Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
    const qEl = document.getElementById("question");
    if (qEl) qEl.textContent = "Error: No questions loaded. Is data.js included before game.js?";
    console.error("questions[] missing. Ensure <script src='data.js'></script> appears before game.js and defines window.questions.");
    return;
  }

  startRound();
});
