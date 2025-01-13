# Basis-Image verwenden
FROM node:18-alpine

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Package-Dateien kopieren (für effizienteres Caching)
COPY package.json package-lock.json ./

# Abhängigkeiten installieren
RUN npm install

# Restliche Projektdateien kopieren
COPY . .

# Cypress-Binary installieren (falls nicht in Abhängigkeiten enthalten)
RUN npx cypress install

# Projekt bauen (falls notwendig)
RUN npm run build

# Standardkommando für den Container
CMD ["npm", "run", "dev"]
