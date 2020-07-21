// Require Packages
const Discord = require("discord.js"),
  client = new Discord.Client({disableEveryone: false, fetchAllMembers: true}),
  {crearDB} = require("megadb"),
  queue = new Map(),
  commandcooldown = new Map(),
  ownerID = process.env.ownerID,
  opciones = new crearDB("opciones"),
  warns = new crearDB('warns'),
  { nivelesFunc } = require("../functions/niveles.js"),
  { ant } = require('../functions/anti-invite.js');

module.exports = async (client, message) => {
    //Return Statsments
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  //Prefix
  let prefix = opciones.has(`${message.guild.id}.prefix`) ? await opciones.get(`${message.guild.id}.prefix`) : process.env.prefix;
  //Language
  let langcode = opciones.has(`${message.guild.id}.lenguage`) ? await opciones.get(`${message.guild.id}.lenguage`) : "en";
  let lang = require(`../langs/${langcode}.js`);
  //MentionedAction
  const invite = await client.generateInvite(["ADMINISTRATOR"]);
  if (message.mentions.members.has(client.user.id)) {
    const embed = new Discord.MessageEmbed()
      .addField(":gear: | Prefix", "> `" + prefix + "`")
      .addField(":satellite: | `" + prefix + "`Help", lang.events.message.isMentioned.field1)
      .addField("<a:tickgreen:705988016778379315> | " + lang.events.message.isMentioned.field2, `>>> [${lang.events.message.isMentioned.invite}](${invite})\n[Discord](https://invite.gg/mercenary)`)
      .setFooter(lang.events.message.isMentioned.footer + require("../package.json").version, client.user.displayAvatarURL({dynamic:true}))
      .setTimestamp()
      .setColor(0x00ffff);
    message.channel.send(embed);
  }
if(ant(message.content) === true){
  if(message.member.hasPermission("ADMINISTRATOR")) return;
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag} ${lang.events.message.ant.warned}`,message.author.displayAvatarURL({dynamic:true}))
  .setDescription(`**${lang.events.message.ant.reason}**: ${lang.events.message.ant.warn}`);
  if(message.deletable) await message.delete({timeout: 100})
  await message.channel.send(embed);
if(!warns.has(`${message.guild.id}.${message.author.id}.warns`)) {
 await warns.set(`${message.guild.id}.${message.author.id}.warns`, 0);
}
await warns.add(`${message.guild.id}.${message.author.id}.warns`, 1);
if(!warns.has(`${message.guild.id}.${message.author.id}.reason`)) {
await warns.set(`${message.guild.id}.${message.author.id}.reason`, [lang.events.message.ant.warn]);
}else{
await warns.push(`${message.guild.id}.${message.author.id}.reason`, [lang.events.message.ant.warn]);
}
  let count = await warns.get(`${message.guild.id}.${message.author.id}.warns`);
  if(opciones.has(`${message.guild.id}.channels.logs`)) {
  let channelLog = await opciones.get(`${message.guild.id}.channels.logs`);
    const embed2 = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("**Warn**")
    .addField("「:boy:」" + lang.events.message.ant.author, message.author.tag)
    .addField("「:speech_balloon:」" + lang.events.message.ant.reason, lang.events.message.ant.warn)
    .addField("「:closed_book:」" + lang.events.message.ant.warns, count)
    .addField("「:fleur_de_lis:️」" + lang.events.message.ant.moderator, "Bot");
  let canal = client.channels.cache.get(channelLog);
      await canal.send(embed2);
    }   
}
/*
  let cantidad = 0;
  let f = message.content.split(' ').length - 1
 if(f >= 14){
   const embed1 = new Discord.MessageEmbed()
   .setAuthor(message.author.tag + " Ha sido advertido",message.author.displayAvatarURL({dynamic:true}))
   .setDescription("**Reason**: Letras mayúsculas");
   message.channel.send(embed1);
if(!warns.has(`${message.guild.id}.${message.author.id}.warns`)) {
  await warns.set(`${message.guild.id}.${message.author.id}.warns`, 0);
}
  await warns.add(`${message.guild.id}.${message.author.id}.warns`, 1);
if(!warns.has(`${message.guild.id}.${message.author.id}.reason`)) {
  await warns.set(`${message.guild.id}.${message.author.id}.reason`,["Letras mayúsculas"]);
}else{
  await warns.push(`${message.guild.id}.${message.author.id}.reason`, ["Letras mayúsculas"]);
}
   let count = await warns.get(`${message.guild.id}.${message.author.id}.warns`);
   if(message.deletable) await message.delete()
if(opciones.has(`${message.guild.id}.channels.logs`)) {
  let channelLog = await opciones.get(`${message.guild.id}.channels.logs`);
  const logEmbed = new Discord.MessageEmbed()
  .setColor("RED")
  .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
  .setDescription("**Warn**")
  .addField("「:boy:」Usuario", message.author.tag)
  .addField("「:speech_balloon:」Razón", "Capital Letters")
  .addField("「:closed_book:」Cantidad de advertencias", count)
  .addField("「:fleur_de_lis:️」 Moderador responsable", "Bot");
  let canal = client.channels.cache.get(channelLog);
  canal.send(logEmbed);
  }
}
*/
  nivelesFunc(message);
  //Return Prefix
  if (!message.content.startsWith(prefix)) return;
  
  //Variables
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  //Command Handler
  let ops = {
    ownerID: ownerID,
    queue: queue,
    prefix: prefix,
    Discord: Discord,
    lang: lang,
    serverQueue: queue.get(message.guild.id)
  };
  let cmd = client.comandos.get(command);
  if (!cmd) return;
  if (commandcooldown.has(message.guild.id + message.author.id)) {
    let cooldown = commandcooldown.get(message.guild.id + message.author.id);
    if (Date.now() < cooldown) {
      return message.channel.send(lang.events.message.cooldown);
    }
  }
  commandcooldown.set(message.guild.id + message.author.id, Date.now() + 2000);
  cmd(client, message, args, ops);
}