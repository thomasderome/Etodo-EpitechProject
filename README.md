# 🚀 [Nom de Votre Projet] - E-Todo

![License](https://img.shields.io/badge/license-MIT-blue)

> Une solution de gestion de tâches collaborative, permettant le partage de listes en temps réel avec gestion des permissions.

## 📋 Table des matières

- [À propos](#-à-propos)
- [Stack Technique](#-stack-technique)
- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation et Démarrage](#-installation-et-démarrage)
- [Auteurs](#-auteurs)

## 📖 À propos

**[Next E-todo]** est une application web fullstack développée en binôme. Elle permet aux équipes de créer, gérer et partager des listes de tâches. Ce projet est notre deuxièmes projet fullstack de première année de Bachelors.

## 🛠 Stack Technique

* **Frontend :** Next.js (React framework), TypeScript (TSX), CSS/Tailwind, AnimateUi.
* **Backend :** Node.js, Express.js.
* **Base de données :** MySQL.
* **Déploiement :** Docker.

## ✨ Fonctionnalités

### 🔐 Authentification & Utilisateur
* **Login/Register :** Flux d'inscription et de connexion.
* **Settings :** Modification du nom d'utilisateur, de l'email et du mot de passe.
* **Logout :** Déconnexion.

### 📝 Gestion des Todo Lists
* **CRUD Complet :** Créer, Renommer, Supprimer des listes.
* **Statuts de liste :** Suivi global (*In Progress*, *Done*).
* **Partage Collaboratif :** Partagez une liste avec un autre utilisateur via son email.
    * *Mode Read :* L'invité peut seulement voir la liste.
    * *Mode Write :* L'invité peut ajouter/modifier des tâches.

### ✅ Gestion des Tâches (Tasks)
* **Détails :** Ajout de titre et de description pour chaque tâche.
* **Workflow :** Système de statut à 3 états (*Todo* ➡️ *In Progress* ➡️ *Done*).
* **Timeline :** Ajout de date de d'échéance pour chaque task.
* **Actions :** Renommer ou supprimer des tâches individuellement.

## ⚙️ Prérequis

Assurez-vous d'avoir installé :
* [Docker](https://www.docker.com/)
* [Git](https://git-scm.com/)

## 🚀 Installation et Démarrage

Suivez ces étapes pour lancer le projet localement.

### 1. Cloner le projet
```bash
git clone https://github.com/EpitechBachelorPromo2028/B-WEB-101-NCE-1-1-etodo-3.git
cd B-WEB-101-NCE-1-1-etodo-3
```

### 2. Setup .env

Créer un .env en se basant sur le .env ex.

### 3. Lancer le Docker

```bash
docker compose up -d
```

## 👥 Auteurs
Projet réalisé par:
* **[Derome Thomas](https://github.com/thomasderome)**
* **[Lopez Loza Juan](https://github.com/juan-lopez-loza)**
