#!/usr/bin/env node

'use strict';

const fs = require('fs');
const argv = require('optimist')
    .usage('Usage: $0 --title TITLE --author AUTHOR [--display] [--file DATAFILE]')
    .boolean('display')
    .demand(['title', 'author'])
    .describe('title', 'exact title of the book')
    .describe('author', 'exact author name')
    .describe('display', 'outpurs book details to console if true')
    .describe('file', 'reads DATAFILE with all book details and appends new record to it')
    .alias('title', 't')
    .alias('author', 'a')
    .alias('display', 'd')
    .alias('file', 'f')
    .default('display', false)
    .argv;

const BookFinder = require('./book-finder');

let booksData = [];
if(argv.file) {
  try {
    booksData = require('./' + argv.file);
  } catch(err) {
    fs.closeSync(fs.openSync(argv.file, 'w'));
  }
}

let service = new BookFinder();
service.find(argv.title, argv.author)
  .then(bookDetails => {
    if(argv.display) {
      console.log(bookDetails)
    }
    if(argv.file) {
      booksData.push(bookDetails);
      fs.writeFileSync(argv.file, JSON.stringify(booksData, null, 4), 'utf8');
    }
  })
  .catch(() => {
    console.error('Book not found');
  })