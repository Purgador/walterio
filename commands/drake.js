//Require Packages
const Weez = require("weez");
const weez = new Weez.WeezAPI("WOgAQvRZ8sjvVWqbR0D7bclQJ9RslvM95nVj");

module.exports = async (client, message, args, ops) => {
let member = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)

 if (!member) return message.channel.send(ops.lang.no_user)
 
 let img = await weez.drake(message.author.displayAvatarURL({format: "jpg"}), member.displayAvatarURL({format:"jpg"}))

 message.channel.send({files: [img]});
 }