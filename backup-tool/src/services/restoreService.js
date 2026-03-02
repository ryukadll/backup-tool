import fs from 'fs';
import path from 'path';
import { ChannelType } from 'discord.js';

export async function restoreBackup(guild, fileName) {
  const filePath = path.resolve('backups', fileName);
  const backup = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const roleMap = new Map();
  const categoryMap = new Map();
  const everyoneRole = guild.roles.everyone;


  for (const role of backup.roles.sort((a, b) => a.position - b.position)) {
    const newRole = await guild.roles.create({
      name: role.name,
      color: role.color,
      hoist: role.hoist,
      permissions: BigInt(role.permissions),
      mentionable: role.mentionable
    });

    roleMap.set(role.id, newRole.id);
  }


  for (const channel of backup.channels.filter(c => c.type === ChannelType.GuildCategory)) {
    const newCategory = await guild.channels.create({
      name: channel.name,
      type: ChannelType.GuildCategory
    });

    categoryMap.set(channel.id, newCategory.id);
  }


  for (const channel of backup.channels.filter(c => c.type !== ChannelType.GuildCategory)) {
    await guild.channels.create({
      name: channel.name,
      type: channel.type,
      parent: channel.parentId
        ? categoryMap.get(channel.parentId) ?? null
        : null,
      permissionOverwrites: remapOverwrites(
        channel.permissionOverwrites,
        roleMap,
        everyoneRole.id
      )
    });
  }


  if (Array.isArray(backup.emojis)) {
    for (const emoji of backup.emojis) {
      try {
        await guild.emojis.create({
          name: emoji.name,
          attachment: emoji.url
        });
      } catch {
      }
    }
  }
}


function remapOverwrites(overwrites, roleMap, everyoneId) {
  const mapped = [];

  for (const o of overwrites) {
    if (o.type === 0 && o.id === everyoneId) {
      mapped.push({
        id: everyoneId,
        allow: BigInt(o.allow),
        deny: BigInt(o.deny),
        type: 0
      });
      continue;
    }

    if (o.type === 0 && roleMap.has(o.id)) {
      mapped.push({
        id: roleMap.get(o.id),
        allow: BigInt(o.allow),
        deny: BigInt(o.deny),
        type: 0
      });
    }
  }

  return mapped;
}
