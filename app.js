

const inquirer = require('inquirer');const fs = require('fs');
const generatePage = require('./src/page-template');
// const pageHTML = generatePage(name, gitHub);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log("portfolio complete! Check out the index.html to see the output");
// })

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));