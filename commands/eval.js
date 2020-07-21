// Require Packages
const Discord = require("discord.js"),
  {crearDB} = require("megadb"),
  ownerID = process.env.ownerID,
  opciones = new crearDB("opciones"),
  economia = new crearDB("economia"),
  cooldown = new crearDB("cooldown"),
  niveles = new crearDB("niveles"),
  marrys = new crearDB("marrys"),
  warns = new crearDB('warns'),
  personaltext = new crearDB('personaltext');
module.exports = async (client, message, args, ops) => {
if(!([ops.ownerID].includes(message.author.id) || [ops.idWitherBlood].includes(message.author.id))) 
  return message.channel.send(ops.lang.commands.eval.error);
let limit = 1950;
    try {
      let code = args.join(' ');
      let evalued = eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        message.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
      } else
        message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
}