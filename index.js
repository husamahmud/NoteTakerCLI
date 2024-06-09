#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

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

  })
  .demandCommand(1)
  .parse()
