const {crearDB} = require('megadb'),
      economia = new crearDB('economia');
module.exports = async (client, message, args, ops) => {
  let cantidad = args.slice(0).join(' ');
  
  if(!cantidad) return message.channel.send("Por favor especifica un número mayor o igual al de los créditos que posees o `all` para apostar todos tus créditos.")
	let random = Math.floor(Math.random() * 7) + 1;
  let all = await economia.get(`${message.author.id}.dinero`)
if (cantidad.toLowerCase() === "all"){
  if(all < 50) return message.channel.send("No tienes dinero suficiente ocupas: $**50**")
  if (random === 1 || random === 2) {
  let total = parseInt(all * 1.2)
  await economia.add(`${message.author.id}.dinero`, total);
  return message.channel.send("Felicidades, Conservaste tus creditos y ganaste: " + total.toLocaleString() + "!")
  }else {
  await economia.subtract(`${message.author.id}.dinero`, all)
  return message.channel.send("Perdiste " + all.toLocaleString() + " :(")
}
} else if(isNaN(cantidad)) {
  return message.channel.send('Debe ingresar un número')
} else if(cantidad < 50) {
  return message.channel.send('lo minimo para poder apostar es $**50**')
}else{
  if(all < cantidad) return message.channel.send("No tienes dinero suficiente ocupas: $**50**")
  if (random === 1 || random === 2) {
  let total = cantidad  * 1.1
  await economia.add(`${message.author.id}.dinero`, total);
  return message.channel.send("Felicidades, Conservaste tus creditos y ganaste: " + total.toLocaleString() + "!")
  }else {
  await economia.subtract(`${message.author.id}.dinero`, cantidad)
  return message.channel.send("Perdiste " + cantidad.toLocaleString() + " :(")
  }
}
}