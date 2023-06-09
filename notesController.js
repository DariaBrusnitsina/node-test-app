const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk");
const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue("Here is the list of notes:"))
    notes.forEach(note => {
        console.log(chalk.gray(note.id), chalk.blue(note.title))
    })
}

async function removeNote(removeId) {
    const notes = await getNotes()
    const filteredNotes = notes.filter(n => n.id != removeId)
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
}

async function updateNote(data) {
    const updatedNote = JSON.parse(data)
    const notes = await getNotes()

    const updatedNotes = notes.map(n => {
        if (n.id === updatedNote.id) {
            n.title = updatedNote.title
        }
        return n
    })
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
}

module.exports = {
    addNote, removeNote, getNotes, updateNote
}