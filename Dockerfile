# Basis-Image für Node.js
FROM node:18

# Arbeitsverzeichnis für den gesamten Container
WORKDIR /app

# Zuerst Backend-Pakete kopieren und Abhängigkeiten installieren
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Dann Frontend-Pakete kopieren und Abhängigkeiten installieren
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Backend und Frontend Quellcode kopieren
WORKDIR /app
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build das Frontend
WORKDIR /app/frontend
RUN npm run build

# Expose die Ports für das Backend (3000) und das Frontend (8080)
EXPOSE 3000
EXPOSE 8080

# Backend starten
WORKDIR /app/backend
CMD ["npm", "run", "start"]
