#!/usr/bin/env node

'use strict';

const books = require('./books.json');

let stats = {
  pages: 0,
  price: 0,
  count: books.length,
  paid: 24 * 44.99,
  diff: 0
};

books.forEach(item => {
  stats.pages += item.pages ? parseInt(item.pages, 10) : 0;
  stats.price += parseFloat(item.price);
});
stats.diff = stats.price - stats.paid;

console.log('Liczba książek:', stats.count);
console.log('Liczba stron:', stats.pages);
console.log('Cena:', stats.price.toFixed(2), 'PLN');
console.log('Koszt abonamentu:', stats.paid.toFixed(2), 'PLN');
console.log('Oszczędność:', stats.diff.toFixed(2), 'PLN');
