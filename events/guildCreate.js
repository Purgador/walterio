const { crearDB } = require('megadb'),
      opciones = new crearDB("opciones");
module.exports = (client, guild ) => {
  if(opciones.has(`${guild.id}.channels.logs`)) return opciones.delete(`${guild.id}.channels.logs`)
  
}