#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNote,
  removeNote,
} from './src/notes.js'
import { listNotes } from './src/utils.js'
import { getDB } from './src/db.js'

// Init yargs with process.argv to parse command line arguments
yargs(hideBin(process.argv))
  /**
   * Create a new note
   * Usage: note new "This is a new note" -t "tag1,tag2"
   **/
  .command('new <note>', 'create a new note', yargs => {
    return yargs.positional('note', {
      describe: 'The content of the note you want to create',
      type: 'string',
    })
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',') : []
    const note = await newNote(argv.note, tags)
    console.log('New note!', note)
  })
  /**
   * Options for new note command
   **/
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note',
  })
  /**
   * Get all notes
   * Usage: note all
   **/
  .command('all', 'get all notes', () => {}, async (argv) => {
    const db = await getDB()
    listNotes(db.notes)
  })
  /**
   * Find notes by filter
   * Usage: note find "search term"
   **/
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string',
    })
  }, async (argv) => {
    const matched = await findNotes(argv.filter)
    if (matched.length === 0) {
      console.log('Note not found!')
      return
    }
    listNotes(matched)
  })
  /**
   * Remove a note by id
   * Usage: note remove 1
   **/
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove',
    })
  }, async (argv) => {
    const id = await removeNote(argv.id)
    if (!id) return

    console.log(id)
  })
  /**
   * Launch a website to see notes
   * Usage: note web 5000
   **/
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number',
      })
  }, async (argv) => {

  })
  /**
   * Remove all notes
   * Usage: note clean
   **/
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAllNote()
    console.log('DB reseted')
  })
  .demandCommand(1)
  .parse()
