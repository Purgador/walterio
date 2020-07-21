const {crearDB} = require("megadb"),
dinero = new crearDB("economia"),
cooldown = new crearDB("cooldown"),
moment = require("moment");
require('moment-duration-format');

module.exports = async (client, message, args, ops) => {
  const lang = ops.lang.commands.weekly
if(cooldown.has(`${message.author.id}.weekly`)){
  let tiempo = await cooldown.get(`${message.author.id}.weekly`);
    if (Date.now() < tiempo) {
      const duracion = moment.duration(tiempo - Date.now()).format(" D [d], H [hrs], m [m], s [s]");
          return message.channel.send(`${ops.lang.wait} **${duracion}** ${ops.lang.wait2}`);
    }
  }
  await cooldown.set(`${message.author.id}.weekly`, Date.now() + 86400000)
  if(!dinero.has(`${message.author.id}.dinero`)) dinero.set(`${message.author.id}.dinero`,200)
  if(!dinero.has("394535021941358594.dinero")) dinero.set(`${message.author.id}.dinero`,200)
  let iva = 2100 / 100 * 6 
  let total = 2100 - iva
  dinero.add(`${message.author.id}.dinero`, total)
  dinero.add("394535021941358594.dinero", iva)
  message.channel.send(`${lang.message} (**${total.toLocaleString()}** ${lang.message2}`)}