# Deployment Guide (Render)

This guide walks you through deploying your full-stack Face Recognition application to [Render.com](https://render.com). Render is recommended because it supports PostgreSQL, Node.js, and Static Sites easily.

## Prerequisites

1.  Push your latest code to GitHub.
2.  Create a [Render account](https://render.com).

## 1. Database Deployment (PostgreSQL)

1.  Click **New +** and select **PostgreSQL**.
2.  **Name**: `facerecognition-db` (or similar).
3.  **Region**: Choose the one closest to you.
4.  **Plan**: Select **Free**.
5.  Click **Create Database**.
6.  Wait for it to be created. Copy the **Internal Database URL** (for backend) and **External Database URL** (for local access if needed).

### Initialize the Database

1.  Connect to your hosted database using a tool like Postico, pgAdmin, or the command line using the **External Database URL**.
2.  Run the following command in your terminal (replace `YOUR_EXTERNAL_DATABASE_URL` with your actual connection string):

    ```bash
    psql "YOUR_EXTERNAL_DATABASE_URL" -f "/Users/rickelme/Documents/Kelmi Full Stack Developer/ZTM Full Stack Web Developer/Full Stack Final Project/facerecognition api/init.sql"
    ```

## 2. Backend Deployment (Node.js)

1.  Click **New +** and select **Web Service**.
2.  Connect your GitHub repository.
3.  **Name**: `facerecognition-api`
4.  **Root Directory**: `facerecognition api` (IMPORTANT: This tells Render where your backend code is).
5.  **Environment**: `Node`
6.  **Build Command**: `npm install`
7.  **Start Command**: `node server.js`
8.  **Plan**: Select **Free**.
9.  **Advanced** -> **Environment Variables**:
    - Key: `DATABASE_URL`
    - Value: (Paste the **Internal Database URL** from Step 1)
10. Click **Create Web Service**.
11. Wait for deployment. Copy the **onrender.com** URL (e.g., `https://facerecognition-api.onrender.com`).

## 3. Frontend Deployment (Static Site)

1.  Click **New +** and select **Static Site**.
2.  Connect your GitHub repository.
3.  **Name**: `facerecognition-app`
4.  **Root Directory**: `facerecognition-app`
5.  **Build Command**: `npm install && npm run build`
6.  **Publish Directory**: `dist`
7.  **Advanced** -> **Environment Variables**:
    - Key: `VITE_API_URL`
    - Value: (Paste your Backend URL from Step 2, e.g., `https://facerecognition-api.onrender.com`)
8.  Click **Create Static Site**.
9.  Wait for deployment. Your app is now live!
