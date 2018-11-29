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

/**
 * 检测项目当前位置是否在 iCloud 中
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
function createFolder() {
	const basePath = path.join(pwd, program.folder);
	const nosyncPath = basePath + '.nosync';
	const exitBase = fs.existsSync(basePath);
	const exitNosync = fs.existsSync(nosyncPath);

	return new Promise((resolve, reject) => {
		// 1. 已经同时存在两种类型的文件夹，无需额外操作了
		if (exitBase && exitNosync) {
			console.log(chalk.black.bgRed('\n你多虑了!\n'));
			reject();
			return;
		}
		spinner.start();
		if (exitBase) { // 2. 指定的文件夹已存在，重命名为 nosync 型
			fs.rename(basePath, nosyncPath, (err) => {
				if (err) throw err;
				resolve({
					nosyncPath,
					basePath,
				});
			});
		} else if (exitNosync) { // 3. nosync 型文件夹已存在，直接 resolve 
			resolve({
				nosyncPath,
				basePath
			});
		} else { // 4. 都不存在，创建 nosync 型文件夹
			fs.mkdir(nosyncPath, (err) => {
				if (err) throw err;
				resolve({
					nosyncPath,
					basePath,
					install: true
				});
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

	if (String(program.git) === 'true') {
		add();
		return;
	}
	if (String(program.git) === 'false') {
		return;
	}
	inquirer
		.prompt([
			{
				type: 'confirm',
				message: `是否添加 ${program.folder}* 到 .gitignore？`,
				name: 'git'
			}
		])
		.then(answers => {
			answers.git && add();
		});
	// 执行添加操作
	function add() {
		const gitPath = path.join(pwd, '.gitignore');
		const exitGit = fs.existsSync(gitPath);
		if (exitGit) {
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
	.then(() => createFolder())
	.then(res => {
		// 检测过文件位置并创建 nosync 型文件夹后 制作替身
		fs.symlinkSync(res.nosyncPath, res.basePath, 'file');
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