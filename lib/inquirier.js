const inquirer = require('inquirer');

module.exports = {
  createNewComponent: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        name: 'compName',
        type: 'input',
        message: 'Enter Component Name',
        default: argv._[0] || 'componentName',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a component name';
          }
        },
      },
    ];

    return inquirer.prompt(questions);
  },
};
