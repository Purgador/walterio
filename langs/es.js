module.exports = {
  no_user: '**:grey_exclamation:** | Menciona a alguien',
  wait: "**:grey_exclamation: |** Tienes que esperar",
  wait2: "para poder volver a usar este comando",
commands: {
  eightBall: {
    ball: ["Sí","No","Tal vez","No sé","¡Claro!","Por supuesto","Por supuesto que no","Claro que no","Definitivamente","Tu que crees?","Hmmmm","Preguntaselo a tu mama"],
    title: "🎱Pregunta 8Ball",
    field1: "Pregunta",
    field2: "Respuesta",
    no_args: "**:grey_exclamation: |** Debes escribir una pregunta."
  },
  angry: {
    no_user: "Está Enojado 😡",
    user: "Está Enojado con"
  },
  avatar: {
    no_user: "Tu Avatar",
    user: "Avatar de"
  },
  balance: {
    no_user: ":moneybag:Tienes:",
    user: "Tiene:"
  },
  ban: {
    no_args: "**:grey_exclamation:** | Proporcione una persona para banear.",
    no_user: "**:grey_exclamation:** | No se pudo encontrar ese miembro, intente nuevamente.",
    no_reason: "Romper las reglas",
    yourself: "**:grey_exclamation:** | No puedes banearte a ti mismo ..",
    bannable: "**:grey_exclamation:** | No puedo banear al usuario mencionado.",
    sucess: "fue baneado del servidor, razón:" 
  },
  botinfo: {
    statistics: "Estadísticas",
    owner: "Dueño",
    guilds: "Servidores",
    users: "Usuarios",
    channels: "Canales",
    commands: "Comandos",
    events: "Eventos",
    uptime: "Actividad",
    connections: "Conexiones a voz",
    version: "Versión",
    usage: "Uso de memoria"
  },
  clear: {
    no_args: '**:grey_exclamation: |** Ingrese el número de mensajes para eliminar',
    messages: {
      max: "**:exclamation: |** Solo puedo borrar mensajes con menos de 2 semanas de antigüedad",
      unknown: "**:exclamation: |** No hay mensajes para borrar"
    }
  },
  cry: {
    no_user: "Esta triste 😢",
    user: "Esta triste con"
  },
  daily: {
    message: "Recompensa diaria reclamada **$2,100**",
    message2: "Despues de 6% de impuestos)\nMultiplicador: **x7**"
  },
  divorce: {
    nothing: "**:grey_exclamation: |** No estás casado con nadie :(",
    sucess: "Te has divorciado de"
  },
  dm: {
    description: `**Descripcion**: Comando: escribirle un mensaje privado a un usuario\n[] Requerido`,
    field: {
      title: "**Uso**",
      description: "dm [@usuario] [texto]"
    },
    field2: {
      title: "**Ejemplo**",
      description: "dm <@614957978675838976> Hola:grinning:"
    },
    field3: {
    title: "Contenido",
    footer: "Enviado Por:"
  }, 
    sucess: "**MD enviado correctamente**"
  },
  eval: {
    error: "**:grey_exclamation: |** Sólo los desarolladores pueden usar esto :("
  },
  help: {
    title: "Lista de Comandos",
    field: "**Diversión**",
    field2: "**Moderación**",
    field3: "**Música**",
    field4: "**Útil**",
    field5: "**Información**",
    sucess: "Revisa tus mensajes privados"
  },
  hug: {
    himself: "se abrazó a sí mismo",
    another_person: "Abrazó a"
  },
  kick: {
    no_args: "**:grey_exclamation: |** Proporcione una persona para expulsar.",
    no_user: "**:grey_exclamation: |** No se pudo encontrar ese miembro, intente nuevamente.",
    reason: "Romper las reglas",
    yourself: "**:grey_exclamation: |** No puedes expulsarte ..",
    kickable: "**:grey_exclamation: |** No puedo expulsar al usuario mencionado.",
    sucess: "**:grey_exclamation: |** Fue expulsado del servidor.",
    reason: "razón"
  },
  kill: {
    himself: "Se mató a sí mismo",
    another_person: "Mató a"
  },
  love: {
    bot: "Un bot no tiene sentimientos.",
    relations: "RELACIONES"
  },
  marry: {
    married: "Ya estas casado con",
    bot: "No puedes casarte con un bot ..",
    yourself: "No puedes casarte contigo mismo ..",
    another_married: "Ese usuario ya está casado/a.",
    request: "escribe `yes` o `no` para responder a la proposición de matrimonio de",
    expire: "Esto expira en 2 minutos.",
    cooldown: "Debes esperar",
    cooldown2: "Para poder volver a pedir matromonio",
    sucess: "Felicidades!",
    sucess2: "se caso con",
    unsucess: "te rechazo cruel mente",
    expired: "no respondio, la espera termino"
  },
  move: {
    disconnected: '**:grey_exclamation: |** No estoy dentro de un canal de voz',
    need_join: "**:grey_exclamation: |** Necesitas unirte a un canal de voz primero",
    no_queue: '**:grey_exclamation: |** No hay ninguna cancion en la cola',
    already_connected: '**:grey_exclamation: |** Ya estoy conectado a este canal de voz',
    sucess: "**:grey_exclamation: |** Me he movido a"
  },
  profile: {
    personal_text: "Nada",
    marry: "Nadie"
  },
  weekly: {
    message: "Se agregaron **2,100** a tu cuenta",
    message2: "Despues de un 6%\nMultiplicador: **x7**"
  }
},
events: {
    message: {
      isMentioned: {
        field1: "> Para obtener la lista de comandos.",
        field2: "Soporte",
        footer: "Creado Por BahianoDevelopments",
        invite: "Invitación"
    },
     ant: {
       warn: "invitación publicada",
       author: "Usuario",
       reason: "Razón",
       warns: "Cantidad de Advertencias",
       moderator: "Moderador responsable",
       warned: "Ha sido advertido"
    },
     cooldown: "**:grey_exclamation: |** Tienes que esperar `2s` para poder volver a usar este comando"
  }
},
  language: {
  sucess: "**:grey_exclamation: |** Idioma establecido a Español",
  enterokay: "**:grey_exclamation: |** Debes ingresar un idioma, `es`: Español ó `en`: Inglés.",
  has: "**:grey_exclamation: |** Debe ser `es` ó `en`."
},
  permissions: {
    member: {
      BAN_MEMBERS: "**:grey_exclamation: |** No tienes permisos. `Banear Miembros`",
      MANAGE_MESSAGES: "**:grey_exclamation: |** No tienes permisos. `Gestionar Mensajes`",
      KICK_MEMBERS: "**:grey_exclamation: |** No tienes permisos. `Expulsar Miembros`"
    },
    me: {
      MANAGE_ROLES_and_MANAGE_CHANNELS: "No tengo permisos. `Gestionar Roles`  Y `Gestionar Canales`",
      BAN_MEMBERS: "**:grey_exclamation: |** Perdon, pero no tengo permisos. `Banear Miembros`",
      MANAGE_MESSAGES: "**:grey_exclamation: |** Perdon, pero no tengo permisos. `Gestionar Mensajes`",
      KICK_MEMBERS: "**:grey_exclamation: |** Perdon, pero no tengo permisos. `Expulsar Miembros`"
    }
  }
}