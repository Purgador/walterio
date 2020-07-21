const megadb = require("megadb"),
   economia = new megadb.crearDB("economia")

module.exports = async (client, message, args, ops) => {
  
let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  || message.author
  if(!economia.has(`${user.id}.dinero`)) economia.set(`${user.id}.dinero`,200)
  let dinero = await economia.get(`${user.id}.dinero`),
      lang = ops.lang.commands.balance;
    message.channel.send(user === message.author ? lang.no_user + ` **$${dinero.toLocaleString()}**` : `:moneybag:${user.username} ${lang.user} **$${dinero.toLocaleString()}**`)
}