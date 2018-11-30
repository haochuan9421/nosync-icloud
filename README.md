# nosync-icloud

> 避免 `iCloud` 同步 `node_modules`（Avoid `node_modules` to sync with `iCloud`）。

<p align="center">
    <a href="https://www.npmjs.com/package/nosync-icloud"><img src="https://img.shields.io/npm/v/nosync-icloud.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/nosync-icloud?minimal=true"><img src="https://img.shields.io/npm/dm/nosync-icloud.svg" alt="Downloads"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/commits/master"><img src="https://img.shields.io/github/last-commit/haochuan9421/nosync-icloud.svg" alt="Commit"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/issues"><img src="https://img.shields.io/github/issues-closed/haochuan9421/nosync-icloud.svg" alt="Issues"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/nosync-icloud.svg" alt="License"></a>
</p>

[简体中文](https://github.com/HaoChuan9421/nosync-icloud/blob/master/docs/README_zh.md) [English](https://github.com/HaoChuan9421/nosync-icloud/blob/master/docs/README_en.md)

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/vs.png" />

### 为什么要搞事情？

`iCloud` 同步带来的便利相信不需要我多解释，特别是当你有多台苹果设备时，那种无缝的体验，一旦用了就回不去。可作为一名**前端开发**，今天，无论你使用的是 `Vue` 还是 `React` 亦或任何其他的前端技术栈，几乎是不可能避开 `npm` 的，但是如果你想把自己的代码也备份到 `iCloud`，为它上一份双保险（`git仓库`一份）。那么你会发现，当 `iCloud` 自动同步 `node_modules` 时，那是一种多么痛的领悟 —— 无尽的文件、嵌套的层级、庞大的体积等等，而 `node_modules` 也并没有同步的必要，你只需要一个 `package.json` 和 `lock file` 就可以随时随地，无缝还原。在这方面，`iCloud` 的糟糕体验使得你不得不打消用它来备份前端代码的念头。

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/npm.jpg" />

### 有没有现行的解决之道？

如何避免 `iCloud` 自动同步 `node_modules`？方法还是有的，你只需要创建一个 `node_modules.nosync` 文件夹，然后为它制作一个名为 `node_modules` 的替身（快捷方式）即可。`iCloud` 不会同步以 `.nosync` 结尾的文件或者文件夹，而这样做也不会影响到你的开发。

```bash
mkdir node_modules.nosync && ln -s node_modules.nosync node_modules
```

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/nosync.png" />

但这并不是最佳实践，所以当你用谷歌搜索 `iCloud` `node_modules` 这些关键字的时候，你会发现大量用户抱怨这个，我也是其中之一，并给苹果提交的反馈，但是苹果似乎并没有积极解决这个问题的态度，网上提供的方案也大体和我上面说的一样。

### 一个前端攻城狮的反击！

难道就要这样将就？其实上面的那行命令完全可以做成一个可执行文件，这样每次需要时，只需要执行一个简短的命令就 OK 了。再联想到我们平时用 `npm` 全局安装的一些 `CLI` 工具，比如`vue init` 、`create-react-app`、`nodemon`等等，我觉得：身为一个前端，我应该做点什么了。于是 —— **nosync-icloud** 就诞生了👏👏👏🎉🎉🎉。

### 如何使用

##### 1. 安装

```bash
sudo npm i -g nosync-icloud
# or
sudo yarn global add nosync-icloud
```
安装成功后会创建 `nosync` 和 `ns` （简写，作用相同）的全局命令。

##### 2. 使用

打开 `iCloud`，进入任何一个你的项目中，在终端中执行 `ns` 即可。`ns` 命令会根据你当前项目结构，自动处理 `node_modules`，如果你之前没有安装过 `node_modules`，它会提供三种可选安装方式 —— `npm`、`yarn`、`cnpm`，当然你也可以选择稍后安装。安装完成后，你可以选择是否将 `node_modules*` 的忽略规则添加 `.gitignore`。

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/terminal.png" />

##### 3 其他指令

`nosync-icloud` 不仅可以 禁止 `iCloud` 自动同步 `node_modules`，你还可以通过 `ns -f foo` 指定任何你不希望同步的文件夹。

指令 | 简写 | 作用
---|---|---
--version | -v | 查看当前版本号
--help | -h | 输出帮助信息
--folder | -f | 指定不同步到 iCloud 的文件夹，默认 node_modules，如： ns -f foo
--git | -g | 跳过提示，直接添加 .gitignore，可选：ns -g false，跳过提示，不添加 .gitignore

### 写在后面

希望 `ns` 命令能成为使用 `Mac` 开发的前端小伙伴们回不去的习惯，如果它实实在在给你带来了便利，也感谢你的 `Star`，你也可以分享给身边的其他人。如果你有任何建议或问题，欢迎提交 `Issue` 和 `PR`。
