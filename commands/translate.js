module.exports = (client, message, args, ops) => {

const translate = require("@vitalets/google-translate-api")

let lang = args[0];
let msg = args.slice(1).join(' ');

if (!lang) return message.channel.send(`Necesitas colocar a que idioma vas a traducir el texto`);
if (!msg) return message.channel.send(`Necesitas colocar el mensaje a traducir`);

translate(msg, {to: lang}).then(res => {
      message.channel.send(res.text);
    }).catch(err => {
    switch(err.message){
     case(`The language '${lang}' is not supported`):{
       message.channel.send(`**:exclamation: |** El lenguaje '${lang}' no esta soportado`).then(m => {
         if(m.deletable) m.delete({ timeout: 5000})
         if(message.deletable) message.delete({ timeout: 5000})
       })
     }
 }
});

}