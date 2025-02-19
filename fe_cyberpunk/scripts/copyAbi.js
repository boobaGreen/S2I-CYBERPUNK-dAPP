import { mkdir, copyFile } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Percorso sorgente: file ABI in be_cyberpunk
const srcPath = resolve(__dirname, '../../be_cyberpunk/artifacts/contracts/CyberPunk.sol/CyberPunkBoutique.json');
// Percorso di destinazione: all'interno di fe_cyberpunk/src/abis
const destDir = resolve(__dirname, './abis');
const destPath = join(destDir, 'CyberPunkBoutique.json');

// Crea la cartella di destinazione se non esiste
mkdir(destDir, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating destination directory:', err);
    process.exit(1);
  } else {
    copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error('Error copying ABI file:', err);
        process.exit(1);
      } else {
        console.log('ABI file copied successfully.');
      }
    });
  }
});