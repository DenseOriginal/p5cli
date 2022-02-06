#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { exec } from "child_process";
import { rmdirSync, readFileSync } from 'fs';
let packageConfig = JSON.parse(readFileSync('./package.json', 'utf-8'));

async function bootstrap() {
  const answer = await inquirer.prompt({
    name: 'project_name',
    type: 'input',
    message: 'What is the name of this sketch?'
  });

  projec_name = answer.project_name.replaceAll(' ', '-');

  console.log(chalk.green.bold("✓ ") + chalk.white(`Creating new p5.js project in ${chalk.white.bold(project_name)}`));
  await execAsync(`git clone https://github.com/DenseOriginal/p5js-boilerplate ${project_name}`);
  rmdirSync(`./${project_name}/.git`, { recursive: true });
  console.log(chalk.green.bold("✓ ") + chalk.white(`Installing packages`));
  await execAsync(`npm install --prefix ${project_name}`);
  console.log(chalk.green.bold("✓ ") + chalk.white(`Successfully created empty project in ${chalk.white.bold(project_name)}`));
}

const command = process.argv[2] || 'help';

switch (command) {
  case "help":
    console.log(chalk.white(`Unofficial p5.js CLI tool!`));
    console.log(chalk.white("With it you can easily bootstrap new p5.js sketches using just your command line.\n"));
    console.log(chalk.white("Here's a list of all available commands:"));
    console.log(chalk.white("    p5cli new"));
    break;
  case "-v":
  case "--version":
    console.log(`p5.js CLI Version: ${packageConfig.version}`);
    break;
  case "new":
    bootstrap();
    break;
}

const execAsync = (cmd) => new Promise((r) => exec(cmd).on('close', r));