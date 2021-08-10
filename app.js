

const inquirer = require('inquirer');const fs = require('fs');
const generatePage = require('./src/page-template');
const { type } = require('os');
// const pageHTML = generatePage(name, gitHub);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log("portfolio complete! Check out the index.html to see the output");
// })

const promptUser = () => {
return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your gitHub Username (Required)',
            validate: gitHubInput => {
                if(gitHubInput) {
                    return true;
                }
                else {
                    console.log("Please enter gitHub name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if(!portfolioData.projects){
    portfolioData.projects = [];
     };
    console.log(`
    ====================
    Add a New Project
    ====================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the project (Required)',
            validate: projectNameInput => {
                if (projectNameInput){
                    return true;
                }
                else {
                    console.log("Please enter the project name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projDescInput => {
                if(projDescInput){
                    return true;
                }
                else {
                    console.log("Provide a description of the project!");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap']
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: 'false'
        },
        {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to add another project?',
        default: 'false'
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        }
        else {
            return portfolioData;
        };
    });
};

promptUser()
// .then(answers => console.log(answers))
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData)
});
