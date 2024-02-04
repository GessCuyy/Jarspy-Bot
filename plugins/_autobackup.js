/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fs from 'fs';
import archiver from 'archiver';

let lastSentTime = 0; // Timestamp of the last file sent

export async function before(m, { conn }) {
  const now = Date.now();
  const timeDiff = now - lastSentTime;

  // Only proceed if 1 hour have passed since the last file was sent
  if (timeDiff >= 60 * 60 * 1000) {
    lastSentTime = now;

    try {
      const output = fs.createWriteStream('backup.zip');
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        console.log('File zip berhasil dibuat');
        const pathfile = __dirname + '/backup.zip';
        const namafile = 'backup.zip';

        // Send the file
        let finale = fs.readFileSync('./backup.zip');
        conn.sendFile(nomorowner + `@s.whatsapp.net`, finale, 'backup.zip', 'Here is the backup', m)
          .then(() => {
            console.log('File zip berhasil dikirim');
            fs.unlink('./backup.zip', (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('File zip berhasil dihapus');
            });
          })
          .catch((err) => {
            console.error('Error sending file:', err);
          });
      });

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.warn(err);
        } else {
          throw err;
        }
      });

      archive.on('error', (err) => {
        throw err;
      });

      archive.pipe(output);
      archive.directory('database', false);
      archive.finalize();
    } catch (err) {
      console.error('Error creating zip file:', err);
    }
  }
}

export const disabled = false;