const profileSetup = document.getElementById('profileSetup');
     const mainContent = document.getElementById('mainContent');
     const saveProfileBtn = document.getElementById('saveProfileBtn');
     const editProfileBtn = document.getElementById('editProfileBtn');
     const userNameInput = document.getElementById('userName');
     const preferredTopicSelect = document.getElementById('preferredTopic');
     const userGreeting = document.getElementById('userGreeting');
     const userStats = document.getElementById('userStats');
     const generateBtn = document.getElementById('generateBtn');
     const topicSelect = document.getElementById('topic');
     const customTopicInput = document.getElementById('customTopic');
     const questionNumberSelect = document.getElementById('questionNumber');
     const quizContainer = document.getElementById('quizContainer');
     const questionEl = document.getElementById('question');
     const optionsEl = document.getElementById('options');
     const answerFeedbackEl = document.getElementById('answerFeedback');
     const additionalInfoEl = document.getElementById('additionalInfo');
     const nextBtn = document.getElementById('nextBtn');
     const hintBtn = document.getElementById('hintBtn');
     const fiftyFiftyBtn = document.getElementById('fiftyFiftyBtn');
     const hintCountEl = document.getElementById('hintCount');
     const fiftyFiftyCountEl = document.getElementById('fiftyFiftyCount');
     const resultEl = document.getElementById('result');
     const spinner = document.getElementById('spinner');
     const statusEl = document.getElementById('status');
     const confettiContainer = document.getElementById('confetti-container');

     let currentQuestionIndex = 0;
     let quizData = [];
     let userAnswers = [];
     let isAnswerSelected = false;
     let hintCount = 1;
     let fiftyFiftyCount = 1;
     let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

     // Initialize app state based on profile
     if (userProfile.name) {
         profileSetup.style.display = 'none';
         mainContent.style.display = 'block';
         updateProfileDisplay();
     }

     saveProfileBtn.addEventListener('click', () => {
         const name = userNameInput.value.trim();
         const preferredTopic = preferredTopicSelect.value;
         if (!name) {
             alert('Please enter your name!');
             return;
         }
         userProfile = { 
             name, 
             preferredTopic, 
             quizHistory: userProfile.quizHistory || [], 
             streak: userProfile.streak || 0, 
             lastQuizDate: userProfile.lastQuizDate || null 
         };
         localStorage.setItem('userProfile', JSON.stringify(userProfile));
         profileSetup.style.display = 'none';
         mainContent.style.display = 'block';
         updateProfileDisplay();
     });

     editProfileBtn.addEventListener('click', () => {
         mainContent.style.display = 'none';
         profileSetup.style.display = 'block';
         userNameInput.value = userProfile.name;
         preferredTopicSelect.value = userProfile.preferredTopic || '';
     });

     function updateProfileDisplay() {
         userGreeting.innerText = userProfile.name;
         topicSelect.value = userProfile.preferredTopic || '';
         const history = userProfile.quizHistory || [];
         const totalQuizzes = history.length;
         const averageScore = totalQuizzes ? (history.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes).toFixed(1) : 0;
         const today = new Date().toDateString();
         const lastQuizDate = userProfile.lastQuizDate || today;
         let streak = userProfile.streak || 0;
         if (lastQuizDate !== today) {
             const lastDate = new Date(lastQuizDate);
             const todayDate = new Date(today);
             const diffDays = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
             if (diffDays === 1) streak++;
             else if (diffDays > 1) streak = 0;
         }
         userProfile.streak = streak;
         localStorage.setItem('userProfile', JSON.stringify(userProfile));
         userStats.innerText = `Quizzes Taken: ${totalQuizzes} | Avg Score: ${averageScore}% | Streak: ${streak} day${streak !== 1 ? 's' : ''}`;
         if (topicSelect.value) {
             statusEl.innerText = `Topic selected: ${topicSelect.value.charAt(0).toUpperCase() + topicSelect.value.slice(1)}. Choose number of questions!`;
             statusEl.style.background = '#fef2f2';
             statusEl.style.color = '#ff6f61';
         }
     }

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
                 statusEl.innerText = `Topic selected: ${topic.charAt(0).toUpperCase() + topic.slice(1)}. Choose number of questions!`;
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
             statusEl.innerText = `Custom topic: ${customTopic}. Choose number of questions!`;
             statusEl.style.background = '#fef2f2';
             statusEl.style.color = '#ff6f61';
         } else {
             statusEl.innerText = 'Enter your custom topic to start!';
             statusEl.style.background = '#e0f7fa';
             statusEl.style.color = '#0891b2';
         }
     });

     questionNumberSelect.addEventListener('change', () => {
         const topic = topicSelect.value === 'custom' ? customTopicInput.value.trim() : topicSelect.value;
         const numQuestions = questionNumberSelect.value;
         if (topic) {
             statusEl.innerText = `Ready to generate a ${numQuestions}-question quiz on ${topic.charAt(0).toUpperCase() + topic.slice(1)}!`;
             statusEl.style.background = '#fef2f2';
             statusEl.style.color = '#ff6f61';
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
         const numQuestions = parseInt(questionNumberSelect.value);
         console.log(`Generating quiz for topic: ${topic} with ${numQuestions} questions`);
         statusEl.innerText = `Generating a ${numQuestions}-question quiz on ${topic.charAt(0).toUpperCase() + topic.slice(1)}...`;
         spinner.style.display = 'flex';
         quizContainer.style.display = 'none';
         resultEl.style.display = 'none';
         generateBtn.disabled = true;
         hintCount = 1;
         fiftyFiftyCount = 1;
         hintCountEl.innerText = hintCount;
         fiftyFiftyCountEl.innerText = fiftyFiftyCount;
         hintBtn.disabled = false;
         fiftyFiftyBtn.disabled = false;

         try {
             quizData = await generateQuiz(topic, numQuestions);
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

     async function generateQuiz(topic, numQuestions) {
         const prompt = `Generate ${numQuestions} multiple-choice trivia questions on ${topic}. Each question should have 4 options (A, B, C, D), indicate the correct answer, provide a short explanation (1-2 sentences) for the correct answer, and include a hint (1 sentence). Format each question as: "Question: [question text]\nA) [option A]\nB) [option B]\nC) [option C]\nD) [option D]\nCorrect: [A/B/C/D]\nExplanation: [explanation]\nHint: [hint]"`;

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
             const explanation = lines[6].replace('Explanation: ', '');
             const hint = lines[7].replace('Hint: ', '');
             const correctIndex = ['A', 'B', 'C', 'D'].indexOf(correct);
             return { question, options, correct: correctIndex, explanation, hint };
         });

         return quiz;
     }

     function displayQuestion() {
         const q = quizData[currentQuestionIndex];
         console.log("Displaying Question:", q);
         questionEl.innerText = `Question ${currentQuestionIndex + 1}: ${q.question}`;
         optionsEl.innerHTML = '';
         answerFeedbackEl.style.display = 'none';
         additionalInfoEl.style.display = 'none';
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
                 if (isAnswerSelected) return;
                 isAnswerSelected = true;
                 nextBtn.disabled = false;
                 userAnswers[currentQuestionIndex] = parseInt(input.value);
                 const isCorrect = userAnswers[currentQuestionIndex] === q.correct;
                 const selectedLabel = input.parentElement;
                 const correctLabel = optionsEl.children[q.correct];
                 selectedLabel.classList.add(isCorrect ? 'correct' : 'incorrect');
                 if (!isCorrect) {
                     correctLabel.classList.add('correct');
                     answerFeedbackEl.innerText = `Oops! The correct answer is ${q.options[q.correct]}. Don’t give up—you’ve got this! 💪`;
                 } else {
                     answerFeedbackEl.innerText = '🎉 Amazing! That’s correct!';
                     createConfetti();
                 }
                 answerFeedbackEl.classList.add(isCorrect ? 'correct' : 'incorrect');
                 answerFeedbackEl.style.display = 'block';
                 additionalInfoEl.innerText = `Did you know? ${q.explanation}`;
                 additionalInfoEl.style.display = 'block';
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

     hintBtn.addEventListener('click', () => {
         if (hintCount <= 0) return;
         hintCount--;
         hintCountEl.innerText = hintCount;
         if (hintCount === 0) hintBtn.disabled = true;
         const q = quizData[currentQuestionIndex];
         answerFeedbackEl.innerText = `Hint: ${q.hint}`;
         answerFeedbackEl.classList.add('correct');
         answerFeedbackEl.style.display = 'block';
         statusEl.innerText = `Hint used for Question ${currentQuestionIndex + 1}/${quizData.length}.`;
         statusEl.style.background = '#e0f7fa';
         statusEl.style.color = '#0891b2';
     });

     fiftyFiftyBtn.addEventListener('click', () => {
         if (fiftyFiftyCount <= 0 || isAnswerSelected) return;
         fiftyFiftyCount--;
         fiftyFiftyCountEl.innerText = fiftyFiftyCount;
         if (fiftyFiftyCount === 0) fiftyFiftyBtn.disabled = true;
         const q = quizData[currentQuestionIndex];
         const incorrectIndices = [...Array(4).keys()].filter(i => i !== q.correct);
         const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
         toHide.forEach(index => {
             optionsEl.children[index].style.display = 'none';
         });
         statusEl.innerText = `50/50 used for Question ${currentQuestionIndex + 1}/${quizData.length}.`;
         statusEl.style.background = '#e0f7fa';
         statusEl.style.color = '#0891b2';
     });

     function createConfetti() {
         confettiContainer.innerHTML = '';
         for (let i = 0; i < 30; i++) {
             const confetti = document.createElement('div');
             confetti.classList.add('confetti');
             confetti.style.left = Math.random() * 100 + 'vw';
             confetti.style.animationDelay = Math.random() * 0.5 + 's';
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
         const percentage = (score / quizData.length) * 100;
         userProfile.quizHistory.push({ score: percentage, topic: topicSelect.value === 'custom' ? customTopicInput.value : topicSelect.value, date: new Date().toISOString() });
         userProfile.lastQuizDate = new Date().toDateString();
         localStorage.setItem('userProfile', JSON.stringify(userProfile));
         updateProfileDisplay();
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
             topicSelect.value = userProfile.preferredTopic || '';
             customTopicInput.style.display = 'none';
             customTopicInput.value = '';
             questionNumberSelect.value = '5';
             statusEl.innerText = 'Ready to start! Select or enter a topic below.';
             statusEl.style.background = '#e0f7fa';
             statusEl.style.color = '#0891b2';
             confettiContainer.innerHTML = '';
         });
     }
