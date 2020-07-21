const {crearDB} = require('megadb'),
economia = new crearDB('economia'),
cooldown = new crearDB('cooldown'),
moment = require("moment");
require('moment-duration-format');
module.exports = async (client, message, args, ops) => {
if(cooldown.has(`${message.author.id}.rep`)){
    let tiempo = await cooldown.get(`${message.author.id}.rep`);
    if (Date.now() < tiempo) {
        const duracion = moment.duration(tiempo - Date.now()).format(" D [d], H [hrs], m [m], s [s]");
        return message.channel.send(`${ops.lang.wait} **${duracion}** ${ops.lang.wait2}`);
    }
}       
let user = message.mentions.users.first() 
    || client.users.cache.get(args[0])
    || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
    if(!user) return message.channel.send(ops.lang.no_user)
if(user.id === message.author.id) return message.channel.send("No puedes darte reputacion ati mismo")
    economia.add(`${user.id}.rep`, 1)
    message.channel.send(`<:rep:690293953949597747>Punto de reputacion agregado a: **${user.username}**`)
    await cooldown.set(`${message.author.id}.rep`, Date.now() + 86400000)
}