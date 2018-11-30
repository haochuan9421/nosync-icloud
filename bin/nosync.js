#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');

const pwd = process.cwd(); // 当前目录
const spinner = ora('转化中 🐢 ...\n');

program
  .version(require('../package').version, '-v, --version')
  .option('-f, --folder [name]', '禁止同步的[文件夹名]', 'node_modules')
  .option('-g, --git [boolean]', '是否自动添加 .gitignore')
  .parse(process.argv);

const basePath = path.join(pwd, program.folder); // 用户期望不同步的文件夹的路径，默认是当前目录下的 node_modules
const nosyncPath = basePath + '.nosync'; // 同名的 nosync 型文件夹的路径

/**
 * 检测项目当前位置是否在 iCloud 中（用户并不一定会将桌面和文稿也同步到 iCloud，给个友情提示）
 */
function checkPwd() {
  return new Promise((resolve, reject) => {
    if (/com~apple~clouddocs/i.test(pwd)) {
      resolve({ continue: true });
    } else {
      inquirer
        .prompt([
          {
            type: 'confirm',
            message: '检测到你当前的项目不在 iCloud 中，是否继续？',
            name: 'continue'
					}
				])
        .then(answers => {
          answers.continue ? resolve(answers) : reject(answers);
        })
        .catch(error => {
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
  const baseExist = fs.existsSync(basePath); // 期望的路径是否已占用
  const nosyncExist = fs.existsSync(nosyncPath); // 期望的 nosync 路径是否已占用
  const baseIsDirectory = baseExist && fs.lstatSync(basePath).isDirectory(); // 期望的路径是否已存在文件夹

  return new Promise((resolve, reject) => {
    if (baseExist && nosyncExist) { // 1. 同时存在，提示用户无需额外操作
      spinner.stop();
      console.log(chalk.black.bgRed('\n你多虑了!\n'));
      reject();
    } else if (!baseExist && nosyncExist) { // 2. 只存在 nosync，直接 resolve 后制作替身
      resolve({ install: false });
    } else if (baseExist && baseIsDirectory) { // 3. 指定的文件夹已存在，重命名为 nosync 型
      fs.rename(basePath, nosyncPath, (err) => {
        if (err) throw err;
        resolve({ install: false });
      });
    } else if (baseExist && !baseIsDirectory) { // 4. 之前创建过快捷方式，删除快捷方式并创建空的 nosync 型文件夹
      fs.unlinkSync(basePath);
      fs.mkdir(nosyncPath, (err) => {
        if (err) throw err;
        resolve({ install: true });
      });
    } else { // 5. 都不存在，创建 nosync 型文件夹
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
        type: 'list',
        message: '请选择安装 node_modules 的方式？',
        choices: [
					'yarn',
					'npm',
					'cnpm',
					'暂不安装'
				],
        name: 'install'
			}
		])
    .then((res) => {
      let command = '';
      switch (res.install) {
        case 'yarn':
          command = 'yarn';
          break;
        case 'npm':
          command = 'npm install';
          break;
        case 'cnpm':
          command = 'cnpm install';
          break;
        default:
          break;
      }
      // 执行安装命令并输出到控制台
      command && require('child_process').execSync(command, { stdio: [0, 1, 2] });
      // 输出成功提示并提示是否将文件夹添加到 .gitignore
      addGitignore();
    });
}

/**
 * 添加忽略规则到 .gitignore
 */
function addGitignore() {
  console.log(chalk.green(`\n大功告成，文件夹 ${program.folder} 将不再同步到 iCloud 👏 👏 👏\n`));

  // 如果用户已通过命令行指定是否添加到 git，则不再提示
  if (String(program.git) === 'true') {
    add();
    return;
  }
  if (String(program.git) === 'false') {
    return;
  }
  // 提示用户是否添加忽略规则到 .gitignore
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: `是否添加 ${program.folder}* 到 .gitignore？`,
        name: 'add'
			}
		])
    .then(answers => {
      answers.add && add();
    });
  // 执行添加操作
  function add() {
    const gitPath = path.join(pwd, '.gitignore');
    const gitExist = fs.existsSync(gitPath);
    if (gitExist) {
      fs.appendFile('.gitignore', `\n${program.folder}*\n`, (err) => {
        if (err) throw err;
        console.log(chalk.green('\n添加 .gitignore 成功\n'));
      });
    } else {
      fs.writeFile('.gitignore', `.DS_Store\n${program.folder}*\n`, (err) => {
        if (err) throw err;
        console.log(chalk.green('\n添加 .gitignore 成功\n'));
      });
    }
  }
}

checkPwd()
  .then(() => createNosyncFolder())
  .then(res => {
    // 为 nosync 文件夹制作替身
    fs.symlinkSync(nosyncPath, basePath, 'file');
    // 结束进程指示器
    spinner.stop();
    // 如果 指定的 nosync 文件夹是 node_modules 并且 之前不存在 node_modules，则提示用户安装
    if (program.folder === 'node_modules' && res.install) {
      install();
    } else {
      // 输出成功提示并提示是否将文件夹添加到 .gitignore
      addGitignore();
    }
  })
  .catch(() => {
    process.exit();
  });