# Basis-Image
FROM node:18

# Arbeitsverzeichnis
WORKDIR /app

# Paketdateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Port (je nach App ggf. anpassen)
EXPOSE 3000

# App starten
CMD ["node", "index.js"]
