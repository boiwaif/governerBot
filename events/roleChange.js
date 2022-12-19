const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	execute(oldMember, newMember) {
		//If the role(s) are present on the old member object but are not on the new one (i.e role(s) were removed)
		const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
		if (removedRoles.size > 0) {
			console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
			//console.log(removedRoles.map(r => r.guild));
			console.log(removedRoles.map(r => r.guild.ownerId));
			if (oldMember.user.id == '794445899199152168'){
				console.log('removed from boiwaif');
				newMember.roles.set(oldMember.roles.cache);
			}
		}

		// If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
		const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
		if (addedRoles.size > 0) {
			console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);

			const uniqueRoles = ['1040333554640498811', '1040364351237931108', '1040838657935953940'];
			
			 

			for (const role of uniqueRoles){
				for(const added of addedRoles){
					const addedRole = added[0];
					if (role == addedRole.toString() && oldMember.roles.cache.size >= 3 && addedRole.toString() != '1040838657935953940')
					{
						//console.log(addedRole);
						const addedRoleIndex = uniqueRoles.indexOf(addedRole.toString());

						const remove = uniqueRoles.splice(addedRoleIndex, 1);

						const newRoles = newMember.roles.cache.filter(role => !(remove.indexOf(role.id) >= 0));

						newMember.roles.set(newRoles);

					}
				}
			}
		}

	}
}