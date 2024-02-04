/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)

  # Thanks to all. 
  • Aaron (My leader)
  • Neil. T (My Partner)
  • Karl (Rdp)
  • Kaleb (Missing Njir)
  • Uniq (Idea)
  • BochilGaming (Base)
  • Whiskeysockets (Baileys)
  • Tronyx (Optiklink)
  • Mr.retslav (Retslav founder) & ibas (Helping fix bot connect)
  • Lolhuman (Api)
  • Erlan (Api menyala bosku🔥)
  • Danz (Friend) (Helping me)
  • Rehan El Staro (Friend) (Helping me)
  • Manz Radit (Friend) (Hilang gatau kemana)
  • Nayla (Friend) (Helping me)
  • Malik & Komang
  • ImYanXiao & Xnuvers007
  • Dan semuanya, sorry kalau ga kesebut
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.rowner = [
  ['6282148864989', 'Jarsepay', true]
]

global.owner = [
  ['6282148864989', 'Jarsépay', true],
  ['6287763792950', 'al', true]
]
global.mods = ['']
global.prems = ['6282148864989', '6287763792950']

global.lolkey = 'GataDios'
global.lann = 'YOURAPIKEY'

global.APIs = {
  nrtm: 'https://nurutomo.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  lann: 'https://api.betabotz.eu.org',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com'
}
global.APIKeys = {
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.betabotz.eu.org': 'YOURAPIKEY',
  'https://api.zeks.xyz': 'apivinz',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

global.namaowner = 'Jarsépay'
global.nomorowner = '6282148864989'
global.namabot = 'Jarspy'
global.nomorbot = '6285651003095'

global.wmtitle = 'Jarspy Bot'
global.wmbody = 'B y  J a r s é p a y'
global.thumbs = 'https://telegra.ph/file/476dabd35c800091e0357.jpg'

global.sig = 'https://instagram.com/jarsepay'
global.sgh = 'https://github.com/jarsepay'
global.sgc = 'https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE'
global.sdc = 'https://s.id/aeonnixity'
global.sid = 'https://s.id/jarspy'

global.packname = 'Contact Support: +62 821-4886-4989'
global.author = 'By Jarsépay'

global.fsizedoc = '99999999999999'
global.fpagedoc = '999'

global.multiplier = 10000

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      nama: '✍🏻 ',
      umur: '⏳ ',
      gender: '🚻 ',
      crush: '❤️ ',
      partner: '💐 ',
      level: '🧬 ',
      role: '👤 ',
      limit: '🌌 ',
      health: '❤️ ',
      death: '💀 ',
      exp: '✉️ ',
      money: '💵 ',
      potion: '🥤 ',
      medkit: '💉 ',
      followers: '👥 ',
      waifu: '💃🏻 ',
      husbu: '🕺🏻 ',
      kepercayaanwaifu: '💘 ',
      kepercayaanhusbu: '💘 ',
      
      // Survival
      car: '🚙 ',
      fuel: '⛽ ',
      
      tombak: '🦯 ',
      busur: '🏹 ',
      anakpanah: '🎯 ',
      glock: '🔫 ',
      ammo: '➖ ',
      ak47: '🔫 ',
      m4: '🔫 ',
      m16: '🔫 ',
      ar15: '🔫 ',
      scar: '🔫 ',
      famas: '🔫 ',
      aug: '🔫 ',
      uzi: '🔫 ',
      mp5: '🔫 ',
      p90: '🔫 ',
      mac10: '🔫 ',
      vector: '🔫 ',
      barrettm82: '🔫 ',
      remington700: '🔫 ',
      dragunovsvd: '🔫 ', 
      m40: '🔫 ', 
      m24: '🔫 ',
      
      elang: '🦅 ',
      beruang: '🐻 ',
      harimau: '🐅 ',
      buaya: '🐊 ',
      bebek: '🦆 ',
      ayam: '🐓 ',
      koala: '🐨 ',
      zebra: '🦓 ',
      sapi: '🐄 ',
      babi: '🐷 ',
      banteng: '🐃 ',
      kerbau: '🦬 ',
      kelinci: '🐇 ',
      tupai: '🐿️ ',
      serigala: '🐺 ',
      domba: '🐑 ',
      kelelawar: '🦇 ',
      landak: '🦔 ',
      kangguru: '🦘 ',
      trenggiling: '🦡 ',
      badak: '🦏 ',
      gajah: '🐘 ',
      
      // Makanan
      burger: '🍔 ',
      pizza: '🍕 ',
      kentang: '🍟 ',
      
      // Crate
      uncommon: '📦 ',
      common: '📦 ',
      rare: '📦 ',
      mythical: '📦 ',
      legendary: '📦 ',
      ancient: '📦 ',
    }
    let results = Object.keys(emot).filter(v => v == string)
    if (!results.length) return ''
    else return emot[results[0]]
  },
  
  role(level) {
    level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }
    const role = [
      { name: 'Warrior V', level: 0 }, { name: 'Warrior IV', level: 4 }, { name: 'Warrior III', level: 8 }, { name: 'Warrior II', level: 12 }, { name: 'Warrior I', level: 16 },
      { name: 'Elite V', level: 20 }, { name: 'Elite IV', level: 24 }, { name: 'Elite III', level: 28 }, { name: 'Elite II', level: 32 }, { name: 'Elite I', level: 36 },
      { name: 'Gold V', level: 40 }, { name: 'Gold IV', level: 44 }, { name: 'Gold III', level: 48 }, { name: 'Gold II', level: 52 }, { name: 'Gold I', level: 56 },
      { name: 'Platinum V', level: 60 }, { name: 'Platinum IV', level: 64 }, { name: 'Platinum III', level: 68 }, { name: 'Platinum II', level: 72 }, { name: 'Platinum I', level: 76 },
      { name: 'Diamond V', level: 80 }, { name: 'Diamond IV', level: 84 }, { name: 'Diamond III', level: 88 }, { name: 'Diamond II', level: 92 }, { name: 'Diamond I', level: 96 },
      { name: 'Expert', level: 100 },
    ]

    return role.reverse().find(role => level >= role.level)
  }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})