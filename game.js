import { values, questions } from './data.js';

// Game state variables
let currentIndex = 0;
let currentAnswers = [];
let revealed = [];
let currentQuestionText = "";
let roundQuestions = [];
let score = 0;
let roundNumber = 0;
let totalpoints = 0;

// Normalize string
function normalize(str) {
  return str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'''"]/g,"").replace(/\s{2,}/g," ").trim();
}

// Levenshtein distance for fuzzy matching
function levenshtein(a,b){
  const matrix=Array.from({length:b.length+1},(_,i)=>[i]);
  for(let j=0;j<=a.length;j++) matrix[0][j]=j;
  for(let i=1;i<=b.length;i++){
    for(let j=1;j<=a.length;j++){
      matrix[i][j]=(b.charAt(i-1)===a.charAt(j-1)) ? matrix[i-1][j-1] : Math.min(matrix[i-1][j-1]+1, matrix[i][j-1]+1, matrix[i-1][j]+1);
    }
  }
  return matrix[b.length][a.length];
}

// Fuzzy match
function isCloseMatch(answer, guess){
  const normAnswer = normalize(answer);
  const normGuess = normalize(guess);
  if(normAnswer===normGuess) return true;
  const dist=levenshtein(normAnswer,normGuess);
  const threshold=Math.max(1, Math.floor(normAnswer.length*0.2));
  return dist<=threshold;
}

// Utility to pick random item
function getRandomItem(arr){ 
  return arr[Math.floor(Math.random()*arr.length)]; 
}

// Update counter
function updateCounter(){
  const correctCount = revealed.filter(r => r).length;
  const totalAnswers = currentAnswers.length;
  document.getElementById("counter").textContent = `${correctCount}/${totalAnswers}`;
}

// Filter questions by answer count
function getQuestionsByAnswerCount(min,max){
  return questions.filter(q => {
    let answers = [];
    if(q.text && q.answers){
      answers = q.answers;
    } 
    else if(q.categoryKey && typeof values[q.categoryKey]==="object" && !Array.isArray(values[q.categoryKey])){
      const keys = Object.keys(values[q.categoryKey]);
      const maxKey = keys.reduce((a,b) => values[q.categoryKey][a].length > values[q.categoryKey][b].length ? a : b);
      answers = values[q.categoryKey][maxKey];
    } 
    else if(q.categoryKey && Array.isArray(values[q.categoryKey])) {
      answers = values[q.categoryKey];
    }

    return answers.length >= min && answers.length <= max;
  });
}

// Start a new round
function startRound() {
  score = 0;
  totalpoints = 0;
  roundNumber = 0;

  // Filter questions by answer count
  const q3to5 = getQuestionsByAnswerCount(3,6);
  const q6to10 = getQuestionsByAnswerCount(7,15);
  const q11plus = getQuestionsByAnswerCount(16, Infinity);

  // Pick one question from each category
  roundQuestions = [
    getRandomItem(q3to5),
    getRandomItem(q6to10),
    getRandomItem(q11plus)
  ];

  // Calculate total points
  totalpoints = roundQuestions.reduce((sum, q) => {
    let answers = [];
    if (q.answers) answers = q.answers;
    else if (q.categoryKey && values[q.categoryKey]) {
      if (Array.isArray(values[q.categoryKey])) answers = values[q.categoryKey];
      else {
        const keys = Object.keys(values[q.categoryKey]);
        const maxKey = keys.reduce((a,b) => values[q.categoryKey][a].length > values[q.categoryKey][b].length ? a : b);
        answers = values[q.categoryKey][maxKey];
      }
    }
    return sum + answers.length;
  }, 0);

  currentIndex = 0;
  startQuestion();
}

// Start a question
function startQuestion() {
  if (currentIndex >= roundQuestions.length) { 
    showGameOver(); 
    return; 
  }

  const q = roundQuestions[currentIndex];
  currentQuestionText = q.text;
  currentAnswers = [...q.answers].sort();
  revealed = currentAnswers.map(() => false);

  roundNumber++;
  document.getElementById("question").textContent = 
    `Round ${roundNumber}: ${currentQuestionText}`;

  updateCounter();
  document.getElementById("feedback").textContent = "";
  document.getElementById("guess").value = "";
  renderAnswers();
}

// Render answers
function renderAnswers(){
  const answersDiv=document.getElementById("answers");
  answersDiv.innerHTML="";
  if(currentAnswers.length>10) answersDiv.classList.add("multicolumn"); else answersDiv.classList.remove("multicolumn");
  
  currentAnswers.forEach((ans,i)=>{
    const displayText = revealed[i]
      ? ans.toUpperCase()
      : ans.split("").map(ch => ch === " " ? " " : "_").join("");
    
    const answerDiv=document.createElement("div");
    answerDiv.className="answer";
    
    displayText.split("").forEach(ch=>{
      const span=document.createElement("span");
      if(ch===" "){
        span.classList.add("space");
        span.textContent="\u00A0";
      } else {
        span.textContent=ch;
      }
      answerDiv.appendChild(span);
    });
    answersDiv.appendChild(answerDiv);
  });
}

// Reveal letter
function revealNextLetter(){
  for(let i=0;i<currentAnswers.length;i++){
    const ans=currentAnswers[i];
    if(revealed[i]) continue;
    const displayedDiv=document.getElementById("answers").children[i];
    const spans=displayedDiv.querySelectorAll("span");
    for(let j=0;j<ans.length;j++){
      if(ans[j]===" ") continue;
      if(spans[j].textContent==="_"){
        spans[j].textContent=ans[j].toUpperCase();
        let allRevealed=true;
        for(let k=0;k<ans.length;k++){
          if(ans[k]!==" " && spans[k].textContent==="_"){
            allRevealed=false;
            break;
          }
        }
        if(allRevealed) revealed[i]=true;
        updateCounter();
        return;
      }
    }
  }
}

// Check guess
function checkGuess(){
  const guessInput=document.getElementById("guess");
  const guess=guessInput.value.trim();
  const feedback=document.getElementById("feedback");
  
  if(!guess){
    feedback.textContent="Please enter a guess.";
    feedback.style.color="#fbbf24";
    return;
  }
  
  let foundAny=false;
  currentAnswers.forEach((ans,i)=>{
    if(!revealed[i] && isCloseMatch(ans,guess)){
      revealed[i]=true;
      foundAny=true;
      score++;
    }
  });
  
  if(foundAny){
    feedback.textContent="✅ Correct guess!";
    feedback.style.color="#4ade80";
    guessInput.value="";
    renderAnswers();
    updateCounter();
    if(revealed.every(r=>r)){
      feedback.textContent="🎉 All answers found!";
    }
  } else {
    feedback.textContent="❌ Incorrect guess, try again.";
    feedback.style.color="#f87171";
  }
}

// Next question
function nextCategory(){
  currentIndex++;
  startQuestion();
}

// Game over screen
function showGameOver(){
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = `<h2>🎮 Game Over</h2>
    <p>Your score: ${score} / ${totalpoints}</p>
    <button id="newGameBtn">Start New Game</button>`;
  
  document.getElementById("newGameBtn").addEventListener("click",()=>{
    score = 0;
    roundNumber = 0;
    location.reload();
  });
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners
  document.getElementById("submitBtn").addEventListener("click", checkGuess);
  document.getElementById("nextBtn").addEventListener("click", nextCategory);
  document.getElementById("revealBtn").addEventListener("click", revealNextLetter);
  
  document.getElementById("guess").addEventListener("keydown", e => {
    if(e.key === "Enter") {
      e.preventDefault();
      if (revealed.every(r => r)) {
        nextCategory();
      } else {
        checkGuess();
      }
    }
  });

  // Start the game
  startRound();
});
