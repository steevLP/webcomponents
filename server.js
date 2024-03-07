// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Statisches Dateiverzeichnis für den Server einrichten
app.use('/components', express.static('components'));

// Middleware, um den MIME-Typ für JavaScript-Dateien festzulegen
app.use((req, res, next) => {
    const ext = path.extname(req.path);
    if (ext === '.js') {
      res.set('Content-Type', 'application/javascript');
    } else if(ext === '.html'){
        res.set('Content-Type', 'text/html');
      }
    next();
  });

// Routenbehandlung für Ihre Webkomponente
app.get('/', (req, res) => {
  // Lassen Sie den Server die HTML-Datei senden
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});