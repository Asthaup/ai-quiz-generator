const generateBtn = document.getElementById('generateBtn');
     const topicSelect = document.getElementById('topic');
     const quizContainer = document.getElementById('quizContainer');
     const questionEl = document.getElementById('question');
     const optionsEl = document.getElementById('options');
     const nextBtn = document.getElementById('nextBtn');
     const resultEl = document.getElementById('result');
     const spinner = document.getElementById('spinner');
     const statusEl = document.getElementById('status');

     let currentQuestionIndex = 0;
     let quizData = [];
     let userAnswers = [];

     topicSelect.addEventListener('change', () => {
         const topic = topicSelect.value;
         if (topic) {
             statusEl.innerText = `Topic selected: ${topic.charAt(0).toUpperCase() + topic.slice(1)}. Ready to generate quiz!`;
             statusEl.style.background = '#fff1f2';
             statusEl.style.color = '#ff4757';
         } else {
             statusEl.innerText = 'Ready to start! Select a topic below.';
             statusEl.style.background = '#f0f4ff';
             statusEl.style.color = '#2f54eb';
         }
     });

     generateBtn.addEventListener('click', () => {
         const topic = topicSelect.value;
         if (!topic) {
             alert('Please select a topic!');
             return;
         }
         statusEl.innerText = `Generating quiz on ${topic.charAt(0).toUpperCase() + topic.slice(1)}...`;
         spinner.style.display = 'flex';
         quizContainer.style.display = 'none';
         resultEl.style.display = 'none';
         generateBtn.disabled = true;

         // Placeholder: Simulate quiz generation (we'll add API integration in a later step)
         setTimeout(() => {
             quizData = [
                 {
                     question: "Sample question for " + topic + "?",
                     options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
                     correct: 1 // Index of correct answer (e.g., 1 for B)
                 }
             ];
             userAnswers = new Array(quizData.length).fill(null);
             currentQuestionIndex = 0;
             statusEl.innerText = `Quiz generated! You're on Question ${currentQuestionIndex + 1}/1.`;
             displayQuestion();
             spinner.style.display = 'none';
             quizContainer.style.display = 'block';
             generateBtn.disabled = false;
         }, 1000);
     });

     function displayQuestion() {
         const q = quizData[currentQuestionIndex];
         questionEl.innerText = `Question ${currentQuestionIndex + 1}: ${q.question}`;
         optionsEl.innerHTML = '';
         q.options.forEach((option, index) => {
             const label = document.createElement('label');
             label.innerHTML = `<input type="radio" name="answer" value="${index}"> <span>${option}</span><br>`;
             optionsEl.appendChild(label);
         });
         nextBtn.style.display = 'block';
         nextBtn.disabled = true;
         document.querySelectorAll('input[name="answer"]').forEach(input => {
             input.addEventListener('change', () => {
                 nextBtn.disabled = false;
                 userAnswers[currentQuestionIndex] = parseInt(input.value);
                 statusEl.innerText = `Answer selected for Question ${currentQuestionIndex + 1}/1. Click Next to continue.`;
                 statusEl.style.background = '#f0f4ff';
                 statusEl.style.color = '#2f54eb';
                 document.querySelectorAll('#options label span').forEach(span => {
                     span.style.color = '#333';
                     span.style.fontWeight = 'normal';
                 });
                 input.nextElementSibling.style.color = '#ff4757';
                 input.nextElementSibling.style.fontWeight = '600';
             });
         });
     }

     nextBtn.addEventListener('click', () => {
         currentQuestionIndex++;
         if (currentQuestionIndex < quizData.length) {
             statusEl.innerText = `You're on Question ${currentQuestionIndex + 1}/1.`;
             displayQuestion();
         } else {
             showResult();
         }
     });

     function showResult() {
         quizContainer.style.display = 'none';
         nextBtn.style.display = 'none';
         let score = 0;
         quizData.forEach((q, index) => {
             if (userAnswers[index] === q.correct) score++;
         });
         resultEl.innerHTML = `You scored ${score}/1! `;
         if (score === 1) resultEl.innerHTML += 'Great job! 😊';
         else resultEl.innerHTML += 'Nice try! Keep practicing! 💪';
         resultEl.innerHTML += '<br><button id="playAgain" class="btn">Play Again</button>';
         resultEl.style.display = 'block';
         statusEl.innerText = `Quiz completed! Your score: ${score}/1. Play again?`;
         statusEl.style.background = '#fff1f2';
         statusEl.style.color = '#ff4757';
         document.getElementById('playAgain').addEventListener('click', () => {
             quizContainer.style.display = 'none';
             resultEl.style.display = 'none';
             topicSelect.value = '';
             statusEl.innerText = 'Ready to start! Select a topic below.';
             statusEl.style.background = '#f0f4ff';
             statusEl.style.color = '#2f54eb';
         });
     }
