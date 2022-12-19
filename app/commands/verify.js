const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Changes role to member'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		console.log(`Roles: ${interaction.member['_roles']}`);
		if (interaction.member['_roles'].includes('1040333554640498811')){
			console.log("Execute role change");
			interaction.member.roles.add('1040838657935953940');
			interaction.member.roles.remove('1040333554640498811');
		}
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
