module.exports = {
  folder: "Specify a custom folder name that you would like to disable syncing for.",
  git: "Skip the step of adding the 'nosync folder' to .gitignore.",
  pwd: "Your current project is not in your iCloud Drive. Do you want to continue?",
  installTip: "Please choose how you prefer to install node_modules.",
  notInstall: "No, I will deal with it myself later.",
  addSuccessTip: "\nSucceeded in adding node_modules.nosync to .gitignore.\n",
  existTip: (msg) => `\n${msg} is already marked not to sync with your iCloud. Exitting.\n`,
  removeTip: (msg) => `Invalid ${msg} symlink found and removed.`,
  successTip: (msg) => `\nDone! ${msg} will no longer sync with your iCloud Drive. 👏 👏 👏\n`,
  addTip: (msg) => `Add ${msg} to .gitignore?`,
};
