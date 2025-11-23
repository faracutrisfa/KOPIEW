# ☕ Kopiew — Vue 3 + Vite + Tailwind CSS

A simple UI project for Kopiew: coffee place & review app built with **Vue 3**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 How to Run

```bash
# 1. Clone this project
git clone https://github.com/faracutrisfa/kopiew-web.git
cd kopiew-web

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

## 🧭 Folder Structure (Simplified)

```
src/
├─ layouts/        # App & Auth layouts
├─ views/          # Pages (Home, Login, Register, Dashboard, Profile)
├─ components/     # Reusable UI components
├─ router/         # Vue Router setup
├─ main.ts         # App entry
└─ style.css       # Tailwind import
```

---

## 🌿 How to Push Changes

```bash
# Check current branch
git branch

# Create a new feature branch
git checkout -b feat/home-page

# Add and commit your changes
git add .
git commit -m "feat: add home page UI"

# Push to GitHub
git push -u origin feat/home-page
```

---

## 🧾 Semantic Commit Guide

Use clear commit messages following this pattern:

```
<type>: <short description>
```

### Common types

| Type       | Meaning                           |
| ---------- | --------------------------------- |
| `feat`     | new feature                       |
| `fix`      | bug fix                           |
| `docs`     | documentation update              |
| `style`    | UI or styling changes             |
| `refactor` | code improvement (no feature/bug) |
| `chore`    | small setup/config change         |

### Examples

```bash
feat: add login and register pages
fix: correct navbar route links
docs: update README with setup guide
style: improve dashboard layout
```

---

💡 _Tip:_ Keep commits small and meaningful.
Push your branch, then open a Pull Request to merge into `main`.

---

## 🧰 Tech Stack

- Vue 3 + TypeScript
- Vite
- Tailwind CSS v4
- Vue Router

---
