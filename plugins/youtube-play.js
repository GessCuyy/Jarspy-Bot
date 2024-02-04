/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import youtube from "yt-search";

const jarspy = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} rewrite the star`;
  await m.react('🕑');
  try {
    const search = await youtube(text);
    const convert = search.videos[0];
    if (!convert) throw 'Video/Audio Tidak Ditemukan';
    if (convert.seconds >= 3600) {
      return conn.reply(m.chat, 'Video/Audio ini berdurasi lebih dari 1 jam!', m);
    } else {
      let audioUrl;
      try {
        audioUrl = `https://aemt.me/downloadAudio?URL=${convert.url}&videoName=ytdl`;
      } catch (e) {
        conn.reply(m.chat, wait, m);
        audioUrl = `https://aemt.me/youtube?url=${convert.url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`;
      }
      const caption = `∘ Judul : ${convert.title}\n∘ Ext : Search\n∘ ID : ${convert.videoId}\n∘ Durasi : ${convert.timestamp}\n∘ Ditonton : ${convert.views} Viewer\n∘ Diupload pada : ${convert.ago}\n∘ Author : ${convert.author.name}\n∘ Channel : ${convert.author.url}\n∘ Url : ${convert.url}\n∘ Deskripsi : ${convert.description}\n∘ Thumbnail : ${convert.image}`;
      const pesan = conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: caption,
          contextInfo: {
            externalAdReply: {
              title: "Y O U T U B E - P L A Y",
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: convert.image,
              sourceUrl: audioUrl,
            },
          },
          mentions: [m.sender],
        },
      }, {});
      await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    }
  } catch (e) {
    conn.reply(m.chat, `*Error:* ` + e, m);
  }
};

jarspy.command = jarspy.help = ['play'];
jarspy.tags = ['youtube'];
jarspy.limit = 8;
jarspy.premium = false;
export default jarspy;