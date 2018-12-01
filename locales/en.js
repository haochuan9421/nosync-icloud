module.exports = {
  folder: 'specify a folder that you do not want to sync',
  git: 'whether to automatically add .gitignore',
  pwd: 'Your project is not in the iCloud Drive, continue?',
  installTip: 'Choose your preferred way to install node_modules',
  notInstall: 'No, I will handle that myself',
  addSuccessTip: '\n.gitignore is added successfully\n',
  existTip(msg) {
    return `\n${msg} is no longer syncing to iCloud, you don't need to do this twice!\n`;
  },
  removeTip(msg) {
    return `Removed the invalid ${msg} link`;
  },
  successTip(msg) {
    return `\nDone! ${msg} is no longer syncing to iCloud 👏 👏 👏\n`;
  },
  addTip(msg) {
    return `Add ${msg}* to .gitignore?`;
  }
};
