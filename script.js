const generateBtn = document.getElementById('generateBtn');
     const topicSelect = document.getElementById('topic');
     const customTopicInput = document.getElementById('customTopic');
     const quizContainer = document.getElementById('quizContainer');
     const questionEl = document.getElementById('question');
     const optionsEl = document.getElementById('options');
     const answerFeedbackEl = document.getElementById('answerFeedback');
     const nextBtn = document.getElementById('nextBtn');
     const resultEl = document.getElementById('result');
     const spinner = document.getElementById('spinner');
     const statusEl = document.getElementById('status');
     const confettiContainer = document.getElementById('confetti-container');

     let currentQuestionIndex = 0;
     let quizData = [];
     let userAnswers = [];
     let isAnswerSelected = false;

     topicSelect.addEventListener('change', () => {
         const topic = topicSelect.value;
         if (topic === 'custom') {
             customTopicInput.style.display = 'block';
             customTopicInput.focus();
             statusEl.innerText = 'Enter your custom topic to start!';
             statusEl.style.background = '#e0f7fa';
             statusEl.style.color = '#0891b2';
         } else {
             customTopicInput.style.display = 'none';
             customTopicInput.value = '';
             if (topic) {
                 statusEl.innerText = `Topic selected: ${topic.charAt(0).toUpperCase() + topic.slice(1)}. Ready to generate quiz!`;
                 statusEl.style.background = '#fef2f2';
                 statusEl.style.color = '#ff6f61';
             } else {
                 statusEl.innerText = 'Ready to start! Select or enter a topic below.';
                 statusEl.style.background = '#e0f7fa';
                 statusEl.style.color = '#0891b2';
             }
         }
     });

     customTopicInput.addEventListener('input', () => {
         const customTopic = customTopicInput.value.trim();
         if (customTopic) {
             statusEl.innerText = `Custom topic: ${customTopic}. Ready to generate quiz!`;
             statusEl.style.background = '#fef2f2';
             statusEl.style.color = '#ff6f61';
         } else {
             statusEl.innerText = 'Enter your custom topic to start!';
             statusEl.style.background = '#e0f7fa';
             statusEl.style.color = '#0891b2';
         }
     });

     generateBtn.addEventListener('click', async () => {
         let topic = topicSelect.value;
         if (topic === 'custom') {
             topic = customTopicInput.value.trim();
             if (!topic) {
                 alert('Please enter a custom topic!');
                 return;
             }
         }
         if (!topic) {
             alert('Please select a topic!');
             return;
         }
         console.log(`Generating quiz for topic: ${topic}`);
         statusEl.innerText = `Generating quiz on ${topic.charAt(0).toUpperCase() + topic.slice(1)}...`;
         spinner.style.display = 'flex';
         quizContainer.style.display = 'none';
         resultEl.style.display = 'none';
         generateBtn.disabled = true;

         try {
             quizData = await generateQuiz(topic);
             console.log("Quiz Data Generated:", quizData);
             userAnswers = new Array(quizData.length).fill(null);
             currentQuestionIndex = 0;
             statusEl.innerText = `Quiz generated! You're on Question ${currentQuestionIndex + 1}/${quizData.length}.`;
             displayQuestion();
             spinner.style.display = 'none';
             quizContainer.style.display = 'block';
             generateBtn.disabled = false;
         } catch (error) {
             console.error("Error generating quiz:", error);
             spinner.style.display = 'none';
             statusEl.innerText = 'Error generating quiz. Check your API key or internet.';
             statusEl.style.background = '#fef2f2';
             statusEl.style.color = '#ff6f61';
             resultEl.innerText = 'Error generating quiz. Check your API key or internet.';
             resultEl.style.display = 'block';
             generateBtn.disabled = false;
         }
     });

     async function generateQuiz(topic) {
         const prompt = `Generate 5 multiple-choice trivia questions on ${topic}. Each question should have 4 options (A, B, C, D) and indicate the correct answer. Format each question as: "Question: [question text]\nA) [option A]\nB) [option B]\nC) [option C]\nD) [option D]\nCorrect: [A/B/C/D]"`;

         console.log("Sending API request with prompt:", prompt);
         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
             method: "POST",
             headers: {
                 "Authorization": "Bearer YOUR_API_KEY",
                 "Content-Type": "application/json",
                 "HTTP-Referer": "https://chat.openrouter.ai",
                 "X-Title": "ai-quiz-generator-project"
             },
             body: JSON.stringify({
                 model: "mistralai/mixtral-8x7b-instruct",
                 messages: [{ role: "user", content: prompt }]
             })
         });

         console.log("API Response Status:", response.status);
         const data = await response.json();
         console.log("API Response Data:", data);
         if (!data.choices || !data.choices[0]) {
             throw new Error('Invalid API response');
         }

         const rawQuestions = data.choices[0].message.content.split('\n\n');
         console.log("Raw Questions:", rawQuestions);
         const quiz = rawQuestions.map(q => {
             const lines = q.split('\n');
             const question = lines[0].replace('Question: ', '');
             const options = lines.slice(1, 5);
             const correct = lines[5].replace('Correct: ', '');
             const correctIndex = ['A', 'B', 'C', 'D'].indexOf(correct);
             return { question, options, correct: correctIndex };
         });

         return quiz;
     }

     function displayQuestion() {
         const q = quizData[currentQuestionIndex];
         console.log("Displaying Question:", q);
         questionEl.innerText = `Question ${currentQuestionIndex + 1}: ${q.question}`;
         optionsEl.innerHTML = '';
         answerFeedbackEl.style.display = 'none';
         isAnswerSelected = false;
         q.options.forEach((option, index) => {
             const label = document.createElement('label');
             label.innerHTML = `<input type="radio" name="answer" value="${index}"> <span>${option}</span><br>`;
             optionsEl.appendChild(label);
         });
         nextBtn.style.display = 'block';
         nextBtn.disabled = true;
         document.querySelectorAll('input[name="answer"]').forEach(input => {
             input.addEventListener('change', () => {
                 if (isAnswerSelected) return; // Prevent multiple selections
                 isAnswerSelected = true;
                 nextBtn.disabled = false;
                 userAnswers[currentQuestionIndex] = parseInt(input.value);
                 const isCorrect = userAnswers[currentQuestionIndex] === q.correct;
                 const selectedLabel = input.parentElement;
                 const correctLabel = optionsEl.children[q.correct];
                 selectedLabel.classList.add(isCorrect ? 'correct' : 'incorrect');
                 if (!isCorrect) {
                     correctLabel.classList.add('correct');
                 }
                 answerFeedbackEl.innerText = isCorrect ? '🎉 Amazing! That’s correct!' : 'Oops! That’s incorrect. The correct answer is highlighted.';
                 answerFeedbackEl.classList.add(isCorrect ? 'correct' : 'incorrect');
                 answerFeedbackEl.style.display = 'block';
                 if (isCorrect) {
                     createConfetti();
                 }
                 statusEl.innerText = `Answer selected for Question ${currentQuestionIndex + 1}/${quizData.length}. ${isCorrect ? 'Well done!' : 'Let’s try the next one!'}`;
                 statusEl.style.background = isCorrect ? '#d1fae5' : '#fee2e2';
                 statusEl.style.color = isCorrect ? '#065f46' : '#991b1b';
                 document.querySelectorAll('#options label span').forEach(span => {
                     span.style.color = '#374151';
                     span.style.fontWeight = 'normal';
                 });
                 input.nextElementSibling.style.color = isCorrect ? '#065f46' : '#991b1b';
                 input.nextElementSibling.style.fontWeight = '600';
             });
         });
     }

     function createConfetti() {
         for (let i = 0; i < 50; i++) {
             const confetti = document.createElement('div');
             confetti.classList.add('confetti');
             confetti.style.left = Math.random() * 100 + 'vw';
             confetti.style.animationDelay = Math.random() * 3 + 's';
             confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
             confettiContainer.appendChild(confetti);
         }
     }

     nextBtn.addEventListener('click', () => {
         currentQuestionIndex++;
         if (currentQuestionIndex < quizData.length) {
             statusEl.innerText = `You're on Question ${currentQuestionIndex + 1}/${quizData.length}.`;
             statusEl.style.background = '#e0f7fa';
             statusEl.style.color = '#0891b2';
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
         let resultMessage = `You scored ${score}/${quizData.length}! `;
         if (score === quizData.length) {
             resultMessage += 'Perfect score! You’re a trivia master! 🏆';
             createConfetti();
         } else if (score >= Math.floor(quizData.length * 0.6)) {
             resultMessage += 'Great job! You’re on fire! 🔥';
         } else {
             resultMessage += 'Nice try! Keep practicing to become a trivia champ! 💪';
         }
         resultEl.innerHTML = resultMessage + '<br><button id="playAgain" class="btn">Play Again</button>';
         resultEl.style.display = 'block';
         statusEl.innerText = `Quiz completed! Your score: ${score}/${quizData.length}. Play again?`;
         statusEl.style.background = score === quizData.length ? '#d1fae5' : '#fef2f2';
         statusEl.style.color = score === quizData.length ? '#065f46' : '#ff6f61';
         document.getElementById('playAgain').addEventListener('click', () => {
             quizContainer.style.display = 'none';
             resultEl.style.display = 'none';
             topicSelect.value = '';
             customTopicInput.style.display = 'none';
             customTopicInput.value = '';
             statusEl.innerText = 'Ready to start! Select or enter a topic below.';
             statusEl.style.background = '#e0f7fa';
             statusEl.style.color = '#0891b2';
             confettiContainer.innerHTML = '';
         });
     }
