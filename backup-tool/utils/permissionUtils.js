export function serializeOverwrites(channel) {
  return channel.permissionOverwrites.cache.map(overwrite => ({
    id: overwrite.id,
    allow: overwrite.allow.bitfield.toString(), 
    deny: overwrite.deny.bitfield.toString(),   
    type: overwrite.type
  }));
}

export function deserializeOverwrites(guild, overwrites) {
  return overwrites.map(overwrite => ({
    id: overwrite.id,
    allow: BigInt(overwrite.allow), 
    deny: BigInt(overwrite.deny)
  }));
}
