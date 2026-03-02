export async function wipeGuild(guild) {
  for (const channel of guild.channels.cache.values()) {
    await channel.delete().catch(() => {});
  }

  const roles = guild.roles.cache
    .filter(role => !role.managed && role.id !== guild.id)
    .sort((a, b) => b.position - a.position);

  for (const role of roles.values()) {
    await role.delete().catch(() => {});
  }
}
