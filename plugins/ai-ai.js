/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from "node-fetch";

const jarspy = async (m, { conn, text }) => {
	if (!text) return conn.reply(m.chat, `Mau nanya apa?`, m)
	try {
		const web = await fetch(`https://aemt.me/gpt4?text=${encodeURIComponent(text)}`)
		const result = await web.json()
		conn.reply(m.chat, result.result, m)
	} catch (e) {
		conn.reply(m.chat, e.message, m)
	}
}

jarspy.help = ['ai']
jarspy.tags = ['openai']
jarspy.command = /^(ai|openai|chatgpt|gpt)$/i
jarspy.limit = true

export default jarspy