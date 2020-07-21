module.exports = async (client, oldGuild, newGuild) => {
if (oldGuild.premiumSubscriptionCount < newGuild.premiumSubscriptionCount) return console.log("Ha sido boosteado "+newGuild.name)
else if (oldGuild.premiumSubscriptionCount > newGuild.premiumSubscriptionCount) return console.log("Acabó un boost en "+newGuild.name)

}