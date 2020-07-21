const Weez = require("weez"),
 weez = new Weez.WeezAPI("WOgAQvRZ8sjvVWqbR0D7bclQJ9RslvM95nVj");

module.exports = async (client, message, args, ops) => {
let master = args.join(" ")
 if (!master) return message.channel.send(':grey_exclamation: | **Debe escribir un contenido para hacerse visible.**');
 let img = await weez.trump(master)
   
  message.channel.send({files: [img]});
}