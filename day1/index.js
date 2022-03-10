const fs = require('fs');

const { Command } = require('commander');
const program = new Command();

const FILE_PATH = './db.json';
const ENCODING = 'utf8';

function myParseInt(value) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new commander.InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }

program
    .name('ToDo-Manager')
    .version('1.0.0')
    .description('CLI Handler for TODO-list');
;
program.command('add')
    .description('Insert a new user')
    .requiredOption("-n,--name <string>")
    .requiredOption("-a,--age <number>")
    .action((options) => console.table(addUser(options)));

program.command('update')
    .description('Update existence user')
    .argument('<id>', 'index of user')
    .requiredOption("-n,--name <string>")
    .requiredOption("-a,--age <number>", 'integer argument',myParseInt)
    .action((arguments,options) => console.table(updateUser(arguments,options)));

program.command('list')
    .description('Retreive all users')
    .action(()=> console.table(getAllUsers()));

program.command('show')
    .description('Retreive a specific user by index')
    .argument('<id>', 'index of user')
    .action((arguments) => console.table(getUser(arguments)));

program.command('delete')
    .description('Delete a specific user by index')
    .argument('<id>', 'index of user')
    .action((arguments) => console.table(deleteUser(arguments)));

program.parse();

//TODO To be implemented by array_map to do operations using object.id , define class for product

function getAllUsers() { return JSON.parse(fs.readFileSync(FILE_PATH, ENCODING)); }

function getUser(index) { return getAllUsers()[index] }

function addUser(user) {
    user.age = +user.age;
    console.log(user);
    let data = getAllUsers();
    data.push(user);
    dataWriter(data)
    return user;
    ;
}
function dataWriter(data){
    fs.writeFileSync(FILE_PATH,JSON.stringify(data,null, 2), ENCODING)
}

function updateUser(index, user) {
    let currentData = getAllUsers();
    user.age = +user.age;
    currentData[index] = user;
    dataWriter(currentData)
    return getUser(index);
}

function deleteUser(index) {
    let currentData = getAllUsers();
    currentData.splice(index, 1);
    dataWriter(currentData)
    console.log( `Index #${index} deleted`);
    return getAllUsers();
}

