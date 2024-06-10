import { getDB, saveDB, insertDB } from './db.js'

/**
 * newNote - Create a new note
 * @param {string} note - The content of the note
 * @param {string[]} tags - The tags of the note
 * @returns {Promise<object>} - The new note
 **/
export const newNote = async (note, tags) => {
  const newNote = {
    id: Date.now(),
    content: note,
    tags,
  }

  await insertDB(newNote)
  return newNote
}

/**
 * getAllNotes - Get all notes
 * @returns {Promise<object[]>} - All notes
 **/
export const getAllNotes = async () => {
  try {
    const db = await getDB()
    if (!db || !Array.isArray(db.notes)) {
      console.error('Warning: No notes found.')
      return []
    }
    return db.notes
  } catch (error) {
    console.error('Failed to retrieve notes:', error.message)
    return []
  }
}

/**
 * findNotes - Find notes by query
 * @param {string} query - The query to search
 * @returns {Promise<object[]>} - The notes that match the query
 **/
export const findNotes = async (query) => {
  const { notes } = await getDB()
  return notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()))
}

/**
 * removeNote - Get a note by id
 * @param {number} id - The id of the note
 * @returns {Promise<number|null>} - The id of the removed note or null if not found
 **/
export const removeNote = async (id) => {
  const notes = await getDB()
  const match = notes.find(note => note.id === id)

  if (!match) return null

  const newNotes = notes.filter(note => note.id !== id)
  await saveDB({ notes: newNotes })
  return id
}

/**
 * removeAllNote - Remove all notes
 * @returns {Promise<Object>}
 **/
export const removeAllNote = async () => {
  return await saveDB({ notes: [] })
}
