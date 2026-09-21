# One Health Card System

A React-based digital health identity platform. Every citizen gets a QR-coded **One Health Card** — built around a Family ID and an individual Member ID — for fast access to health information and healthcare services.

## 🚀 Features

- **Registration** – online sign-up that auto-generates a Family ID and a per-member Member ID
- **Digital Health Card** – QR-coded card, previewed in-app and downloadable as an image (via `qrcode.react` + `html-to-image`)
- **Emergency access** – medical personnel can scan the QR code to pull up critical health information quickly
- **Digital health records** – vaccinations, allergies, medications, and past treatments
- **Notifications** – health updates and alerts
- **Resources & laws** – in-app pages covering health resources and relevant privacy/health laws
- **Login** – sign in with phone or email
- **Contact support** – built-in contact page

## 🛠️ Tech Stack

- React 18 (Create React App)
- `qrcode.react` – QR code generation for the health card
- `html-to-image` – exporting the card as a downloadable image
- CSS (custom, component-scoped styles)

## 📂 Project Structure

```
OneHealthApp/
├── public/
└── src/
    ├── components/
    │   ├── HomePage.jsx
    │   ├── RegistrationPage.jsx
    │   ├── LoginPage.jsx
    │   ├── CardPreviewPage.jsx
    │   ├── NotificationsPage.jsx
    │   ├── ResourcesPage.jsx
    │   ├── LawsPage.jsx
    │   ├── ContactPage.jsx
    │   ├── Header.jsx
    │   └── Footer.jsx
    ├── App.js
    └── index.js
```

## ⚙️ Getting Started

```bash
git clone https://github.com/kalyanijatavath/OneHealthApp.git
cd OneHealthApp
npm install
npm start
```

The app runs at `http://localhost:3000`.

### Available scripts

- `npm start` – runs the app in development mode
- `npm run build` – builds the app for production
- `npm test` – runs tests

## 👩‍💻 Author

**Jatavath Kalyani**

B.Tech CSE | Full Stack & AI/ML Enthusiast
