/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import claim from './rpg-claim.js'
import hourly from './rpg-hourly.js'
import daily from './rpg-daily.js'
import weekly from './rpg-weekly.js'
import monthly from './rpg-monthly.js'

import Connection from '../lib/connection.js'

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const inventory = {
  others: {
    health: true,
    level: true,
    limit: true,
    exp: true,
    role: true,
    followers: true,
  },
  foodbank: {
    burger: true,
    pizza: true,
    kentang: true,
  },
  items: {
    money: true,
    potion: true,
  },
  crates: {
    uncommon: true,
    common: true,
    rare: true,
    mythical: true,
    legendary: true,
    ancient: true,
  },
  cooldowns: {
    lastclaim: {
      name: 'claim',
      time: claim.cooldown
    },
    lasthourly: {
      name: 'hourly',
      time: hourly.cooldown
    },
    lastdaily: {
      name: 'daily',
      time: daily.cooldown
    },
    lastweekly: {
      name: 'weekly',
      time: weekly.cooldown
    },
    lastmonthly: {
      name: 'monthly',
      time: monthly.cooldown
    },
  }
}
let jarspy = async (m, { conn, args, usedPrefix, isPrems, isROwner }) => {
  
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  let pengirim = who
  if (!who || !isROwner) {
    	who = m.sender
        pengirim = m.sender
  }
  let user = await db.users.get(who)
  let usar = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.nama == '-') {
    throw `Kamu harus mempunyai nama agar bisa membuka inventory! Ketik */set nama <namamu>* untuk mendapatkan nama`
    return
  }
  user.role = global.rpg.role(user.level).name
  const foodbank = Object.keys(inventory.foodbank).map(v => user[v] && `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)}: ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const items = Object.keys(inventory.items).map(v => user[v] && `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)}: ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const crates = Object.keys(inventory.crates).map(v => user[v] && `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)}: ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const cooldowns = Object.entries(inventory.cooldowns).map(([cd, { name, time }]) => cd in user && `⌛${capitalizeFirstLetter(name)}: ${new Date() - user[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()
  
  if (((user.lasteat) - +new Date()) < 86400000 * 1) {
      m.reply(`Kamu butuh makan\n🍴 Waktu sebelum mati kelaparan: *${((user.lasteat) - +new Date()).toTimeString()}*`)
  }
  
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
  let apakahpremium = '❌'
  if (([conn.decodeJid(Connection.conn.user?.id || ''), ...global.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)) || (global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who))) {
    apakahpremium = '✅'
  }
  
  const caption = `
▢ *${user.nama} Inventory*
*────────────────────*
⭐ *Premium:* ${apakahpremium}

*⦿ Main*
${Object.keys(inventory.others).map(v => user[v] && `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)}: ${toSimple(user[v])}`).filter(v => v).join('\n')}${foodbank ? `
*────────────────────*
*⬡ Area Bank Makanan*
${foodbank}
➔ Jumlah Makanan: ${Object.keys(inventory.foodbank).map(v => user[v]).reduce((a, b) => a + b, 0)} Makanan` : ''}${items ? `
*────────────────────*
*⬡ Item*
${items}
➔ Jumlah Item: ${toSimple(Object.keys(inventory.items).map(v => user[v]).reduce((a, b) => a + b, 0))} Barang` : ''}${crates ? `
*────────────────────*
*⬡ Crate*
${crates}
➔ Total Crate: ${toSimple(Object.keys(inventory.crates).map(v => user[v]).reduce((a, b) => a + b, 0))} Peti` : ''}${cooldowns ? `
*────────────────────*
*⬡ Cooldown*
${cooldowns}` : ''}
*────────────────────*
`.trim()
  conn.sendMessage(m.chat, {
     text: caption,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: namabot,
     body: '',
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: pp,
     renderLargerThumbnail: false
     }}}, { quoted: m })
  
}
jarspy.help = ['inventory', 'inv']
jarspy.tags = ['rpg']
jarspy.command = /^(inv(entory)?|money|e?xp)$/i
export default jarspy

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
  if (isNaN(parseFloat(number))) return number;
  if (parseFloat(number) === 0) return '0';
  number = parseFloat(number).toFixed(0);
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
  const base = 1000;
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[exponent] || '';
  const simplified = number / Math.pow(base, exponent);
  const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  return formatter.format(simplified) + suffix;
}

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}