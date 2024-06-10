import { getDB, saveDB, insertDB } from './db.js'

export const newNote = async (note, tags) => {
  const newNote = {
    id: Date.now(),
    content: note,
    tags,
  }

  await insertDB(newNote)
  return newNote
}

export const getAllNotes = async () => {
  const { notes } = getDB()
  return notes
}

export const findNotes = async (query) => {
  const { notes } = await getDB()
  return notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()))
}

export const removeNote = async (id) => {
  const notes = await getDB()
  const match = notes.find(note => note.id === id)

  if (!match) return null

  const newNotes = notes.filter(note => note.id !== id)
  await saveDB({ notes: newNotes })
  return id
}

export const removeAllNote = () => saveDB({ notes: [] })
