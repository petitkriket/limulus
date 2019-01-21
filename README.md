![](https://static.thenounproject.com/png/7090-200.png)

# Limulus

[See demo](http://limulusgame.herokuapp.com)
Horseshoe crabs (or limulus) have developed a super efficient immune system. Their blood is [harvested](https://www.frontiersin.org/articles/10.3389/fmars.2018.00185/full) because it contain a very sensitive compound useful to detect bacterial contamination and has anti-bacterial properties. They are called living fossils has it’s been around for 450M of years and saves millions of human lives every year. It’s blue blood [cost](https://www.businessinsider.com/why-horseshoe-crab-blood-expensive-2018-8?IR=T) \$60k per gallon

# Gameplay possibilities

### Type speed shooting game

Typespeed basic : [https://www.youtube.com/watch?v=ENF_q-rRrcU&t=45s](https://www.youtube.com/watch?v=ENF_q-rRrcU&t=45s)
Typespeed shooting game : [https://www.youtube.com/watch?v=yPFrIADy0nU](https://www.youtube.com/watch?v=yPFrIADy0nU)

1. User type bacterias to make them disappear
2. If user get touched by a bacteria name, gameover
3. More and more bacteria appears
4. Add visual feedback : ray-gun energy, orient the gun towards word position
5. Soundtrack is playing in the background

Words are pulled from a specific dictionary or parsed from a given text.
More and more words arrive, attracted down to player base.

- White cells raygun > type a word to fire the ray-gun towards a word-disease)
- Compare array of word from user inputs and array of visible words
- Several waves (disease to cure).. possible changing background..
- If gun is touched : game is over
- High score table using Rails CRUD (later NodeJS)

### Flow version

- Move a ball towards other bacterias, grow and grow as you eat them
- If you touch a bigger one, get tinier until you disappear [see here.](https://www.youtube.com/watch?v=vzKoJiD_zY0)
- Could be done using [SVG.js](https://jsfiddle.net/wout/7wL1uv8n/?utm_source=website&utm_medium=embed&utm_campaign=7wL1uv8n) along with strings

### Tunnel shooter game

Fantasic Voyage Atari game :[https://www.youtube.com/watch?v=Mc0QzqznODw](https://www.youtube.com/watch?v=Mc0QzqznODw)
Same version but actual shooting game.. not enough time

## Level design

The game is set within the human body. A seahorse crab shaped gun would shoot name of bacteria as they arrive in order to clean and heal the host.
As it's within an actual body, it's kind of low light environnement with flowing organisms, as inside deep water. We would hear some repetitive music, close to heart beat, muted as into the water.

## References

**Fantastic Voyage** (1966) A classic sci-fi low budget movie based on Asimov novel. Also an hommage to **Jean Painlevé**, a scientist wanna be artists who made videos about sea creatures, concept of time and space and popular vulgarisation

The mesmerizing, utterly unclassifiable science films of Jean Painlevé (1902-89) have to be seen to be believed: delightful, surrealist-influenced dream works that are also serious science. The French filmmaker-scientist-inventor had a decades-spanning career in which he created hundreds of short films on subjects ranging from astronomy to pigeons to, most famously, such marine-life marvels as the sea horse and the sea urchin. _(The Criterion)_

![](https://lh4.googleusercontent.com/lfu_QHHfAmxuOp2Le3z-VjK61nsZCxVwhRHhF_S_lvw5wXhu9b200vmYsyZI0j6A0oSLEyARxoOJtUaVJRJKN9CWVUrDUEsBKSbyIL0TO9I_YHQFNeLzWhNdMEu_K7oQI0GRCMs4)
![](http://jeanpainleve.org/sites/default/files/2017-05/archivesjeanpainleve_header22x16_4_50.jpg)
![Fantastic Voyage](https://i.imgur.com/t9MuMN1.jpg)
![](https://www.myabandonware.com/media/screenshots/b/bubble-bobble-8bf/bubble-bobble_4.gif)

- A background full of particle to give a sense of thickness done with Particle JS:[here](https://codepen.io/petitkriket/pen/WLVRrG?editors=0010)
- Particles video backgrounds : [1](https://www.youtube.com/watch?v=KzyUrGrvChg), [2](https://www.youtube.com/watch?v=LlsI5QvtSvU), [3](https://www.youtube.com/watch?v=iGpuQ0ioPrM), [4](https://www.youtube.com/watch?v=wsGXab0ogjY), [5](https://www.youtube.com/watch?v=ztjHO_2px3M), [6](https://www.youtube.com/watch?v=ar5ZLjqrMRI)

- Inside body red cell flow [loop](https://www.youtube.com/watch?v=Lr4zq0m5U7U)
- A surreal photograph taken Painlevé from [Glitterman Gallery](https://gittermangallery.com/images/21313_h2048w2048gt.5.jpg)

### Sound Design

Jeff Mills musical theme of Fantastic Voyage commissioned by Cinémathèque Française and Cité de la Musique in 2009 [here](https://www.youtube.com/watch?v=oHkIrYEmjyo) to give a sense of rythm and fasten gameplay pace.

Inside body sound effect, pulsating [here](https://www.youtube.com/watch?v=WqVw9xgULLU)

## Credits

TODO

## License

TODO
