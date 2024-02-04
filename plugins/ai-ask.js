import fetch from "node-fetch"
import crypto from "crypto"
const userId = crypto.randomUUID()
let jarspy = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `Contoh pemakaian: ${usedPrefix}${command} python example code`
    await m.react('🕑')

    try {
        let data = await generateText(text)
        if (data) {
            await m.reply(data)
        }
    } catch (e) {
        await m.reply(`Error: ${eror}`)
    }
}
jarspy.help = ["ask"]
jarspy.tags = ["ai"];
jarspy.command = /^(ask)$/i

export default jarspy

/* New Line */
async function generateText(content) {
    try {
        const messages = [{
            role: "user",
            content: content
        }, {
            role: "assistant",
            content: "Hello!"
        }];
        const response = await fetch("https://www.blackbox.ai/api/chat", {
            method: "POST",
            body: JSON.stringify({
                messages,
                id: userId,
                mode: "continue",
                userId: userId
            }),
        });
        return await response.text();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}