# 🏥 Talavera Hospital Chatbot App

[![Status](https://img.shields.io/badge/status-in%20progress-yellow)](https://github.com/yourusername/talavera-chatbot-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11-blue)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)](https://www.mongodb.com/)


A web chatbot and clinical case validator application developed by **2nd-year DAM and DAW students** at **IES Ribera del Tajo** with the help of **AI course** student's AI model. The app helps **doctors and staff** of the **Hospital of Talavera de la Reina** with instant access to a custom trained **AI Assistant**.

---

## 📱 Features
- AI-powered chatbot for hospital inquiries  
- Cross-platform: Android mobile app and web interface
- Clinical cases validation forms for doctors
- Non-relational (**MongoDB**) database support  
- FastAPI (Python/Java) and Node.js backend for responsive APIs  
- Clean and intuitive interface for better user experience

---

## 🛠️ Technologies
- **Frontend:** Web (Node.js & TailwindCSS)  
- **Backend:** FastAPI (Python)  
- **Database:** MongoDB  
- **AI Integration:** Custom Model

---

## 📂 Project Structure
```
/PIMD-CodeCrusaiders
│
├─ /backend-fastapi    # FastAPI Backend
├─ /frontend_proyecto  # Web interface to consume APIs
├─ /docs               # Documentation, diagrams, screenshots
├─ docker-compose      # Launcher file for the app's containers
├─ .gitignore          # Declares ignored files for commits
└─ README.md           # Project description
```

---

## ⚡ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Alejandro14-hue/PIMD-CodeCrusaiders.git
cd PIMD-CodeCrusaiders
```

2. **Backend Setup**

### FastAPI (Python)
```bash
cd backend-fastapi
# Create virtual environment (optional but recommended)
python -m venv venv
# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

3. **Frontend Setup**
```bash
cd frontend
# Open index.html in your browser or serve it using a simple server
# Example with python:
python -m http.server 8000
```

---

## Docker Instructions

> It's important to have Docker Desktop intalled and running to use this lauch option

1. **Docker Compose Up**
```bash
# This command constructs and compiles the app into the containers
# specified by the docker-compose.yml file
docker compose -f docker-compose.yml up -d
```

2. **Docker Compose Down**
```bash
# This command destructs and erases the app and data
# associated to the containers of the app
docker compose -f docker-compose.yml down -v
```

3. **Restart Containers**
```bash
# In case any of the containers becomes unable to operate
# we suggest restarting the containers before deleting
docker compose -f docker-compose.yml restart
```

---

## 👥 Contributors
- 2nd-year DAM and DAW students, **IES Ribera del Tajo**  
- AI course students

---

## 📄 License
MIT License

---

## 📊 Badges and Resources
- [FastAPI Documentation](https://fastapi.tiangolo.com/)  
- [Node.js Documentation](https://nodejs.org/en/docs/)  
- [MongoDB Documentation](https://www.mongodb.com/docs/)

Actas de Conciliación y varios

https://docs.google.com/document/d/1bBpsNPGa1qf3z5jqF7VlgnffzNveZo2EUUL07oe-dw0/edit?usp=sharing
