const megadb = require("megadb");
const level_db = new megadb.crearDB('niveles')
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');
module.exports = async (client, message, args, ops) => {
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
  let fontSize = 40;
  do {
		ctx.font = `${fontSize -= 10}px Arial`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};
  if(!level_db.has(message.guild.id)) level_db.establecer(message.guild.id, {})
  let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  || message.author
  if(!level_db.has(`${message.guild.id}.${message.author.id}`)) level_db.set(`${message.guild.id}.${message.author.id}`, {xp: 0, lvl: 1})
  let {xp, lvl} = await level_db.get(`${message.guild.id}.${user.id}`)
const canvas = Canvas.createCanvas(934, 282);
const ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, 934, 282);
const { body: b } = await snekfetch.get("https://cdn.discordapp.com/attachments/702485608651817110/703392554208591922/oie_v5NXnsq5vWQD.png");
const fondo = await Canvas.loadImage(b);
ctx.drawImage(fondo, 10, 10, 914, 262);
ctx.font = "50px Arial";
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillText(lvl, 819, 120)
ctx.font = "13px Texta";
ctx.fillStyle = "#606060";
ctx.textAlign='right';
ctx.fillText("# 1", 354, 69)//nice
ctx.font = "50px Oxanium";
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillText(xp, 788, 251)
//`${xp}/${5 * (lvl ** 2) + 20 * lvl + 30}`
ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.font = applyText(canvas, user.username);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${user.username}#${user.discriminator}`, 850 / 3.5, 450 / 1.8);
  ctx.beginPath();
	ctx.arc(125, 125, 85, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
const { body: a } = await snekfetch.get(user.displayAvatarURL({ format: 'jpg' }))
const avatar = await Canvas.loadImage(a);
ctx.drawImage(avatar, 25, 25, 200, 200);
const attachment = new ops.Discord.MessageAttachment(canvas.toBuffer(), 'rankcard.png');

message.channel.send(attachment);
}