module.exports = {
  no_user: "**:grey_exclamation:** | Mention someone",
  wait: "**:grey_exclamation: |** You have to wait",
  wait2: "to be able to use this command again",
commands: {
  eightBall: {
    ball: ["Yes", "No", "Maybe", "I don't know", "Clear!", "Of course", "Of course not", "Of course not", "Definitely", "what do you think?","Hmm","Ask your mom"],
    title: "🎱Question 8ball",
    field1: "Question",
    field2: "Reply",
    no_args: "You must write a question."
  },
  angry: {
    no_user: "Is angry 😡",
    user: "Is angry with"
  },
  avatar: {
    no_user: "Your Avatar",
    user: "Avatar of"
  },
  balance: {
    no_user: ":moneybag:You have",
    user: "Have:"
  },
  ban: {
    no_args: "**:grey_exclamation: |** Provide a person to ban.",
    no_user: "**:grey_exclamation: |** Could not find that member, try again.",
    no_reason: "Break the rules",
    yourself: "**:grey_exclamation: |** You can't ban yourself ..",
    bannable: "**:grey_exclamation: |** I can't ban the mentioned user.",
    sucess: "it was banned from the server, reason:"
  },
  botinfo: {
    statistics: "Statistics",
    owner: "Owner",
    guilds: "Guilds",
    users: "Users",
    channels: "Channels",
    commands: "Commands",
    events: "Events",
    uptime: "Uptime",
    connections: "voice Connections",
    version: "Version",
    usage: "Memory Usage"
  },
  clear: {
    no_args: '**:grey_exclamation: |** Enter the number of messages to delete',
    messages: {
      max:  "**:exclamation: |** You can only bulk delete messages that are under 14 days old.",
      unknown: "**:exclamation: |** There are no messages to delete"
    }
  },
  cry: {
    no_user: "is sad 😢",
    user: "Is sad with"
  },
  daily: {
    message: "Daily Reward Claimed **$2,100**",
    message2: "After 6% tax)\nMultiplier: **x7**"
  },
  divorce: {
    nothing: "**:grey_exclamation: |** You are not married to anyone :(",
    sucess: "Has divorced you from"
  },
  dm: { 
    description: `**Description**: Command: write a private message to a user\n[] Required`,
    field: {
     title: "**Use**",
      description: "dm [@user] [text]"
    },
    field2: {
      title: "**Example**",
      description: "dm <@614957978675838976> Hello:grinning:"
    },
    field3: {
    title: "Content",
    footer: "Sent by:"
  }, 
    sucess: "**MD sent successfully**"
  },
  eval: {
    error: "**:grey_exclamation: |** Only developers can use this :("
  },
  help: {
    title: "Command List",
    field: "**Fun**",
    field2: "**Moderation**",
    field3: "**Music**",
    field4: "**Useful**",
    field5: "**Information**",
    sucess: "Check your DM"
  },
  hug: {
    himself: "He hugged himself",
    another_person: "Hug to"
  },
  kick: {
    no_args: "**:grey_exclamation: |** Provide a person to eject.",
    no_user: "**:grey_exclamation: |** Could not find that member, try again.",
    reason: "Break the rules",
    yourself: "**:grey_exclamation: |** You can't kick yourself out ...",
    kickable: "**:grey_exclamation: |** I cannot kick the mentioned user.",
    sucess: "**:grey_exclamation: |** He was kicked off the server.",
    reason: "reason"
  },
  kill: {
    himself: "He killed himself",
    another_person: "Killed to"
  },
  love: {
    bot: "A bot has no feelings.",
    relations: "RELATIONS"
  },
  marry: {
    married: "You are already married to",
    bot: "You can't marry a bot ..",
    yourself: "You can't marry yourself ..",
    another_married: "That user is already married.",
    request: "write `yes` or `no` to respond to the marriage proposal of",
    expire: "This expires in 2 minutes.",
    cooldown: "You must wait",
    cooldown2: "to be able to ask for marriage again",
    sucess: "Congratulations!",
    sucess2: "got married with",
    unsucess: "I cruelly reject you",
    expired: "did not answer, the wait is over"
  },
  move: {
    disconnected: "**:grey_exclamation: |** I'm not inside a voice channel",
    need_join: "**:grey_exclamation: |** You need to join a voice channel first",
    no_queue: '**:grey_exclamation: |** There are no songs in the queue',
    already_connected: "**:grey_exclamation: |** I'm already connected to this voice channel",
    sucess: "**:grey_exclamation: |** I have moved to" 
  },
  profile: {
    personal_text: "Nothing",
    marry: "no one"
  },
  weekly: {
    messsge: "Adding **2,100** money in your account",
    message2: "You work this weekly, your giveaway is **2,100**"
  }
},
events: {
    message: {
      isMentioned: {
        field1: "> To get the list of commands.",
        field2: "Support",
        footer: "Created By BahianoDevelopments",
        invite: "Invite"
    },
     ant: {
       warn: "invite posted",
       author: "User",
       reason: "Reason",
       warns: "Number of Warnings",
       moderator: "Responsible moderator",
       warned: "Has been warned"
    },
     cooldown: "**:grey_exclamation: |** You have to wait `2s` to be able to use this command again"
  }
},
language: {
  sucess: "**:grey_exclamation: |** Language set to English",
  enterokay: "**:grey_exclamation: |** You must enter a language, `es`: Spanish or `en`: English.",
  has: "**:grey_exclamation: |** It must be `es` or `en`."
},
  permissions: {
    member: {
      BAN_MEMBERS: "**:grey_exclamation: |** You don't have permissions. `Ban Members`",
      MANAGE_MESSAGES: "**:grey_exclamation: |** You don't have permissions. `Manage Messages`",
      KICK_MEMBERS: "**:grey_exclamation: |** You don't have permissions. `Kick Members`"
    },
    me: {
      BAN_MEMBERS: "**:grey_exclamation: |** Sorry, but I don't have permissions. `Ban Members`",
      MANAGE_MESSAGES: "**:grey_exclamation: |** Sorry, but I don't have permissions. `Manage Messages`",
      KICK_MEMBERS: "**:grey_exclamation: |** Sorry, but I don't have permissions. `Kick Members`"
    }
  }
}