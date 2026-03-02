# Server Backup Bot

A advanced **Discord.js** bot that lets you **backup, restore, and wipe Discord server configurations** using slash commands.  
Useful for testing servers, cloning setups, or keeping a safe copy of your server structure.

---

## Features

- **Backup Server**
  - Saves server structure (channels, roles, permissions, etc.)
- **Restore Backup**
  - Restore a saved backup to a server
- **Wipe Server**
  - Clear server structure before restoring
- **Permission Checks**
  - Only authorized users can run commands
- **Local Backup Storage**
  - Backups saved inside `/backups` folder

---

## Project Structure

```
backup-tool/
├── backups/                # Saved backups
├── src/
│   ├── commands/           # Slash commands
│   │   ├── backup.js
│   │   ├── restore.js
│   │   └── wipe.js
│   ├── services/           # Backup logic
│   │   ├── backupService.js
│   │   ├── restoreService.js
│   │   └── wipeService.js
│   ├── clearCommands.js
│   └── index.js            # Bot entry point
├── utils/
│   └── permissionUtils.js
├── .env
└── package.json
```

---

## Requirements

- Node.js **v18+**
- Discord Bot Token
- Discord Application + Guild ID

---

## Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/ryukadll/backup-tool.git
   cd backup-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Edit `.env`:

   ```env
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_application_id
   GUILD_ID=your_test_server_id
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

---

## Commands

Once the bot is running, slash commands will register automatically.

### `/backup`
Creates a backup of the current server structure.

### `/restore`
Restores a previously saved backup.

### `/wipe`
Deletes channels/roles to prepare for restoring a backup.

---

## Backups Location

Backups are stored locally in:

```
/backups
```

You can move or rename files manually if needed.

---

## Permissions

Make sure the bot has permissions to:

- Manage Channels
- Manage Roles
- View Channels
- Read Message History

And only trusted users should have access to backup/restore commands.

---

## Warning

Restoring or wiping a server **cannot be undone**.

Always:
- Test on a separate server first
- Keep multiple backups

---

## Development

Run bot in dev mode:

```bash
node src/index.js
```

Edit commands inside:
```
src/commands/
```

Logic is inside:
```
src/services/
```

---

## License

MIT License — free to use and modify.

---

## ❤️ Contributions

Pull requests and improvements are welcome!

If you find a bug or want a feature, open an issue.

---

## Future Ideas

- Backup messages
- Cloud storage support
- Web dashboard
- Scheduled backups

---

Enjoy safe Discord server backups! 🚀
