const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unique')
		.setDescription('Adds a role to the unique roles list')
		.addRoleOption(option => 
			option
				.setName("added")
				.setDescription('The role to add to the unique list')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('Pong!');
		console.log(`Role: ${interaction.options.getRole("added").id}`);
	},
};
