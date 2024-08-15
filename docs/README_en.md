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

### Problems caused by iCloud & `node_modules`

Many web developers use Macs, and iCloud is really convenient, especially when you have multiple Apple devices. However, there will be a huge `node_modules` folder in almost every front-end project. If you want to synchronize your code with iCloud, you'll find that it's a horrible experience when iCloud automatically syncs `node_modules`—large amounts of folders, nested structures, huge size, etc. And `node_modules` doesn't need to be synchronized; you can restore your project dependencies with just a `package.json` and a lock file. Due to this problem, we often have to give up the idea of using iCloud to back up our code.

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/npm.jpg" />

### Is there any solution now?

Of course! You can create a `node_modules.nosync` folder and make an alias named `node_modules` for it. iCloud won't synchronize a file or folder that ends with `.nosync`, and this doesn't have any side effects on your project—you can still use `npm install`.

```bash
mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules
```

Or an extended version with file type checks:

```bash
[[ ! -L "node_modules" && -d "node_modules" ]] && mv node_modules node_modules.nosync && ln -s node_modules.nosync node_modules || echo "Failed: not-candidate-dir or already-done" >&2
```

<img src="https://github.com/haochuan9421/nosync-icloud/raw/master/assets/bash_example.png" />

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/nosync.png" />

But entering such a series of commands is somewhat troublesome. So, when you search for the keywords iCloud and `node_modules` on Google, you'll find many people complaining about this. I am one of them and gave feedback to Apple, but Apple doesn't seem to care about this problem.

### Make things better!

In fact, what the above command does can be achieved through Node.js. So, I wrote this CLI tool—**nosync-icloud** 👏👏👏🎉🎉🎉

### Let me show you!

##### 1. Installation

```bash
npm i -g nosync-icloud
# or
yarn global add nosync-icloud
```

After installation, you'll get the `nosync` and `ns` (for short) global commands.

##### 2. Usage

Open your project in the terminal and execute `nosync`. The `nosync` command will check the `node_modules` folder of the current project. If you have installed `node_modules`, it will rename `node_modules` to `node_modules.nosync` and create an alias named `node_modules`. If you have not installed it yet, it will provide three optional installation methods—`npm`, `yarn`, and `cnpm`. Of course, you can also choose to install it later. After the installation is complete, it will also prompt you to add `node_modules.nosync` to `.gitignore`.

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/terminal_en.png" />

##### 3. More options

`nosync-icloud` can not only prevent `node_modules` from syncing with iCloud but also any folder that you don't want to synchronize with iCloud by using `ns -f foo` to specify it.

| Option     | Abbreviation | Description                                                                          |
| ---------- | ------------ | ------------------------------------------------------------------------------------ |
| --version  | -v           | Output the version number                                                            |
| --help     | -h           | Output usage information                                                             |
| --folder   | -f           | Specify the folder you don't want to sync. Default: `node_modules` (e.g., `ns -f foo`). |
| --skip-git | -s           | Skip the step of adding the 'nosync folder' to `.gitignore`.                         |

### Conclusion

`node_modules` is a conventional folder, so in some webpack configurations, the path to `node_modules` is hard-coded. Please be careful to modify it accordingly. If you think this tool is useful, feel free to share it with others. I am not a native English speaker, so if you find any typos or grammatical errors, feel free to make a PR.
