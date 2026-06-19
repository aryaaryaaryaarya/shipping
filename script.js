const SHIP_THRESHOLD = 60;

const highReactions = {
  jay: [
    "wait... we'd actually be cute >///<",
    "omg no way i'm blushing rn",
    "hehe... don't look at me :3",
  ],
  doom: [
    "hehe",
    "ok yeah i kinda ship it :3",
    "i'm not crying you're crying",
  ],
};

const lowReactions = {
  jay: [
    "ohh... ew...",
    "n-nvm forget i asked...",
    "i'm gonna go touch grass now",
  ],
  doom: [
    "yo what",
    "absolutely not. next.",
    "nah that's a whole no :3",
  ],
};

const questions = [
  {
    text: "Jay accidentally sends a <em>heart emoji</em> to Doom. How does Doom react?",
    options: [
      { label: "Sends one back with a traffic cone emoji 🚧", points: 10 },
      { label: "Pretends they didn't see it but the visor glows pink", points: 8 },
      { label: "Replies 'wrong person?' and goes offline for 3 hours", points: 3 },
      { label: "Leaves the group chat and makes a new one without Jay", points: 1 },
    ],
  },
  {
    text: "Jay and Doom are planning a vacation together. Where will they go?",
    options: [
      { label: "A dark aesthetic cabin with hot cocoa and stargazing", points: 10 },
      { label: "A kawaii beach town with matching striped hoodies", points: 9 },
      { label: "Same gaming con, different hotel rooms, no eye contact", points: 4 },
      { label: "Jay stays home. Doom goes alone. Obviously.", points: 1 },
    ],
  },
  {
    text: "Jay falls asleep on Doom's shoulder during a movie. How does Doom react?",
    options: [
      { label: "Freezes completely so Jay doesn't wake up", points: 10 },
      { label: "Quietly drapes their teal scarf over Jay", points: 9 },
      { label: "Shifts away and loudly clears their throat", points: 3 },
      { label: "Takes a photo and posts it without asking", points: 2 },
    ],
  },
  {
    text: "It's Doom's birthday. What does Jay get them?",
    options: [
      { label: "A handmade scarf that matches Doom's teal one :3", points: 10 },
      { label: "A tiny traffic cone keychain with their initials", points: 9 },
      { label: "A Robux gift card because Jay panicked", points: 5 },
      { label: "Forgets entirely and cries about it at 2am", points: 2 },
    ],
  },
  {
    text: "Jay gets nervous and hides behind a pillow. How does Doom react?",
    options: [
      { label: "Sits next to them and waits like a good protogen", points: 10 },
      { label: "Peeks around the pillow with a dumb little face", points: 8 },
      { label: "Says 'why are you like this' and leaves", points: 2 },
      { label: "Throws the pillow across the room", points: 1 },
    ],
  },
  {
    text: "Jay and Doom are picking a show to binge. What do they choose?",
    options: [
      { label: "A soft romance anime they both pretend is ironic", points: 10 },
      { label: "A chaotic comedy they can cackle at together", points: 8 },
      { label: "Doom picks action. Jay silently suffers.", points: 4 },
      { label: "They argue for an hour and watch TikTok instead", points: 1 },
    ],
  },
  {
    text: "Jay trips and spills their boba everywhere. How does Doom react?",
    options: [
      { label: "Helps clean up and makes a dumb joke about it", points: 10 },
      { label: "Hands Jay napkins like it's nothing", points: 8 },
      { label: "Laughs, then feels bad and buys them a new one", points: 5 },
      { label: "Steps over the spill. Keeps walking.", points: 1 },
    ],
  },
  {
    text: "Jay and Doom are at an arcade. What game do they play together?",
    options: [
      { label: "Co-op game where they HAVE to work as a team", points: 10 },
      { label: "Claw machine — Doom wins Jay a plushie", points: 9 },
      { label: "They play on opposite sides and ignore each other", points: 3 },
      { label: "Doom speedruns a fighting game. Jay watches.", points: 5 },
    ],
  },
  {
    text: "Jay writes a shy little note for Doom. How does Doom react?",
    options: [
      { label: "Keeps it in their pocket forever, no questions", points: 10 },
      { label: "Reads it twice and the visor does a little blush", points: 9 },
      { label: "Says 'cool' and immediately changes subject", points: 3 },
      { label: "Accidentally uses it as a napkin", points: 1 },
    ],
  },
  {
    text: "Jay and Doom are getting matching something. What do they pick?",
    options: [
      { label: "Matching scarves — Jay's pink, Doom's teal", points: 10 },
      { label: "Matching phone wallpapers of blue paw prints", points: 8 },
      { label: "Matching gamer tags with cringe numbers", points: 6 },
      { label: "'Matching is cringe' — they say in unison", points: 2 },
    ],
  },
];

const splash = document.getElementById("splash");
const avatarsScreen = document.getElementById("avatars-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const playBtn = document.querySelector(".play-btn");
const startShippingBtn = document.getElementById("start-shipping-btn");
const quizProgress = document.getElementById("quiz-progress");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const shippingPercent = document.getElementById("shipping-percent");
const resultsVerdict = document.getElementById("results-verdict");
const jayReaction = document.getElementById("jay-reaction");
const doomReaction = document.getElementById("doom-reaction");
const retryBtn = document.getElementById("retry-btn");

let currentQuestion = 0;
let totalPoints = 0;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screen) {
  [splash, avatarsScreen, quizScreen, resultsScreen].forEach((el) => {
    el.classList.add("hidden");
  });
  screen.classList.remove("hidden");
  document.body.classList.toggle("quiz-active", screen === quizScreen || screen === resultsScreen);
}

function renderQuestion() {
  const q = questions[currentQuestion];
  quizProgress.textContent = `question ${currentQuestion + 1} / ${questions.length} :3`;
  quizQuestion.innerHTML = q.text;
  quizOptions.innerHTML = "";

  shuffleArray(q.options).forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = option.label;
    btn.addEventListener("click", () => selectAnswer(option.points));
    quizOptions.appendChild(btn);
  });
}

function selectAnswer(points) {
  totalPoints += points;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const maxPoints = questions.length * 10;
  const percent = Math.round((totalPoints / maxPoints) * 100);
  const isHigh = percent >= SHIP_THRESHOLD;

  shippingPercent.textContent = `${percent}%`;

  if (isHigh) {
    jayReaction.textContent = pickRandom(highReactions.jay);
    doomReaction.textContent = pickRandom(highReactions.doom);
    resultsVerdict.textContent = "<3 e-boy approved ship :3";
  } else {
    jayReaction.textContent = pickRandom(lowReactions.jay);
    doomReaction.textContent = pickRandom(lowReactions.doom);
    resultsVerdict.textContent = "⛓ not shipped :3 delete the evidence ⛓";
  }

  showScreen(resultsScreen);
}

function resetQuiz() {
  currentQuestion = 0;
  totalPoints = 0;
  renderQuestion();
  showScreen(quizScreen);
}

playBtn.addEventListener("click", () => {
  splash.classList.add("fade-out");

  setTimeout(() => {
    showScreen(avatarsScreen);
  }, 500);
});

startShippingBtn.addEventListener("click", resetQuiz);

retryBtn.addEventListener("click", () => {
  showScreen(avatarsScreen);
});
