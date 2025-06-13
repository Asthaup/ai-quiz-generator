AI Quiz Generator 🎉
Welcome to the AI Quiz Generator, an interactive web application that creates personalized trivia quizzes using AI! Powered by the OpenRouter API, this project lets users test their knowledge on a wide range of topics, track their progress, and enjoy a gamified quiz experience with timers, lifelines, and celebratory animations. With a vibrant new color scheme and rewarding features, this app is designed to bring joy, excitement, and a "wow" feeling to every quiz-taker—whether you're a trivia enthusiast or just looking to learn something new!

🚀 Features

AI-Generated Quizzes: Dynamically generate trivia questions on any topic using the OpenRouter API.
User Profile System:
Save your name, preferred topic, and timer settings using localStorage.
Track quiz history, average score, high score, and daily streak.


Customizable Quizzes:
Choose from predefined topics (e.g., History, Science, Movies) or enter a custom topic.
Select the number of questions (3, 5, 7, or 10).


Customizable Timer:
Choose the timer duration per question (10, 15, 20, or 30 seconds).
Toggle the timer on or off for a stress-free experience.
Save your timer preferences for future quizzes.


Timed Challenges (Optional): When enabled, each question has a timer (default 15 seconds), adding excitement and challenge.
Lifelines:
Hint: Get a clue for the current question (1 use per quiz).
50/50: Eliminate two incorrect options (1 use per quiz).


Visual Feedback: Immediate feedback after each answer:
Mint green highlights for correct answers, peach for incorrect.
Explanations and additional facts for every question.


Progress Tracking:
View stats like quizzes taken, average score, high score, and streak.
High score updates automatically if you save a score that beats your previous best.


Score Management:
Choose to save your score to track progress or remove it if you want a fresh start.
Saved scores contribute to your quiz history, high score, and badges.


Achievement Badges:
Earn badges for milestones like completing your first quiz ("First Quiz Master 🏆"), achieving a perfect score ("Perfect Score Pro 🌟"), or maintaining a 3-day streak ("Streak Star 🔥").
Display your badges proudly on the main screen to feel accomplished!


Personalized Encouragement:
Receive tailored messages after each quiz, using your name for a personal touch (e.g., "Great job, Astha! You’re on fire! 🔥").
Get motivational prompts to return (e.g., "Come back tomorrow to keep your streak alive, Astha!").


Shareable Results:
Share your quiz results on Twitter with a fun message (e.g., "I scored 5/5 on a Science quiz in AI Quiz Generator! Can you beat me? 🚀").
Invite friends to play and compete, making the experience social and engaging.


Celebratory Animations: Confetti animations (using canvas-confetti) for perfect scores.
Vibrant Design:
Warm peach-to-orange background gradient, soft cream container, and coral buttons for a joyful vibe.
Responsive UI that works seamlessly on desktop and mobile devices.


Status Updates: Real-time feedback on your actions (e.g., topic selection, quiz progress) with color-coded messages:
Lavender for default, pastel pink for topic selection, mint green for correct answers, and peach for incorrect ones.



🛠️ Installation
Follow these steps to set up the AI Quiz Generator locally on your machine:

Clone or Download the Repository:

Clone the repository (replace YOUR_USERNAME with your actual GitHub username):git clone https://github.com/Asthaup/ai-quiz-generator.git
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
Customize the timer settings:
Select the timer duration (10, 15, 20, or 30 seconds).
Toggle the timer on or off (your preference is saved automatically).


Click "Generate Quiz" to fetch AI-generated trivia questions.


Take the Quiz:

Answer each question. If the timer is enabled, you’ll have the selected duration per question; otherwise, take as long as you’d like.
Use the Hint or 50/50 lifeline if you’re stuck (one use each per quiz).
After selecting an answer, see immediate feedback:
Correct answers are highlighted in mint green with a celebratory message.
Incorrect answers are highlighted in peach, showing the correct answer and an explanation.


Click "Next" to proceed to the next question (after a 1-second feedback delay).


View Results and Manage Your Score:

At the end of the quiz, see your score (e.g., 4/5).
Choose to "Save Score" to add it to your quiz history, update your high score, and earn badges, or "Remove Score" to discard it.
Share your results on Twitter to challenge friends!
Enjoy confetti animations if you achieve a perfect score!
Click "Play Again" to start a new quiz with a fresh set of questions.


Track Your Progress:

Check your stats on the main screen, including quizzes taken, average score, high score, and daily streak.
View your earned badges to feel a sense of achievement.
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
CSS3: For styling, including a responsive design, a vibrant color scheme, and the Poppins font from Google Fonts.
JavaScript: For core functionality, including API calls, DOM manipulation, and localStorage for persistence.
OpenRouter API: To generate AI-powered trivia questions.
canvas-confetti: For celebratory confetti animations on perfect scores.

🤝 Contributing
Contributions are welcome! If you’d like to enhance the AI Quiz Generator, follow these steps:

Fork the Repository:

Go to the repository page (replace YOUR_USERNAME with your actual GitHub username): https://github.com/Asthaup/ai-quiz-generator.
Click the "Fork" button at the top-right corner to create a copy of the repository under your GitHub account.


Clone Your Fork:
git clone https://https://github.com/Asthaup/ai-quiz-generator.git
cd ai-quiz-generator


Create a New Branch:
git checkout -b feature/your-feature


Make Your Changes and Commit:
git commit -m "Add your feature"


Push to Your Branch:
git push origin feature/your-feature


Open a Pull Request:

Go to your forked repository on GitHub.
Click "Compare & pull request" to submit your changes for review.



📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
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

Edit README.md and replace the placeholder image links with the actual paths:![Profile Setup]![Profile setup- 1](https://github.com/user-attachments/assets/510d5a18-51c4-46f5-902b-bf9b4427314f)

![Quiz in Progress]![quiz-in-progress- 1](https://github.com/user-attachments/assets/d0e96438-df34-47af-a4a7-5946b6ba0b52)

![Results Screen]![results-screen](https://github.com/user-attachments/assets/c1dc58f1-4509-48ed-8f44-7c07e1d2b318)


Commit the changes with a message like Update README with screenshot links.




Built with ❤️ by Astha (https://github.com/Asthaup/ai-quiz-generator)
