# Użycie

`./fetch_book_info.js`

Wyświetla pomoc

`./fetch_book_info.js -t "Busem przez świat. Wyprawa pierwsza" -a "Karol Lewandowski" -f books.json`

Przykładowe użycie. Dopisuje informacje o książce do pliku books.json

`./fetch_book_info.js -t "Chłopcy" -a "Jakub Ćwiek" --display`

Przykładowe użycie. Wyświetla informacje o książce

# Zwracane informacje

```javascript
{ image: 'http://az761721.vo.msecnd.net/images/cdn/84171/84171_w240.png',
  author: 'Jakub Ćwiek',
  price: 27.92,
  url: 'http://www.legimi.com//pl/ebook-dreszcz-2-facet-w-czerni-jakub-cwiek,b84171.html',
  title: 'Dreszcz 2. Facet w czerni',
  pages: 270,
  description: 'Kontynuacja głośnego przeboju.  Dreszcz potrzebuje muzyki, by ogarnąć wszystko, co dzieje się wokół niego. Potrzebuje naprawdę ostrego grania.  Oprócz codziennej walki z kacem i urwanym filmem musi ścierać się z najbardziej przerażającymi tworami śląskiego półświatka: węglowymi zombie, mikołowską mafią, a nawet... z rzeźnikiem z Sosnowca. W niebanalnym zadaniu pomagają mu: kumpel emeryt, młodociany kamerdyner, i paru herosów. W tym... super-żule  z katowickiego dworca i jedyny prawdziwy Polak. W dodatku czarny.  Są pieniądze, są kebaby i jest nowa kapela - żyć nie umierać.  Przewrotny (prawie) komiks Ćwieka o  superbohaterach w trudnych czasach fejsa, słitfoci i Łan Dajrekszon.',
  stars: 4.3 }
```