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

     generateBtn.addEventListener('click', async () => {
         const topic = topicSelect.value;
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
             statusEl.style.background = '#fff1f2';
             statusEl.style.color = '#ff4757';
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
                 "Authorization": "Bearer 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",
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
                 statusEl.innerText = `Answer selected for Question ${currentQuestionIndex + 1}/${quizData.length}. Click Next to continue.`;
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
             statusEl.innerText = `You're on Question ${currentQuestionIndex + 1}/${quizData.length}.`;
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
         resultEl.innerHTML = `You scored ${score}/${quizData.length}! `;
         if (score === quizData.length) resultEl.innerHTML += 'Perfect score! 🎉';
         else if (score >= Math.floor(quizData.length * 0.6)) resultEl.innerHTML += 'Great job! 😊';
         else resultEl.innerHTML += 'Nice try! Keep practicing! 💪';
         resultEl.innerHTML += '<br><button id="playAgain" class="btn">Play Again</button>';
         resultEl.style.display = 'block';
         statusEl.innerText = `Quiz completed! Your score: ${score}/${quizData.length}. Play again?`;
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
