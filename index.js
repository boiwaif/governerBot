// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const Sequelize = require('sequelize');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client(
	{ intents: 
		[
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.GuildMembers,
		] 
	}
);

// Log in to Discord with your client's token
client.login(token);


//Creates collection to contain all the different commands
client.commands = new Collection();

//Reads all the javascript files in commands and adds them to the collection 
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Reads all the event files in commands and adds them to eventFiles
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//Goes through all the eventFiles and executes them
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		console.log(`Ready Listener Detected: ${event.name}`);
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		console.log(`Event Listener Detected: ${event.name}`);
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	roleID: {
		type: Sequelize.INTEGER,
		unique: true,
		allowNull: false,
	},
	group: Sequelize.STRING,
});