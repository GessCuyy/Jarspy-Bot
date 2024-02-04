/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

export async function all(m) {
    let user = await db.users.get(m.sender)

    if (user) {
    let followers = Object.entries(await db.users.get()).filter(([key, data]) => (data.following || []).includes(m.sender)).map(([key, data]) => key)
        await db.users.update(m.sender, (user) => {
            user.followers = followers.length
        });
        
        if (!m.message)
            return
              
        if (user.health > 200) {
            await db.users.update(m.sender, (user) => {
                user.health = 200
            });
        }

        if (user.kepercayaanwaifu > 500) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanwaifu = 500
            });
        }
        
        if (user.kepercayaanhusbu > 500) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanhusbu = 500
            });
        }
        
        if (user.kepercayaanwaifu <= 0) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanwaifu = 0
            });
        }
        
        if (user.kepercayaanhusbu <= 0) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanhusbu = 0
            });
        }
        
        if (user.jobexp > 50000) {
            await db.users.update(m.sender, (user) => {
                user.jobexp = 50000
            });
        }
        
        const items = [
            'money',
            'kentang', 'burger', 'pizza',
        ]

        if (user.health <= 0) {
            for (let i = 0; i < items.length; i++) {
                await db.users.update(m.sender, (user) => {
                    user[items[i]] = Math.floor(user[items[i]] * 8 / 10)
                });
            }
            await db.users.update(m.sender, (user) => {
                user.health = 10
                user.death += 1
            });
            m.reply('Kamu kehabisan darah dan mati\nMeregenerasi health kembali...')
        }

        if ((+new Date() + 21 * 24 * 60 * 60 * 1000) < user.lasteat) {
            await db.users.update(m.sender, (user) => {
                user.lasteat = +new Date() + 21 * 24 * 60 * 60 * 1000
            });
        }

        if ((+new Date() >= user.lasteat) && (user.level > 10)) {
            for (let i = 0; i < items.length; i++) {
                await db.users.update(m.sender, (user) => {
                    user[items[i]] = Math.floor(user[items[i]] * 1 / 10)
                });
            }
            await db.users.update(m.sender, (user) => {
                user.health = 10
                user.death += 1
                user.lasteat = +new Date() + 7 * 24 * 60 * 60 * 1000
            });
            m.reply('Kamu kelaparan dan mati')
        }
    }
}