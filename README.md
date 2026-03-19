# 🖥️ Portfolio OS — Interactive Desktop Portfolio

A developer portfolio designed as a **desktop operating system simulation**, where users interact with apps, windows, and system UI instead of traditional web pages.

This project reflects a **system-oriented approach to frontend development**, focusing on structure, interaction, and modular design.

## 🚀 Overview

Portfolio OS transforms a portfolio into a **desktop-like environment**:

- Open apps like a real OS
- Navigate using icons and dock
- Interact with windows and UI components

Instead of static sections, the portfolio behaves like a **mini operating system in the browser**.

## 🌐 Live Demo

👉 [https://portfolioospg.netlify.app]

## ⚙️ Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript

## ✨ Features

- 🖥️ Desktop-style UI
- 🪟 Window-based application system
- 📌 Dock navigation
- 📊 Menu bar (clock, battery UI)
- 🎵 Music system with global state
- ⌨️ Terminal-style interactions
- 🌌 Matrix-style animated background
- ⚡ Modular app architecture

  
## 🧠 Architecture

### 🔹 App-Based System

Each feature is built as an independent app:

- About
- Projects
- Skills
- Terminal
- Music

This keeps the system modular and scalable.

### 🔹 Window Management

All apps are rendered inside a reusable component:

This simulates:
- Opening apps
- Switching views
- Desktop-like interaction

### 🔹 Global State (Music System)
Used to manage:
- Song playback
- Shared state across components

---

### 🔹 UI Components

- Desktop → Main environment  
- Dock → App launcher  
- MenuBar → System info (clock, battery)  
- Background → Visual engine (Matrix effect)  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash--
git clone https://github.com/prashantgoyal7691/portfolioOS.git
cd portfolioOS
npm install
npm run dev
```

👨‍💻 Author
Prashant Goyal
	•	GitHub: https://github.com/prashantgoyal7691
