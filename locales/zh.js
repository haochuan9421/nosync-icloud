module.exports = {
  folder: '禁止同步的[文件夹名]',
  git: '是否自动添加 .gitignore',
  pwd: '您当前的项目不在 iCloud 云盘中，是否继续？',
  installTip: '请选择安装 node_modules 的方式？',
  notInstall: '暂不安装',
  addSuccessTip: '\n添加 .gitignore 成功\n',
  existTip(msg) {
    return `\n${msg} 已不再同步到 iCloud 了，您无需重复执行！\n`;
  },
  removeTip(msg) {
    return `已移除无效的 ${msg} 快捷方式`;
  },
  successTip(msg) {
    return `\n大功告成，${msg} 将不再同步到 iCloud 👏 👏 👏\n`;
  },
  addTip(msg) {
    return `是否添加 ${msg}* 到 .gitignore？`;
  }
};
