# nosync-icloud

> Avoid syncing `node_modules` to iCloud

<p align="center">
    <a href="https://www.npmjs.com/package/nosync-icloud"><img src="https://img.shields.io/npm/v/nosync-icloud.svg?style=flat-square" alt="Version"></a>
    <a href="https://npmcharts.com/compare/nosync-icloud?minimal=true"><img src="https://img.shields.io/npm/dm/nosync-icloud.svg?style=flat-square" alt="Downloads"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/commits/master"><img src="https://img.shields.io/github/last-commit/haochuan9421/nosync-icloud.svg?style=flat-square" alt="Commit"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/issues"><img src="https://img.shields.io/github/issues-closed/haochuan9421/nosync-icloud.svg?style=flat-square" alt="Issues"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/nosync-icloud.svg?style=flat-square" alt="License"></a>
</p>

[简体中文](https://github.com/HaoChuan9421/nosync-icloud/blob/master/docs/README_zh.md)&emsp;
[English](https://github.com/HaoChuan9421/nosync-icloud/blob/master/docs/README_en.md)&emsp;

### Installation

```bash
npm i -g nosync-icloud
# or
yarn global add nosync-icloud
```

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/vs.png" />

### Trouble made by iCloud & node_modules

Many Web Developers are using Mac, iCloud is really convenience, especially when you have multiple Apple devices. But, there will be a huge `node_modules` in almost every front-end project. If you want to synchronize your code with iCloud. You'll find out that what a horrible experience it is when iCloud automatically synchronizes `node_modules` —— large amount of folders, nested structure, huge size, etc., and `node_modules` doesn't need to be synchronized. You can restore your project dependencies just with a `package.json` and `lock file`. Due to this trouble, we have to give up the idea of using iCloud to back up our code.

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/npm.jpg" />

### Is there any solution now?

Of course, you can create a `node_modules.nosync` folder, and make an alias named `node_modules` for it. iCloud won't synchronize a file or folder which is end of `.nosync`, and, this don't have any side effect to your project, you can still use `npm install`.


```bash
mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules
```
or an extended version with file type checks

```bash
[[ ! -L "node_modules" && -d "node_modules" ]] && mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules || echo "Failed: not-candidate-dir or already-done" >&2
```

<img src="https://github.com/haochuan9421/nosync-icloud/raw/master/assets/bash_example.png" />


<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/nosync.png" />

But entering such a series of commands is somewhat troublesome. So, when you search for the keywords iCloud, `node_modules` in Google, you will find a lot of people complaining about that, i am one of them, and gave feedback to Apple, but Apple doesn't seems care about this problem.

### Make things better!

In fact, what the above line of command does can be achieved through Node.js. So I wrote this `CLI` tool —— **nosync-icloud** 👏👏👏🎉🎉🎉

### Let me show you !

##### 1. Installation

```bash
npm i -g nosync-icloud
# or
yarn global add nosync-icloud
```

you'll get `nosync` and `ns` （for short）global command after installation.

##### 2. Usage

Open your project in the terminal and execute `nosync`. The `nosync` command will check the `node_modules` of the current project. If you have installed `node_modules`, then it will rename `node_modules` to `node_modules.nosync` and create an alias named `node_modules`. If you have not installed it before, it will provide three optional installation methods —— `npm`, `yarn`, `cnpm`, of course you can also choose to install it later. After the installation is complete, it will also prompt you whether to add `node_modules.nosync` to `.gitignore`.

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/terminal_en.png" />

##### 3. More options

`nosync-icloud` can not only avoid `node_modules` to sync with iCloud, but also any folder that you don't want to synchronize with iCloud by using `ns -f foo` to specify it.

| Options    | Abbreviation | Description                                                                          |
| ---------- | ------------ | ------------------------------------------------------------------------------------ |
| --version  | -v           | output the version number                                                            |
| --help     | -h           | output usage information                                                             |
| --folder   | -f           | specify the folder you don't want to sync. default: `node_modules` e.g. `ns -f foo`. |
| --skip-git | -s           | skip the step of adding the 'nosync folder' to `.gitignore`                          |

### Conclusion

`node_modules` is a conventional folder, so in some webpack configurations, the path of `node_modules` is hard-coded, please pay attention to modify it. If you think this gadget is not bad, you might as well share it with others. I am not a native English speaker, if you found any typo or grammatical errors, feel free to make a `PR`.
