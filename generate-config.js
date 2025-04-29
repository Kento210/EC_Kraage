const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  GAS_ENDPOINT: process.env.GAS_ENDPOINT,
};

const outputPath = path.join(__dirname, 'public', 'config.js');
const outputContent = `window.__CONFIG__ = ${JSON.stringify(config)};`;

fs.writeFileSync(outputPath, outputContent, 'utf8');
console.log('Config file generated at:', outputPath);