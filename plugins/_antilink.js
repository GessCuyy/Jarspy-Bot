import db from '../lib/database/index.js'

const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    const [chat, bot] = await Promise.all([
        db.chats.get(m.chat),
        db.settings.get(this.user.jid)
    ])
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        // await conn.reply(m.chat, `*Link grup terdeteksi!*${isBotAdmin ? '' : '\n\n_Bot bukan admin'}`, m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove') //untuk kick orang yang kirim link
            await m.delete() // Menghapus pesan yang mengandung tautan grup
        } else if (!bot.restrict) return m.reply('*Owner mematikan auto kick!*')
    }
    return !0
}
