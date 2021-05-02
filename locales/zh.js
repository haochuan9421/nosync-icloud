module.exports = {
  folder: "指定你不希望同步到 iCloud 的文件夹",
  git: "跳过将 “nosync 文件夹” 添加到 .gitignore 的步骤",
  pwd: "您当前的项目不在 iCloud 云盘中，是否继续？",
  installTip: "请选择安装 node_modules 的方式？",
  notInstall: "暂不安装",
  addSuccessTip: "\n添加 .gitignore 成功\n",
  existTip: (msg) => `\n${msg} 已不再同步到 iCloud 了，你无需重复执行！\n`,
  removeTip: (msg) => `已移除无效的 ${msg} 快捷方式`,
  successTip: (msg) => `\n大功告成，${msg} 将不再同步到 iCloud 👏 👏 👏\n`,
  addTip: (msg) => `是否添加 ${msg} 到 .gitignore？`,
};
