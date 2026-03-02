import fs from 'fs';
import path from 'path';
import { ChannelType } from 'discord.js';

export async function createBackup(guild) {
  const backup = {
    roles: guild.roles.cache
      .filter(r => r.name !== '@everyone')
      .sort((a, b) => a.position - b.position)
      .map(role => ({
        id: role.id,
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        mentionable: role.mentionable,
        permissions: role.permissions.bitfield.toString(),
        position: role.position
      })),

    channels: guild.channels.cache
      .filter(c => c.type !== ChannelType.GuildForum)
      .sort((a, b) => a.position - b.position)
      .map(channel => ({
        id: channel.id,
        name: channel.name,
        type: channel.type,
        parentId: channel.parentId,
        position: channel.position,
        permissionOverwrites: channel.permissionOverwrites.cache.map(o => ({
          id: o.id,
          type: o.type,
          allow: o.allow.bitfield.toString(),
          deny: o.deny.bitfield.toString()
        }))
      })),

    emojis: guild.emojis.cache.map(emoji => ({
      name: emoji.name,
      animated: emoji.animated,
      url: emoji.url
    }))
  };

  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }

  const fileName = `backup-${Date.now()}.json`;
  const filePath = path.join('backups', fileName);

  fs.writeFileSync(filePath, JSON.stringify(backup, null, 2));
  return fileName;
}
