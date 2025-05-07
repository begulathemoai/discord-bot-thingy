const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fuckoff')
		.setDescription(`Timeout l'utilisateur pour 1 jour`)
        .addUserOption(option =>
            option.setName('user')
                .setRequired(true)
                .setDescription(`L'utilisateur à timeout`)),
	async execute(interaction) {
        if (interaction.user.username == "begulathemoai") {
            const user = interaction.options.getUser('user');
            console.log(interaction.guild.members.fetch(user));
            let out = await interaction.guild.members.fetch(user);
            if (out.nickname == null) {
                await interaction.reply(`ok je timeout ${out.username}`);
            } else {
                await interaction.reply(`ok je timeout ${out.nickname}`);
            }
            await out.timeout(1 * 24 * 60 * 60 * 1000);
            

        } else {
            await interaction.reply(`tu m\'as pris pour un jambon t\'es pas begu toi t\'es ${interaction.member.username} >:(\nAllez fais toi timeout pour la peine`)

            await interaction.member.timeout(5*60*1000);
        }
	},
};
