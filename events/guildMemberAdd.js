const {crearDB} = require("megadb"),
 Discord = require("discord.js"),
 opciones = new crearDB("opciones"),
 Weez = require("weez"),
 weez = new Weez.WeezAPI("dj2yme1qGIh9AMBpB6g46R3qqDYk3x7ZxHwh");

module.exports = async (client, member) => {
  if(opciones.has(`${member.guild.id}.channels.logs`)) {
  const logchannel = await opciones.get(`${member.guild.id}.channels.logs`),
        robot = { true: "Si", false: "No"},
        embed = new Discord.MessageEmbed()
    .setTitle("**「:white_check_mark:」 • Miembro Unido**")
    .setColor("BLUE").setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    .addField("**「:boy: 」• Nombre**", member.user.username, true)
    .addField("**「:family_wwg:」• Total de miembros**",member.guild.members.cache.filter(member => !member.user.bot).size, true)
    .addField("**「:calendar:」• Creado el**",member.user.createdAt.toDateString(), true)
    .addField("**「:robot:」• Bot?**", robot[member.user.bot], true)
  let logginChannel = client.channels.cache.get(logchannel); 
  logginChannel.send(embed);
}
if(opciones.has(`${member.guild.id}.role`)) {
 const role = await opciones.get(`${member.guild.id}.role`)
  try { member.roles.add(role) } catch (e) { console.log(e.message); }
}
let fondo = opciones.has(`${member.guild.id}.fondo.welcome`) ? await opciones.get(`${member.guild.id}.fondo.welcome`) : "http://i.imgur.com/0YrfJgx.jpg";
if(opciones.has(`${member.guild.id}.channel.welcome`)) {
  const bienvenida = new Weez.Bienvenida()
   .avatar(member.user.displayAvatarURL({format: "jpg"})).fondo(fondo).textoTitulo(`${member.user.username}`)
   .textoDesc("Bienvenid@ Disfruta de tu tiempo aqui!").textoColor("27FF00").acceso(weez);
   const img = await Weez.bienvenidaRender(bienvenida),
      welcomeChannel = await opciones.get(`${member.guild.id}.channel.welcome`)
if(!welcomeChannel) return;
client.channels.cache.get(welcomeChannel).send({files: [img]}); 
}
}
