const { crearDB } = require("megadb"),
dinero = new crearDB("economia")
module.exports = async (client, message, args, ops) => {
  let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)

if (!user) return message.channel.send('Debe mencionar a un usuario.')
  
	let cantidad = parseInt(args.slice(1).join(' '));
	
  if (!cantidad) return message.channel.send('Debe ingresar una cantidad.')
  
  if(isNaN(cantidad)) return message.channel.send('Debe ingresar un número')
  
  let iva = cantidad / 100 * 6, 
      total = cantidad - iva,
      all = await dinero.get(`${message.author.id}.dinero`)
		if(cantidad >= 100){ 
if(all < cantidad) return message.channel.send("No tienes dinero suficiente ocupas: $**100**")
  if(!dinero.has(`${user.id}.dinero`)) dinero.set(`${user.id}.dinero`,200)
      
      await dinero.add(`${user.id}.dinero`, total)
      await dinero.subtract(`${message.author.id}.dinero`, cantidad)
      
			message.channel.send(`Has transferido $${cantidad.toLocaleString()} *(${total.toLocaleString()} despues de 6% de impuestos)* a **${user.username}** correctamente.`)

		} else { 
			message.channel.send('lo minimo para poder transferir es $**100**')

		}
}