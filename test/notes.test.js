import { jest } from '@jest/globals'

// Mock the database module and define mock implementations for its methods
jest.unstable_mockModule('../src/db.js', () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}))

const { insertDB, getDB, saveDB } = await import('../src/db.js')
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js')

// Reset mocks before each test to clear previous test states and ensure independent tests
beforeEach(() => {
  insertDB.mockClear()
  getDB.mockClear()
  saveDB.mockClear()
})

test('newNote inserts data and returns it', async () => {
  const note = {
    id: Date.now(),
    content: 'TEST NOTE',
    tags: ['TEST'],
  }
  insertDB.mockResolvedValue(note)

  const result = await newNote(note.content, note.tags)
  expect(result).toEqual(note)
  // expect(result.tags).toEqual(note.tags)
})

test('getAllNotes returns all notes', async () => {
  const db = {
    notes: ['note1', 'note2', 'note3'],
  }
  getDB.mockResolvedValue(db)

  const result = await getAllNotes()
  expect(result).toEqual(db.notes)
})

test('removeNote does nothing if id is not found', async () => {
  const notes = [
    { id: 1, content: 'note 1' },
    { id: 2, content: 'note 2' },
    { id: 3, content: 'note 3' },
  ]
  saveDB.mockResolvedValue(notes)

  const idToRemove = 4
  const result = await removeNote(idToRemove)
  expect(result).toBeNull()
})

// Other test syntax
it('should do this thing', () => {})
