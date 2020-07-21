const megadb = require('megadb')
const db = new megadb.crearDB('marrys')
module.exports = async (client, message, args, ops) => {
  if(!db.has(`${message.author.id}.id`)) 
    return message.channel.send(ops.lang.commands.divorce.nothing)
  let esposaTag = await db.get(`${message.author.id}.tag`)
  let esposaId = await db.get(`${message.author.id}.id`)
  
  message.channel.send(`${ops.lang.commands.divorce.sucess} ${esposaTag}`)
  await db.delete(`${esposaId}.id`)
  await db.delete(`${message.author.id}.id`)
  await db.delete(`${esposaId}.tag`)
  await db.delete(`${message.author.id}.tag`)

}