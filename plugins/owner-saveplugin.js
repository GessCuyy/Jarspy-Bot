import fs from 'fs' 
import Connection from '../lib/connection.js'
let jarspy = async (m, { conn, text, usedPrefix, command }) => {
   if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
   if (!text) throw `Contoh pemakaian:\n${usedPrefix + command} menu` 
   if (!m.quoted.text) throw `balas pesan nya!` 
   let path = `plugins/${text}.js` 
   await fs.writeFileSync(path, m.quoted.text) 
   m.reply(`*tersimpan di ${path}*`)
   return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${namaowner}`, m)
} 
jarspy.help = ['sfp']
jarspy.tags = ['owner'] 
jarspy.command = /^sfp$/i 

export default jarspy