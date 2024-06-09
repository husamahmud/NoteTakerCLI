import fs from 'fs/promises'

const DB_PATH = new URL('../db.json', import.meta.url).pathname

/**
 * Get the database from the file system
 * @returns {Promise<Object>} The database object
 **/
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(db)
}

/**
 * Save the database to the file system
 * @param {Object} db The database object to save
 * @returns {Promise<Object>} The database object
 * */
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
  return db
}

/**
 * Insert a note into the database
 * @param {Object} note The note to insert
 * @returns {Promise<Object>} The inserted note
 **/
export const insertDB = async (note) => {
  const db = await getDB()
  db.notes.push(note)
  await saveDB(db)
  return note
}
