module.exports = (client, message, args, ops) => {
let lang = ops.lang.commands.eightBall,
 ball = lang.ball,
 pregunta = args.join(" ") ,
 result = Math.floor((Math.random() * ball.length));
if (!pregunta[0])
return message.channel.send(lang.no_args); 
const embed = new ops.Discord.MessageEmbed() 
.setTitle(lang.title)
.addField(lang.field1,`${pregunta}`)
.addField(lang.field2, ball[result])
.setColor(0x00ffff)
message.channel.send(embed)
}