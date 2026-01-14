# Delicious Bites - Digital Restaurant Menu

A modern, responsive, and highly interactive digital restaurant menu application built with Next.js and Tailwind CSS. The app features a premium user interface with smooth animations, real-time search, and automatic theme synchronization.

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Backend/API**: [JSON Server](https://github.com/typicode/json-server) (Mock API)

## ✨ Features Implemented

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Dynamic Menu Grid**: Displays menu items with detailed information (price, description, dietary badges, etc.).
- **Category Filtering**: Quick access to Appetizers, Mains, Desserts, and Beverages with interactive category sliders.
- **Real-time Search**: Instant filtering of menu items as you type in the search bar.
- **Premium Hero Section**:
  - High-quality branded background image.
  - Interactive **Parallax Scroll** effect.
  - Scroll-linked fades and transforms for a cinematic entrance.
- **Automatic Theme Sync**: The app automatically detects and matches your system's light/dark mode preference.
- **Accessibility & UX**:
  - Proper form identification for browser autofill.
  - Interactive item detail modals.
  - Glassmorphism effects and modern typography.

## 🛠️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or later recommended)
- `npm` or `yarn`

### 2. Backend Setup (API)
Open a terminal and navigate to the backend directory:
```bash
cd Backend/Task-FE-Intern-SoftLien
npm install
npm run api
```
The mock server will start at `http://localhost:3001`.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd Frontend/app
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📝 Assumptions Made

- **Local Mock server**: It is assumed that the `json-server` (Backend) is running on port `3001` for the frontend to fetch data correctly.
- **System Theme Preference**: The manual theme toggle was removed in favor of a clean UI, with the assumption that users prefer the app to follow their OS-level theme settings (Light/Dark).
- **Asset Availability**: Generic high-quality restaurant images are used in the Hero section, assuming branding assets will be provided later.
- **Browser Compatibility**: The project uses modern CSS features (Tailwind v4) and React 19, assuming usage on modern evergreen browsers.
