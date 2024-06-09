#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .demandCommand(1)
  .parse()
