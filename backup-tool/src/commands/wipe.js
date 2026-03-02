import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { wipeGuild } from '../services/wipeService.js';

export default {
  name: 'wipe',
  data: new SlashCommandBuilder()
    .setName('wipe')
    .setDescription('Delete all roles, channels, and categories')
    .addBooleanOption(option =>
      option
        .setName('confirm')
        .setDescription('You must confirm this action')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const confirmed = interaction.options.getBoolean('confirm');

    if (!confirmed) {
      return interaction.reply({
        content: 'Wipe cancelled.',
        flags: 64
      });
    }

    await interaction.deferReply({ flags: 64 });

    await wipeGuild(interaction.guild);

  }
};
