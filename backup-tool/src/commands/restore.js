import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { restoreBackup } from '../services/restoreService.js';

export default {
  name: 'restore',
  data: new SlashCommandBuilder()
    .setName('restore')
    .setDescription('Restore server from a backup file')
    .addStringOption(option =>
      option
        .setName('file')
        .setDescription('Backup file name')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ flags: 64 });

    const fileName = interaction.options.getString('file');

    await restoreBackup(interaction.guild, fileName);
  }
};
