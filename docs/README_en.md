# nosync-icloud

> Avoid `node_modules` to sync with `iCloud`.

<p align="center">
    <a href="https://www.npmjs.com/package/nosync-icloud"><img src="https://img.shields.io/npm/v/nosync-icloud.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/nosync-icloud?minimal=true"><img src="https://img.shields.io/npm/dm/nosync-icloud.svg" alt="Downloads"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/commits/master"><img src="https://img.shields.io/github/last-commit/haochuan9421/nosync-icloud.svg" alt="Commit"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/issues"><img src="https://img.shields.io/github/issues-closed/haochuan9421/nosync-icloud.svg" alt="Issues"></a>
    <a href="https://github.com/HaoChuan9421/nosync-icloud/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/nosync-icloud.svg" alt="License"></a>
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

Many Web Developers are using `Mac` as their main development tools, and, `iCloud` is really convenience, especially when you have multiple Apple devices. But, it is almost impossible to avoid using `npm` in nowdays, Whether you are working with `Vue` or `React` or any web technology else. So, if you want to synchronize your code with `iCloud` for a double insurance (one is git repo). Then you'll find out that what a horrible experience it is when `iCloud` automatically synchronizes `node_modules` —— large amount of folders, nested structure, huge size, etc., and `node_modules` is not need to be synchronized, you can restore your project just with a `package.json` and `lock file` in anytime, anywhere. Due to this trouble, we have to give up the idea of using `iCloud` to back up our code.

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/npm.jpg" />

### Is there any solution now?

Of course, you can create a `node_modules.nosync` folder, and make an alias named `node_modules` for it. `iCloud` won't synchronize a file or folder which is end of `.nosync`, and, this don't have any side effect to your project, you can still use `npm install`.

```bash
mkdir node_modules.nosync && ln -s node_modules.nosync node_modules
```

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/nosync.png" />

But this is not a best practice, so when you search for the keywords `iCloud`, `node_modules` in Google, you will find a lot of people complaining about that, i am one of them, and gave feedback to Apple, but Apple doesn't seems care about this problem.

### The responsibility of a Web Developers!

Should we settle with the status quo? In fact, the command line above can be made into an executable file, so that we can only execute a short command when we need to avoid `node_modules` syncing with `iCloud`. Think about some familiar `CLI` tools that we install by `npm`, such as `vue init`, `create-react-app`, `nodemon`, etc., as a Web Developers, it's time to do something. So, here comes the **nosync-icloud** .👏👏👏🎉🎉🎉

### Let me show you !

##### 1. Installation

```bash
npm i -g nosync-icloud
# or
yarn global add nosync-icloud
```
you'll get `nosync` and `ns` （for short）global command after installation.

##### 2. Usage

Go to the any project in `iCloud Drive`, open it in terminal and run `ns`. The `ns` command will analyze your directory, and handle the `node_modules` automatically, if you haven't install `node_modules` yet, it will provides three chioces for you —— `npm`、`yarn`、`cnpm`, of course, you can choose handle that yourself later. After Installation, It will prompt you whether to add `node_modules*` to `.gitignore`.

<img src="https://github.com/HaoChuan9421/nosync-icloud/raw/master/assets/terminal_en.png" />

##### 3. More options

`nosync-icloud` can not only  avoid `node_modules` to sync with `iCloud`, but also any folder that you don't want to synchronize with `iCloud` by using `ns -f foo` to specify it.

Options | Abbreviation | Description
---|---|---
--version | -v | output the version number
--help | -h | output usage information
--folder | -f | specify a folder that you do not want to sync. default: `node_modules` e.g.  `ns -f foo`.
--git | -g | whether to automatically add `.gitignore`. e.g. `ns -g false`, skip prompt and don't add `.gitignore`.

### Conclusion

Hope `ns` can bring convenience to you, maybe the first thing your do with your project is not `npm install` or `yarn` anymore, but, `ns` instead . If your have any problem or suggestion, `Issue` and `PR` are welcome. I am not a native English speaker, if you found any typo or grammatical errors, feel free to make a `PR`.
