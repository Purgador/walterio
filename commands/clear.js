module.exports = (client, message, args, ops) => {
  if(message.deletable) message.delete()
  if(!message.member.hasPermission('MANAGE_MESSAGES')) {
    return message.channel.send(ops.lang.permissions.member.MANAGE_MESSAGES).then(m => {
        if(m.deletable) m.delete({ timeout: 5000})
})
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(ops.lang.permissions.me.MANAGE_MESSAGES).then(m => {
        if(m.deletable) m.delete({ timeout: 5000})
})
}
}
if(isNaN(args[0]) || parseInt(args[0]) <= 0) 
  return message.channel.send(ops.lang.commands.clear.no_args).then(m => {
        if(m.deletable) m.delete({ timeout: 5000})
})
let deleteAmount;

if(parseInt(args[0]) > 99) {
  deleteAmount = 99;
} else {
  deleteAmount = parseInt(args[0]);
}
  message.channel.bulkDelete(deleteAmount + 1, true).then((deleted) => {
    message.channel.send(`he borrado ${deleted.size} mensaje(s)`).then(m => {
      if(m.deletable) m.delete({ timeout: 1500}).catch(e => console.log(e.message))
})
  }).catch(e => {
    switch(e.message){
      case("You can only bulk delete messages that are under 14 days old."):{
        message.channel.send(ops.lang.commands.clear.messages.max).then(m => {
          if(m.deletable) m.delete({ timeout: 5000}).catch(e => console.log(e.message))
})
      }
      case("Unknown Message"):{
        message.channel.send(ops.lang.commands.clear.messages.unknown).then(m => {
          if(m.deletable) m.delete({ timeout: 5000}).catch(e => console.log(e.message))
      })
    }
  }
})
}