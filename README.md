# portfolioOS
A macOS-inspired interactive developer portfolio built with React.
Instead of a traditional scrolling website, this portfolio behaves like a desktop operating system where users can open applications, interact with windows, and explore projects.

The goal of this project is to showcase both frontend engineering skills and system design thinking through an immersive UI.

⸻

Live Demo


Features

Desktop Environment
	•	Draggable application icons
	•	Persistent icon positions
	•	macOS-style dock
	•	Menu bar interface

Window Management
	•	Open multiple windows
	•	Drag and reposition windows
	•	Window focus system
	•	Maximize / restore windows
	•	Duplicate window functionality
	•	Context menu (right-click / two-finger tap)
	•	Auto-closing context menus

Interactive Applications

Inside the desktop you can open:
About
Skills
Projects
Education
Contact
Resume
Terminal

Each section opens inside its own application window.

Terminal Interface

Custom terminal built inside the portfolio.

Supports commands like:
help
ls
cd
open
clear
python

Includes a simulated Python shell for interaction.

Developer Experience
	•	Matrix style animated background
	•	Glassmorphism windows
	•	Smooth UI animations
	•	Dark developer-focused theme

⸻
Project Structure
src
 ├── apps
 │   ├── AboutApp.jsx
 │   ├── SkillsApp.jsx
 │   ├── ProjectsApp.jsx
 │   ├── ContactApp.jsx
 │   ├── EducationApp.jsx
 │   └── TerminalApp.jsx
 │
 ├── components
 │   ├── Desktop
 │   ├── Window
 │   ├── Dock
 │   ├── MenuBar
 │   └── Background
 │
 └── App.jsx

Installation

Clone the repository
git clone https://github.com/prashantgoyal7691/prashant-portfolio.git

Go to project folder
cd prashant-portfolio

Install dependencies
npm install

Run development server
npm run dev

Why this Project?

Most portfolios are simple static pages.
This project explores a different idea:

Turning a developer portfolio into a mini operating system interface.

It demonstrates:
	•	Advanced UI architecture
	•	Component-based design
	•	Interactive frontend systems
	•	Creative problem solving


Future Improvements

Planned features:
	•	Desktop right-click menu
	•	Window resizing
	•	Spotlight search
	•	Dock magnification effect
	•	GitHub project integration
	•	Terminal filesystem simulation


Author

Prashant Goyal
Computer Science Student
NIT Srinagar

GitHub
https://github.com/prashantgoyal7691

LinkedIn
https://www.linkedin.com/in/prashantgoyal7691
