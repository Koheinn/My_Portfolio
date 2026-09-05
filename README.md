# 🌌 Heinn Htet Zan's Portfolio

An immersive, intelligent digital portfolio highlighting the intersection of Data Engineering, AI, and Software Engineering. Built with modern React, Three.js, and Framer Motion.

## 🚀 Features

* **Dimension 1 — Identity:** Focuses on Cloud-Native Data Engineering, Machine Learning, and Software Architecture.
* **Dimension 2 — Motion:** Smooth scroll choreography, horizontal scroll progress indicators, interactive 3D particle systems, and page transitions using Framer Motion.
* **Dimension 3 — Depth:** Glass surfaces, spatial compositions, and high-performance React Three Fiber environments.
* **Dimension 4 — Data:** Dynamic project fetching, advanced filtering, searching, and pagination of GitHub repositories.
* **Dimension 5 — Communication:** Full-stack Express backend integrating the **Resend API** for direct contact form submissions.

## 🛠️ Technology Stack

* **Frontend:** React 18, TypeScript, Vite
* **Backend:** Express, Node.js, Resend API
* **Styling:** Tailwind CSS (Custom dark-first theme)
* **3D & Animation:** Three.js, React Three Fiber, Framer Motion
* **Data Visualization:** Recharts
* **Icons:** Lucide React

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file in the root directory and add your Resend API Key:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🐳 Docker Deployment (Render, Railway, etc.)

This repository now uses a full-stack configuration and compiles both the Express backend and Vite frontend into a single deployment.

1. **Build the Docker image:**
   ```bash
   docker build -t 5d-portfolio .
   ```

2. **Run the container locally:**
   ```bash
   docker run -p 3000:3000 -e RESEND_API_KEY=your_key 5d-portfolio
   ```
   *The application will be available at `http://localhost:3000`*

---
*Targeting AWS Certified Data Engineer Associate.*
