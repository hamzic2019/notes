const notes = require('./notes.js');
const yargs = require('yargs'); //

let _ = console.log;

// Answer on command add
yargs.command({
    command: 'add',
    describe: 'Adding new Note into DB',
    builder: {
        title: {
            describe: 'What is Note title',
            demandOption: true,
            type: 'string'
        },
        content: {
            describe: 'What is Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title, content}) => {
        notes.addNote(title,content)
    }

})

yargs.command({
    command: 'rm',
    describe: 'Removing specific note from DB/JSON file',
    builder: {
        title: {
            describe: 'Enter Note\'s name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title}) => {
        notes.removeNote(title);
    }
})

yargs.command({
    command: 'print',
    describe: 'Printing all notes',
    handler: () => {
        notes.printNotes();
    }
})

yargs.parse();
