
const questions = [
    {
        question: "Combien y a t'il de Dieux très anciens dans World of Warcraft ?",
        answers: ["0", "2", "4", "240"],
        correct: 2
    },
    {
        question: "Comment se pronoce C'thun ?",
        answers: ["Kuh-THOON", "QUTOON", "CUTOON", "CT1"],
        correct: 0
    },
    {
        question: "Lequel des dieux très anciens n'a que des bouches ?",
        answers: ["Ysharrj", "N'zoth", "Yogg-Saron", "C'thun"],
        correct: 2
    },
    {
        question: "Comment appelle t'on ce qui ont emprisonné C'thun",
        answers: ["Les Bidules", "Les Lapins crétins", "Les Minions", "Les Titans"],
        correct: 3
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let bruteForceInterval = null;
let bruteForceStopped = false;

// DOM elements
const questionText = document.getElementById('questionText');
const answerButtons = document.getElementById('answerButtons');
const quizProgress = document.getElementById('quizProgress');
const restartBtn = document.getElementById('restartBtn');
const resetProgressBtn = document.getElementById('resetProgressBtn');
const bruteForceBtn = document.getElementById('bruteForceBtn');
const stopBruteForceBtn = document.getElementById('stopBruteForceBtn');
const speedSlider = document.getElementById('speedSlider');
const bruteForceToggle = document.querySelector('.theme-controller[type="checkbox"]');

function showQuestion(index) {
    const q = questions[index];
    questionText.textContent = q.question;
    answerButtons.innerHTML = "";

    q.answers.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.className = "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl w-full";
        btn.onclick = () => checkAnswer(i);
        answerButtons.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const buttons = answerButtons.querySelectorAll('button');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === selectedIndex) {
            if (i === q.correct) {
                btn.classList.toggle('bg-green-400');
                correctAnswers++;
            } else {
                btn.classList.toggle('bg-red-400');
            }
        }
    });

    const progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);
    quizProgress.style.setProperty('--value', progressPercent);
    quizProgress.setAttribute('aria-valuenow', progressPercent);
    quizProgress.textContent = `${progressPercent}%`;

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    questionText.textContent = `Vous avez répondu correctement à ${correctAnswers} sur ${questions.length} questions.`;
    answerButtons.innerHTML = "";
    restartBtn.classList.remove('hidden');
    localStorage.setItem('quizCompleted', 'true');
}

function restartQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    quizProgress.style.setProperty('--value', 0);
    quizProgress.setAttribute('aria-valuenow', 0);
    quizProgress.textContent = `0%`;
    restartBtn.classList.add('hidden');
    showQuestion(currentQuestion);
}

// Restart manually
restartBtn.addEventListener('click', restartQuiz);

// Reset user progress
resetProgressBtn.addEventListener('click', () => {
    const confirmed = confirm("Êtes-vous sûr de vouloir réinitialiser votre progression ?");
    if (confirmed) {
        localStorage.removeItem('quizCompleted');
        currentQuestion = 0;
        correctAnswers = 0;
        quizProgress.style.setProperty('--value', 0);
        quizProgress.setAttribute('aria-valuenow', 0);
        quizProgress.textContent = `0%`;
        restartBtn.classList.add('hidden');
        showQuestion(currentQuestion);
        alert("Votre progression a été réinitialisée. Vous devez refaire le quiz pour accéder au formulaire de contact.");
    }
});

// Control brute force with checkbox toggle
bruteForceToggle.addEventListener('change', () => {
    if (bruteForceToggle.checked) {
        bruteForceBtn.disabled = true;
        stopBruteForceBtn.classList.remove('hidden');
        bruteForceStopped = false;
        restartQuiz();
        setTimeout(() => runBruteForceVisual(), 500);
    } else {
        bruteForceStopped = true;
        clearInterval(bruteForceInterval);
        bruteForceBtn.disabled = false;
        stopBruteForceBtn.classList.add('hidden');
    }
});

function runBruteForceVisual() {
    const delay = parseInt(speedSlider.value);
    bruteForceInterval = setInterval(() => {
        if (bruteForceStopped) {
            clearInterval(bruteForceInterval);
            return;
        }

        if (currentQuestion >= questions.length) {
            clearInterval(bruteForceInterval);

            if (correctAnswers < questions.length && !bruteForceStopped) {
                setTimeout(() => {
                    restartQuiz();
                    setTimeout(() => runBruteForceVisual(), 500);
                }, 1000);
            } else {
                if (!bruteForceStopped) {
                    questionText.textContent = `Brute Force réussi : ${correctAnswers}/${questions.length} bonnes réponses.`;
                    restartBtn.classList.remove('hidden');
                    localStorage.setItem('quizCompleted', 'true');
                    bruteForceToggle.checked = false;
                }
                bruteForceBtn.disabled = false;
                stopBruteForceBtn.classList.add('hidden');
            }
            return;
        }

        const buttons = answerButtons.querySelectorAll('button');
        const randomIndex = Math.floor(Math.random() * buttons.length);
        const selectedBtn = buttons[randomIndex];

        buttons.forEach((btn) => {
            btn.classList.remove('bg-red-400', 'bg-green-400', 'bg-blue-200');
            btn.disabled = false;
        });

        selectedBtn.classList.add('bg-blue-200');
        selectedBtn.click();

    }, delay);
}

// Initial render
showQuestion(currentQuestion);
