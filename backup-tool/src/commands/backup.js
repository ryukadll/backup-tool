import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createBackup } from '../services/backupService.js';

export default {
  name: 'backup',
  data: new SlashCommandBuilder()
    .setName('backup')
    .setDescription('Create a full server backup')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const filePath = await createBackup(interaction.guild);
    await interaction.editReply(`Backup created: \`${filePath}\``);
  }
};
