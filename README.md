# nosync-icloud

> 避免 iCloud 同步 `node_modules`（Avoid syncing `node_modules` to iCloud）。

<p align="center">
    <a href="https://www.npmjs.com/package/nosync-icloud"><img src="https://img.shields.io/npm/v/nosync-icloud.svg?style=flat-square" alt="Version"></a>
    <a href="https://npmcharts.com/compare/nosync-icloud?minimal=true"><img src="https://img.shields.io/npm/dm/nosync-icloud.svg?style=flat-square" alt="Downloads"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/commits/master"><img src="https://img.shields.io/github/last-commit/haochuan9421/nosync-icloud.svg?style=flat-square" alt="Commit"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/issues"><img src="https://img.shields.io/github/issues-closed/haochuan9421/nosync-icloud.svg?style=flat-square" alt="Issues"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/nosync-icloud.svg?style=flat-square" alt="License"></a>
</p>

[简体中文](https://github.com/HaoChuan9421/nosync-icloud/blob/master/docs/README_zh.md)&emsp;
[English](https://github.com/HaoChuan9421/nosync-icloud/blob/master/docs/README_en.md)&emsp;

### 安装

```bash
npm i -g nosync-icloud
# or
yarn global add nosync-icloud
```

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/vs.png" />

### 我要解决什么痛点？

很多开发者都在使用 `Mac` 作为自己的生产工具，苹果 iCloud 同步的便利性相信也不需要我多解释，特别是当你有多台苹果设备时，那种无缝的体验，一旦用了就回不去。可作为一名**前端开发人员**，几乎每个项目里都会有一个庞大的 `node_modules`。如果你想把自己的前端项目也备份到 iCloud，你会发现，当 iCloud 自动同步 `node_modules` 时，那是一种多么痛的领悟 —— 繁多的文件、嵌套的层级、庞大的体积等等，而 `node_modules` 也并没有同步的必要，你只需要一个 `package.json` 和 `lock file` 就可以随时随地还原项目的依赖。在这方面，iCloud 的糟糕体验使得你不得不打消用它来备份前端项目的念头。

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/npm.jpg" />

### 有没有现行的解决方案？

如何避免 iCloud 自动同步 `node_modules`？方法还是有的，你只需要创建一个 `node_modules.nosync` 文件夹，然后为它制作一个名为 `node_modules` 的替身（快捷方式）即可。iCloud 不会同步以 `.nosync` 结尾的文件或者文件夹，而这样做也不会影响到你的开发，你依然可以使用 `npm install`。


```bash
mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules
```
或扩展版本

```bash
[[ ! -L "node_modules" && -d "node_modules" ]] && mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules || echo "Failed: not-candidate-dir or already-done" >&2
```

<img src="https://github.com/t4g/nosync-icloud/raw/master/assets/example.jpg" />


<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/nosync.png" />

但输入这么一串命令多少有些麻烦，所以当你用谷歌搜索 iCloud，`node_modules` 这些关键字的时候，你会发现大量用户抱怨这个，我也是其中之一，并给苹果提交的反馈，但是苹果似乎并没有积极解决这个问题，网上提供的方案也大体和我上面说的一样。

### 让事情更简单点

其实上面的那行命令做的事情完全可以通过 Node.js 实现。所以我写了这个 `CLI` 工具 —— **nosync-icloud** 👏👏👏🎉🎉🎉。

### 如何使用

##### 1. 安装

```bash
npm i -g nosync-icloud
# or
yarn global add nosync-icloud
```

安装成功后会创建 `nosync` 和 `ns` （简写，作用相同）的全局命令。

##### 2. 使用

在终端中进入你的项目，执行 `ns` 即可。`ns` 命令会检查当前项目的 `node_modules`，如果你已经安装过 `node_modules`，那么他会把 `node_modules` 重命名为 `node_modules.nosync` 并创建一个名为 `node_modules` 的替身。如果你没有安装过，它会提供三种可选安装方式 —— `npm`、`yarn`、`cnpm`，当然你也可以选择稍后安装。安装完成后，它还会提示你是否将 `node_modules.nosync` 添加到 `.gitignore`。

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/terminal.png" />

##### 3 其他指令

`nosync-icloud` 不仅可以禁止 iCloud 自动同步 `node_modules`，你还可以通过 `ns -f foo` 指定任何你不希望同步的文件夹。

| 指令       | 简写 | 作用                                                                  |
| ---------- | ---- | --------------------------------------------------------------------- |
| --version  | -v   | 查看当前版本号                                                        |
| --help     | -h   | 输出帮助信息                                                          |
| --folder   | -f   | 指定你不希望同步到 iCloud 的文件夹，默认 node_modules，如： ns -f foo |
| --skip-git | -s   | 跳过将 “nosync 文件夹” 添加到 .gitignore 的步骤                       |

### 写在后面

`node_modules` 是一个约定俗成的文件夹，所以一些 webpack 配置中，会硬编码 `node_modules` 路径，请注意修改。如果你觉得这个小工具还不错，不妨把它分享给其他人。如果你有任何问题或建议，欢迎提交 `Issue` 和 `PR`。
