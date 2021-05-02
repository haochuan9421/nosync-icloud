module.exports = {
  folder: "Specify the folder you don't want to sync",
  git: "Skip the step of adding the 'nosync folder' to .gitignore",
  pwd: "Your current project is not in iCloud Drive. Do you want to continue?",
  installTip: "Please choose how to install node_modules",
  notInstall: "No, I will deal with it myself later",
  addSuccessTip: "\nSucceeded in adding .gitignore\n",
  existTip: (msg) => `\n${msg} is no longer synced to iCloud, you don't need to do this twice!\n`,
  removeTip: (msg) => `Invalid ${msg} symlink removed`,
  successTip: (msg) => `\nDone! ${msg} will no longer sync to iCloud Drive 👏 👏 👏\n`,
  addTip: (msg) => `Add ${msg} to .gitignore?`,
};
