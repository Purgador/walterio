module.exports = (client) => {

    let pollChannelID = '688824068434165803';
    let likeEmojiID = '704193031716470794';
    let dislikeEmojiID = '704193067208671271';

    client.on('message', async (message) => {
        if(message.channel.type !== "text")return;
        if(message.channel.id === pollChannelID){
            let emojis = message.guild.emojis;
            message.react(emojis.get(likeEmojiID)).then(() => {
               message.react(emojis.get(dislikeEmojiID));
            });
        }
    });

};