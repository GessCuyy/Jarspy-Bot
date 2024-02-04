/*
  • Simple Cheat Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const items = {
    gm: {
        level: {
            exp: 0
        },
        exp: {
            exp: 0
        },
        money: {
            exp: 0
        },
        potion: {
            exp: 0
        },
        burger: {
            exp: 0
        },
        pizza: {
            exp: 0
        },
        kentang: {
            exp: 0
        },
        uncommon: {
            exp: 0
        },
        common: {
            exp: 0
        },
        rare: {
            exp: 0
        },
        mythical: {
            exp: 0
        },
        legendary: {
            exp: 0
        },
        ancient: {
            exp: 0
        },
        kepercayaanwaifu: {
            exp: 0
        },
        kepercayaanhusbu: {
            exp: 0
        },
    },
    delgm: {
        level: {
            exp: 0
        },
        exp: {
            exp: 0
        },
        money: {
            exp: 0
        },
        potion: {
            exp: 0
        },
        burger: {
            exp: 0
        },
        pizza: {
            exp: 0
        },
        kentang: {
            exp: 0
        },
        uncommon: {
            exp: 0
        },
        common: {
            exp: 0
        },
        rare: {
            exp: 0
        },
        mythical: {
            exp: 0
        },
        legendary: {
            exp: 0
        },
        ancient: {
            exp: 0
        },
        kepercayaanwaifu: {
            exp: 0
        },
        kepercayaanhusbu: {
            exp: 0
        },
    }
}

let jarspy = async (m, { conn, command, usedPrefix, args }) => {
    let user = await db.users.get(m.sender)
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
Contoh pemakaian: *${usedPrefix}${command} money 10*

▢ Daftar item: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${rpg.emoticon(v)}${v}`.trim()
    }).join('\n')}
`.trim()
    const item = (args[0] || '').toLowerCase()
    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!listItems[item]) return m.reply(info)
    if (command.toLowerCase() == 'gm') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${paymentMethod} untuk menambahkan *${total}* ${item}. Kamu membutuhkan *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* ${paymentMethod} lagi untuk bisa menambahkan`)
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
        })
        return m.reply(`Spawn *${total}* ${item}`)
    } else {
        if (user[item] < total) return m.reply(`Kamu tidak memiliki cukup *${item}* untuk dihapus, kamu hanya memiliki ${user[item]} item`)
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) throw new Error('Banyak hadiah belum didukung')
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi hadiah memberikannya`)
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
        })
        return m.reply(`*-${total}* ${item}`)
    }
}

jarspy.help = ['gm', 'delgm']
jarspy.tags = ['owner']
jarspy.command = /^(gm|delgm)$/i
jarspy.owner = true

jarspy.disabled = false

export default jarspy

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
    number = parseInt(number * 1)
    if (!isNumber(number)) return number
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })
    return formatter.format(number)
}