#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirier = require('./lib/inquirier');
const { promises: fs } = require('fs');

console.log(chalk.yellow(figlet.textSync('fml', { horizontalLayout: 'full' })));

const componentTemplate = (compName) =>
  `
    import * as React from 'react';
    import styles from './${compName}.module.scss';

    export const ${compName}Data = (postType = 'Post') => \`\`

    type ${compName}Props = {};

    const ${compName} = ({}: ${compName}Props) => {
      return (<></>)
    }

    export default ${compName}
  `;

const run = async () => {
  const compDetails = await inquirier.createNewComponent();

  if (compDetails.compName.length) {
    const { compName } = compDetails;

    if (!files.directoryExists('components')) {
      const dir = await fs.mkdir('components');
    }

    if (!files.directoryExists(`components/${compName}`)) {
      const dir = await fs.mkdir(`components/${compName}`);
    }

    if (files.directoryExists(`components/${compName}/${compName}.tsx`)) {
      console.log(chalk.red(`${compName} already exists!`));
      process.exit();
    }

    const file = await fs.writeFile(
      `components/${compName}/${compName}.tsx`,
      componentTemplate(compName),
    );

    const scssFile = await fs.writeFile(
      `components/${compName}/${compName}.module.scss`,
      '',
    );
  }
};

run();
