const fs = require('fs');
const chalk = require('chalk');
const {getBorderCharacters, table} = require('table');
const { TIMEOUT } = require('dns');
let _ = console.log;

let notes = doesExist();

// Adding notes to the JSON/DB
const addNote = (title, content) => {
    if(isDuplicate(title)){
        _(chalk.red.inverse('It\'s already inserted! You can\'t do it twice!'));
    }else {
        _(chalk.blue.inverse('Note is being inserted...'));
        let note = {title, content};
        notes.push(note);
        saveIt();
        printNotes();
    }
}

// Printing all notes from JSON/DB
const printNotes = () => {
    let tempData = doesExist();
    let tempArray = []
        tempArray.push(['No.:', 'Titel', 'Content']);
    
    tempData.forEach((sng, indx) => {
        tempArray.push([++indx, sng.title, sng.content === undefined ? '' : sng.content ])
    })

    const data = tempArray;

      const config = {
        border: getBorderCharacters('ramac'),
        columnDefault: {
            width: 10,
          },
          header: {
            alignment: 'center',
            content: 'Notes\nThis is the notes table',
          },
      };
      
      // with design table(data, config)
      console.log(table(data));

}
// Check if notes.json file Exists then populate notes array if not, than return only [];
function doesExist(){
    try {
        return JSON.parse(fs.readFileSync('./notes.json'));
    }catch(err) {
        return [];
    }
}

// Removing note from JSON/DB
const removeNote = (title) => {
    notes = notes.filter((data) => {
        return data.title !== title;
    })

    saveIt();

    _(chalk.red.bold.inverse('  DELETED  '));
    printNotes();

}

// #####################################33
// Not reachable functions
// Check if note is already in database and return True or False;
const isDuplicate = (e) => {
    return notes.filter((d) => d.title === e).length > 0 ? true : false;
}

// Saving notes and converting it to JSON
function saveIt() {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}


module.exports = {addNote, printNotes,removeNote}