# 🚀 E-Todo

![License](https://img.shields.io/badge/license-MIT-blue)

> A collaborative task management solution, allowing real-time list sharing with permission management.

## 🇬🇧 Language
- [Français](https://github.com/EpitechBachelorPromo2028/B-WEB-101-NCE-1-1-etodo-3/blob/main/README.md)
- [English](https://github.com/EpitechBachelorPromo2028/B-WEB-101-NCE-1-1-etodo-3/blob/main/README_EN.md)


## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation and Startup](#-installation-and-startup)
- [Authors](#-authors)

## 📖 About

**[Next E-todo]** is a full-stack web application developed by a two-person team. It allows teams to create, manage, and share task lists. This project is our second full-stack project of our first year of Bachelor's degree.

## 🛠 Tech Stack

* **Frontend:** Next.js (React framework), TypeScript (TSX), CSS/Tailwind, AnimateUi.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL.
* **Deployment:** Docker.

## ✨ Features

### 🔐 Authentication & User
* **Login/Register:** Registration and login flow.
* **Settings:** Change username, email, and password.
* **Logout:** Sign out.

### 📝 Todo List Management
* **Full CRUD:** Create, Rename, Delete lists.
* **List Statuses:** Global tracking (*In Progress*, *Done*).
* **Collaborative Sharing:** Share a list with another user via their email.
    * *Read Mode:* The guest can only view the list.
    * *Write Mode:* The guest can add/modify tasks.

### ✅ Task Management
* **Details:** Add a title and description for each task.
* **Workflow:** 3-state status system (*Todo* ➡️ *In Progress* ➡️ *Done*).
* **Timeline:** Add a due date for each task.
* **Actions:** Rename or delete individual tasks.

## ⚙️ Prerequisites

Make sure you have installed:
* [Docker](https://www.docker.com/)
* [Git](https://git-scm.com/)

## 🚀 Web Installation and Startup

Follow these steps to launch the project.

### 1. Clone the project
```bash
git clone https://github.com/EpitechBachelorPromo2028/B-WEB-101-NCE-1-1-etodo-3.git
cd B-WEB-101-NCE-1-1-etodo-3
```

### 2. Setup .env

Create a .env file based on the .env ex.

### 3. Launch Docker

```bash
docker compose up -d
```

## ⚙️ Prerequisites

Make sure you have installed:
* [Docker](https://www.docker.com/)
* [Git](https://git-scm.com/)
* [Android Studio](https://developer.android.com/studio)

## 🚀 Compile for Android
Follow these steps to compile the Android app.

### 1. Clone the project
```bash
git clone https://github.com/EpitechBachelorPromo2028/B-WEB-101-NCE-1-1-etodo-3.git
cd B-WEB-101-NCE-1-1-etodo-3
```

### 2. Setup .env

Create a .env file based on the .env ex.

### 3. Compile
```bash
cd frontend
npm i
npm run build:android
```
The build output is located here:
```bash
cd android/app/build/outputs/apk/debug
```

> ⚠️ Warning: for the application to work correctly, you will need Docker to be up and the same .env file as for Docker. ⚠️

## 👥 Authors
Project carried out by:
* **[Derome Thomas](https://github.com/thomasderome)**
* **[Lopez Loza Juan](https://github.com/juan-lopez-loza)**
