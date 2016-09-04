'use strict';

const fetch = require('node-fetch');
const $ = require('cheerio');
const Promise = require('promise');

const fixUrl = (url) => {
  if(url.substr(0, 2) === '//') {
    url = 'http:' + url;
  } else if(url.substr(0, 1) === '/') {
    url = 'http://www.legimi.com/' + url;
  }
  return url;
};

const fixPrice = price => {
  return parseFloat(price.replace(/[\r\n ]/g, '').replace(',','.').replace('zł', ''));
};

const titleMatch = (titleA, titleB) => {
  let re = /[.,!:]/g;
  let ta = titleA.toLowerCase().replace(re, '');
  let tb = titleB.toLowerCase().replace(re, '');
  return ta === tb;
};

const findBigImageUrlInDiv = $div => {
  let url = $div.find('.listImage img').attr('src');
  url = fixUrl(url);
  url = url.replace('_w120.', '_w240.');
  return url;
};

const findBookDetailsInDiv = $div => {
  let price = fixPrice($div.find('.bookListPrice').text());
  let image = findBigImageUrlInDiv($div);
  let author = $div.find('.bookListAuthor').text();
  let url = fixUrl($div.find('> a').attr('href'));
  return {
    image,
    author,
    price,
    url
  };
};


class BookFinder {
  find(title, author) {
    return new Promise((resolve, reject) => {
      const legimiUrl = 'http://www.legimi.com/pl/ebooki/?szukaj=' + encodeURIComponent(author);
      fetch(legimiUrl, {compress: false})
        .then(res => res.text())
        .then(res => {
          const parsedHtml = $.load(res);
          let found;
          parsedHtml('.bookListTitle').map((i, elm) => {
            let $elm = $(elm);
            let foundTitle = $elm.text();
            if(titleMatch(foundTitle, title)) {
              let $div = $elm.parent().parent();
              found = findBookDetailsInDiv($div);
              found.title = foundTitle;
            }
          });
          if(!found) {
            reject();
          } else {
            this.fetchBookDetails(found)
              .then(book => resolve(book))
              .catch(err => reject(err));
          }
        });
    });
  }

  fetchBookDetails(book) {
    return new Promise((resolve, reject) => {
      fetch(book.url)
        .then(res => res.text())
        .then(res => {
          const parsedHtml = $.load(res);
          parsedHtml('span').filter((i, elm) => {
            let $elm = $(elm);
            let text = $elm.text().trim();
            if(text.indexOf('Liczba stron') !== -1) {
              book.pages = parseInt($elm.children().first().text(), 10);
            }
          });
          book.description = parsedHtml('div[itemprop="description"]').text().trim();
          book.stars = parsedHtml('.rateit').data().rateitValue;
          resolve(book);
        });
    });
  }
}

module.exports = BookFinder;