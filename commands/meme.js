const randomPuppy = require('random-puppy');

module.exports = (bot, message, args) => {

    let reddit = ["meme","animememes","me_irl","SquarePosting"]
    
    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
    message.channel.startTyping();
    randomPuppy(subreddit).then(async url => {
            await message.channel.send({files: [{attachment: url, name: 'meme.png'}]}).then(() => message.channel.stopTyping());
}).catch(err => {
console.error(err);
message.channel.stopTyping()
});
}