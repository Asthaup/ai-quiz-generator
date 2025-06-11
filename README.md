AI Quiz Generator 🎉
Welcome to the AI Quiz Generator, an interactive web application that creates personalized trivia quizzes using AI! Powered by the OpenRouter API, this project lets users test their knowledge on a wide range of topics, track their progress, and enjoy a gamified quiz experience with timers, lifelines, and celebratory animations. Whether you're a trivia enthusiast or looking to learn something new, this app has something for everyone!

🚀 Features

AI-Generated Quizzes: Dynamically generate trivia questions on any topic using the OpenRouter API.
User Profile System:
Save your name and preferred topic using localStorage.
Track quiz history, average score, high score, and daily streak.


Customizable Quizzes:
Choose from predefined topics (e.g., History, Science, Movies) or enter a custom topic.
Select the number of questions (3, 5, 7, or 10).


Timed Challenges: Each question has a 15-second timer, adding excitement and challenge.
Lifelines:
Hint: Get a clue for the current question (1 use per quiz).
50/50: Eliminate two incorrect options (1 use per quiz).


Visual Feedback: Immediate feedback after each answer:
Green highlight for correct answers, red for incorrect.
Explanations and additional facts for every question.


Progress Tracking:
View stats like quizzes taken, average score, high score, and streak.
High score updates automatically if you beat your previous best.


Celebratory Animations: Confetti animations (using canvas-confetti) for perfect scores.
Responsive Design: Clean, modern UI that works seamlessly on desktop and mobile devices.
Status Updates: Real-time feedback on your actions (e.g., topic selection, quiz progress) with color-coded status messages.

🛠️ Installation
Follow these steps to set up the AI Quiz Generator locally on your machine:

Clone or Download the Repository:

Clone the repository:git clone https://github.com/Asthaup/ai-quiz-generator.git
cd ai-quiz-generator


Alternatively, download the ZIP file from the GitHub repository and extract it.


Obtain an OpenRouter API Key:

Sign up or log in at OpenRouter.
Go to https://openrouter.ai/keys and generate a new API key.
Copy the API key (e.g., sk-or-v1-...).


Configure the API Key:

Open script.js in a text editor (e.g., VS Code, Notepad).
Locate the line:"Authorization": "Bearer YOUR_API_KEY",


Replace YOUR_API_KEY with your actual OpenRouter API key.
Save the file.


Run the Application:

Double-click index.html to open it in a modern web browser (e.g., Google Chrome), or drag the file into your browser.
Important: The app must be run locally to keep the API key secure. Do not host script.js with your API key on a public server (e.g., GitHub Pages) without securing it first.



📖 Usage
Get started with the AI Quiz Generator in just a few steps:

Set Up Your Profile:

On first launch, enter your name and (optionally) select a preferred topic.
Click "Start Quizzing!" to save your profile and proceed to the main screen.


Generate a Quiz:

Select a topic from the dropdown (e.g., History, Science) or choose "Custom Topic" to enter your own.
Choose the number of questions (3, 5, 7, or 10) from the dropdown.
Click "Generate Quiz" to fetch AI-generated trivia questions.


Take the Quiz:

Answer each question within 15 seconds, or the app will automatically move to the next question (marking the current one as incorrect).
Use the Hint or 50/50 lifeline if you’re stuck (one use each per quiz).
After selecting an answer, see immediate feedback:
Correct answers are highlighted in green with a celebratory message.
Incorrect answers are highlighted in red, showing the correct answer and an explanation.


Click "Next" to proceed to the next question (after a 1-second feedback delay).


View Results and Stats:

At the end of the quiz, see your score (e.g., 4/5) and updated stats (quizzes taken, average score, high score, streak).
Enjoy confetti animations if you achieve a perfect score!
Click "Play Again" to start a new quiz with a fresh set of questions.


Track Your Progress:

Check your stats on the main screen, including quizzes taken, average score, high score, and daily streak.
Edit your profile (name or preferred topic) anytime by clicking "Edit Profile".



🖼️ Screenshots
Profile Setup

Quiz in Progress

Results Screen with Confetti

Note: Replace the placeholder images above with actual screenshots of your app. See the Adding Screenshots section below for instructions.
🛡️ Security Note

API Key Security: The OpenRouter API key in script.js is currently set to a placeholder (YOUR_API_KEY). If you’ve added your actual API key for local testing, do not push it to a public repository or host the app on a public server (e.g., GitHub Pages) without securing it. Consider using environment variables or a backend proxy for production deployment.
Regenerate API Key: If you’ve exposed your API key, reset it at https://openrouter.ai/keys and update script.js with the new key for local use.

💻 Technologies Used

HTML5: For the structure of the web application.
CSS3: For styling, including a responsive design and the Poppins font from Google Fonts.
JavaScript: For core functionality, including API calls, DOM manipulation, and localStorage for persistence.
OpenRouter API: To generate AI-powered trivia questions.
canvas-confetti: For celebratory confetti animations on perfect scores.

🤝 Contributing
Contributions are welcome! If you’d like to enhance the AI Quiz Generator, follow these steps:

Fork the repository.
Create a new branch:git checkout -b feature/your-feature


Make your changes and commit them:git commit -m "Add your feature"


Push to the branch:git push origin feature/your-feature


Open a Pull Request on GitHub.

🙌 Acknowledgments

OpenRouter: For providing the API to generate trivia questions.
canvas-confetti: For the confetti animation library.
Google Fonts: For the Poppins font used in the UI.
xAI: For assistance in building and enhancing this project through Grok 3.

📸 Adding Screenshots
To make your README more engaging, add screenshots of your app by following these steps:

Take Screenshots:

Open index.html locally in your browser.
Capture screenshots at different stages (e.g., profile setup, quiz in progress, results screen with confetti).
On Windows: Use PrtSc or Snipping Tool.
On Mac: Use Cmd + Shift + 4.


Save the images as profile-setup.png, quiz-in-progress.png, and results-screen.png.


Upload Screenshots to the Repository:

Go to your repository on GitHub.
Click "Add file" > "Create new file".
Name the file screenshots/profile-setup.png (this creates a screenshots folder).
Click "Choose your files" and upload profile-setup.png.
Commit the file with a message like Add profile setup screenshot.
Repeat for quiz-in-progress.png and results-screen.png.


Update the README.md:

Edit README.md and replace the placeholder image links with the actual paths:![Profile Setup](screenshots/profile-setup.png)
![Quiz in Progress](screenshots/quiz-in-progress.png)
![Results Screen](screenshots/results-screen.png)


Commit the changes with a message like Update README with screenshot links.




Built with ❤️ by Astha (https://github.com/Asthaup/ai-quiz-generator)
