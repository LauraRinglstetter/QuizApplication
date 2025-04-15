# ---------- STAGE 1: Frontend bauen ----------
    FROM node:18 AS frontend-builder

    # Arbeitsverzeichnis für das Frontend
    WORKDIR /app/frontend
    
    # Installiere Abhängigkeiten und baue die Vue-App
    COPY frontend/package*.json ./
    RUN npm install
    COPY frontend/ .
    RUN npm run build
    
    
    # ---------- STAGE 2: Backend + statisches Frontend ----------
    FROM node:18
    
    # Arbeitsverzeichnis für das Backend
    WORKDIR /app
    
    # Installiere Backend-Abhängigkeiten
    COPY backend/package*.json ./
    RUN npm install
    
    # Kopiere Backend-Code
    COPY backend/ .
    
    # Kopiere gebaute Frontend-Dateien ins Backend-Verzeichnis
    COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
    
    # Port auf dem die App läuft (Fly erwartet 8080)
    EXPOSE 8080
    
    # Starte den Server
    CMD ["node", "index.js"]
    