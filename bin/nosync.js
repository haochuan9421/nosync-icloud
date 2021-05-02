#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const program = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const updateNotifier = require("update-notifier");
const osLocale = require("os-locale");

const pwd = process.cwd(); // 当前目录
const pkg = require("../package");

const locales = require("../locales/index.js"); // 语言包
const locale = osLocale
  .sync()
  .replace(/(_|-).*/, "")
  .toLowerCase(); // 用户的语言环境
const i18n = locales[locale] ? locales[locale] : locales["en"];

const spinner = ora("转化中 🐢 ...\n");

program
  .version(pkg.version, "-v, --version")
  .option("-f, --folder [name]", i18n.folder, "node_modules")
  .option("-g, --git [boolean]", i18n.git)
  .parse(process.argv);

const basePath = path.join(pwd, program.folder); // 用户期望不同步的文件夹的路径，默认是当前目录下的 node_modules
const nosyncPath = basePath + ".nosync"; // 同名的 nosync 型文件夹的路径

// 检测 npm 版本，提示用户更新

updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60, // 每小时
}).notify();

checkPwd()
  .then(() => createNosyncFolder())
  .then((res) => {
    // 为 nosync 文件夹制作替身
    fs.symlinkSync(nosyncPath, basePath, "file");
    // 结束进程指示器
    spinner.stop();
    // 如果 指定的 nosync 文件夹是 node_modules 并且 之前不存在 node_modules，则提示用户安装
    if (program.folder === "node_modules" && res.install) {
      install();
    } else {
      // 输出成功提示并提示是否将文件夹添加到 .gitignore
      addGitignore();
    }
  })
  .catch(() => {
    process.exit();
  });

/**
 * 检测项目当前位置是否在 iCloud 目录中（有些用户可能使用 iCloud 同步桌面和文稿，给个友情提示）
 */
function checkPwd() {
  return new Promise((resolve, reject) => {
    if (/com~apple~clouddocs/i.test(pwd)) {
      resolve({ continue: true });
    } else {
      inquirer
        .prompt([
          {
            type: "confirm",
            message: i18n.pwd,
            name: "continue",
          },
        ])
        .then((answers) => {
          answers.continue ? resolve(answers) : reject(answers);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

/**
 * 创建 .nosync 文件夹
 */
function createNosyncFolder() {
  spinner.start();
  const baseExist = fs.existsSync(basePath); // 期望的路径是否存在（如果该路径是 SymbolicLink, 则该方法实际检测的是它链接的地址是否已存在）
  const nosyncExist = fs.existsSync(nosyncPath); // 期望的 nosync 路径是否存在
  const baseIsDirectory = baseExist && fs.lstatSync(basePath).isDirectory(); // 期望的路径是否是文件夹

  return new Promise((resolve, reject) => {
    if (baseExist && nosyncExist) {
      // 1. 同时存在，如果是 node_modules 则提示用户是否再次安装包，否则退出
      spinner.stop();
      if (program.folder === "node_modules") {
        install();
      } else {
        console.log(chalk.yellow(i18n.existTip(program.folder)));
        reject();
      }
    } else if (!baseExist && nosyncExist) {
      // 2. 只存在 nosync，直接 resolve 后制作替身
      // basePath 可能存在无效的 SymbolicLink，这种情况的概率很低，但不删除的话会导致之后调用 fs.symlinkSync() 报错
      try {
        fs.unlinkSync(basePath);
        console.log(i18n.removeTip(program.folder));
      } catch (error) {
        // do nothing and keep silence
      }
      resolve({ install: false });
    } else if (baseExist && baseIsDirectory) {
      // 3. 指定的文件夹已存在，重命名为 nosync 型
      fs.rename(basePath, nosyncPath, (err) => {
        if (err) throw err;
        resolve({ install: false });
      });
    } else if (baseExist && !baseIsDirectory) {
      // 4. 指定的是文件而非文件夹
      if (program.folder === "node_modules") {
        fs.unlinkSync(basePath);
        fs.mkdir(nosyncPath, (err) => {
          if (err) throw err;
          resolve({ install: true });
        });
      } else {
        fs.rename(basePath, nosyncPath, (err) => {
          if (err) throw err;
          resolve({ install: false });
        });
      }
    } else {
      // 5. basePath 不存在 或者存在无效的 SymbolicLink
      try {
        fs.unlinkSync(basePath);
        console.log(i18n.removeTip(program.folder));
      } catch (error) {
        // do nothing and keep silence
      }
      fs.mkdir(nosyncPath, (err) => {
        if (err) throw err;
        resolve({ install: true });
      });
    }
  });
}

/**
 * 安装 node_modules
 */
function install() {
  inquirer
    .prompt([
      {
        type: "list",
        message: i18n.installTip,
        choices: ["yarn", "npm", "cnpm", i18n.notInstall],
        name: "install",
      },
    ])
    .then((res) => {
      let command = "";
      switch (res.install) {
        case "yarn":
          command = "yarn";
          break;
        case "npm":
          command = "npm install";
          break;
        case "cnpm":
          command = "cnpm install";
          break;
        default:
          break;
      }
      // 执行安装命令并输出到控制台
      command &&
        require("child_process").execSync(command, { stdio: [0, 1, 2] });
      // 输出成功提示并提示是否将文件夹添加到 .gitignore
      addGitignore();
    });
}

/**
 * 添加忽略规则到 .gitignore
 */
function addGitignore() {
  console.log(chalk.green(i18n.successTip(program.folder)));

  // 如果用户已通过命令行指定是否添加到 git，则不再提示
  if (String(program.git) === "true") {
    add();
    return;
  }
  if (String(program.git) === "false") {
    return;
  }
  // 提示用户是否添加忽略规则到 .gitignore
  inquirer
    .prompt([
      {
        type: "confirm",
        message: i18n.addTip(program.folder),
        name: "add",
      },
    ])
    .then((answers) => {
      answers.add && add();
    });
  // 执行添加操作
  function add() {
    const gitPath = path.join(pwd, ".gitignore");
    const gitExist = fs.existsSync(gitPath);
    if (gitExist) {
      fs.appendFile(".gitignore", `\n${program.folder}*\n`, (err) => {
        if (err) throw err;
        console.log(chalk.green(i18n.addSuccessTip));
      });
    } else {
      fs.writeFile(".gitignore", `.DS_Store\n${program.folder}*\n`, (err) => {
        if (err) throw err;
        console.log(chalk.green(i18n.addSuccessTip));
      });
    }
  }
}
