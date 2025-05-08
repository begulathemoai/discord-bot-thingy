const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { Readline } = require('node:readline/promises');

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


let mode = "c";
let id = "1083133674196832258";
let dernier_message = null;

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
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
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	take_user_input();
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);
	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.on('messageCreate', async (interaction) => {
	if (interaction.author.bot) {
		return;
	};
	dernier_message = interaction
	//interaction.channel.send("Oh non tellement triste Alexa joue Despacito");
	console.log(`${interaction.author.username} has sent "${interaction.content}" with id ${interaction.id}`);
})

// Log in to Discord with your client's token
client.login(token);

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});



function take_user_input() {
	
	readline.question('Message to send : ', name => {
		if (name.startsWith("switch")) {
			let content = register[name.split(" ")[1]]
			mode = content["type"];
			id = content["id"];
			
		} else if (name.startsWith("rep")) {
			name = name.slice(4,name.length);
			if (dernier_message != null) {
				dernier_message.reply(name);
			}

		} else if (name.startsWith("lapidation")) {
			
			if (mode == "c") {
				client.channels.cache.get(id).send("https://cdn.discordapp.com/attachments/1083133674196832258/1364607166551556228/RDT_20250422_1655391259002735799594535.gif");
			} else if (mode == "u") {
				client.users.fetch(id).then(dm => {
					dm.send("https://cdn.discordapp.com/attachments/1083133674196832258/1364607166551556228/RDT_20250422_1655391259002735799594535.gif")
				});}
				
			} else if (name.startsWith("register")) {
				if (name.split(" ").length == 4) {
					id = name.split(" ")[1];
					nid = name.split(" ")[2];
					type = name.split(" ")[3];
					register_id(id,nid,type);
				}
				
			} else {
				if (mode == "c") {
					client.channels.cache.get(id).send(name);
				} else if (mode == "u") {
					client.users.fetch(id).then(dm => {
						dm.send(name)
					});
					
				}
				
				
				
			}
			take_user_input();
		});
	}
	
	function register_id(id,nid,type){
		
		fs.appendFile('./id_register.txt',`${id};${nid};${type}\n`,function (err) {
			console.log(err || `Successfully registered id ${id} as ${nid} of type ${type}.\nTo let the changes register, please restart the program.`)
		});
	}

let register = {};

if (fs.existsSync("./id_register.txt")) {

	let register_text = fs.readFileSync('./id_register.txt');
	register_text = register_text.toString();
	register_text = register_text.split("\n");
	
	
	for (let i of register_text) {
		let content = i.split(";")
		register[content[1]] = {"id":content[0],"type":content[2]}
	}
} else {
	fs.writeFile("./id_register.txt", "", { flag: 'w' }, function (err) {
		if (err) throw err;
	});
}

console.log("Finished initialisation. It is now safe to proceed.")