
# Limulus

  

![](https://static.thenounproject.com/png/7090-200.png)

  

[Play](http://limulusgame.herokuapp.com)

  

Horseshoe crabs (or limulus) have developed a super efficient immune system. Their blood is [harvested](https://www.frontiersin.org/articles/10.3389/fmars.2018.00185/full) because it contain a very sensitive compound useful to detect bacterial contamination and has anti-bacterial properties. They are called living fossils has it’s been around for 450M of years and saves millions of human lives every year. It’s blue blood [cost](https://www.businessinsider.com/why-horseshoe-crab-blood-expensive-2018-8?IR=T) \$60k per gallon

  

# Gameplay possibilities

  

### Type speed shooting game

  

Typespeed basic idea [here](https://www.youtube.com/watch?v=ENF_q-rRrcU&t=45s)

  

Typespeed shooting game visally enhanced : [here](https://www.youtube.com/watch?v=yPFrIADy0nU)

  

1. User type bacterias to make them disappear
2. If user get touched by a bacteria name, gameover
3. More and more bacteria appears
4. Add visual feedback : ray-gun energy, orient the gun towards word position
5. Soundtrack is playing in the background
6.  If bottom is reached by a word : game is over, YOLO
7. High score table using Rails CRUD (later NodeJS)

## Level design

  

The game is set within the human body. A horseschoe crab shaped gun would shoot name of bacteria as they arrive in order to clean and heal the host.

  

As it's within an actual body, it's kind of low light environnement with flowing organisms, as inside deep water. We would hear some repetitive music, close to heart beat, muted as into the water.

  

Kind of soft and easy shooting game at the begining which turn to survival horror as enemies number increases and the patient condition get worse. Because at some point, everybody dies, games ends when bacterias opponents swarm and overwhelm the body immune defense (everybody dies eventually) 👻

  

### Sound Design
Jeff Mills musical theme of Fantastic Voyage commissioned by Cinémathèque Française and Cité de la Musique in 2009 [here](https://www.youtube.com/watch?v=oHkIrYEmjyo) to give a sense of rythm and fasten gameplay pace.

 
Inside body sound effect, pulsating [throbbing](https://www.youtube.com/watch?v=WqVw9xgULLU)

  

## Prototyping
![](http://samuelbouaroua.fr/limulus.png)

  ## Features List
  ### Basic game implementation (MVP)
- ~~create canvas and html~~
- ~~position four words first~~
- typing and check match on submit
- remove matching words (kills)
- add points and update score
- ~~words moving~~
- ~~add ray canon gun image~~
- bacteria appear randomly on top
-  game over when bacteria reached bottom
- words parsed from a text
- closing screen and reset
- events dispatch
### Extras 
- gun alignement
- opening titles screen
- background music
- hit sound fx on destroy
- ~~glowing particles and depth~~``
- particles flowing down (simulate speed)
- bacterias icons
- increasing difficulty (words length rising)
- health points management
- dynamic input monitoring
- form validation style
- gun animation on match

 **Planning** 
 minimum 4 tasks a day
Daily agile meeting

## References
**Fantastic Voyage** (1966) A classic sci-fi low budget movie after an Isac Asimov novel. Also an hommage to **Jean Painlevé**, a scientist wanna be artists who made videos about sea creatures, concept of time and space and popular vulgarisation

The mesmerizing, utterly unclassifiable science films of Jean Painlevé (1902-89) have to be seen to be believed: delightful, surrealist-influenced dream works that are also serious science. The French filmmaker-scientist-inventor had a decades-spanning career in which he created hundreds of short films on subjects ranging from astronomy to pigeons to, most famously, such marine-life marvels as the sea horse and the sea urchin. _(The Criterion)_

![](https://lh4.googleusercontent.com/lfu_QHHfAmxuOp2Le3z-VjK61nsZCxVwhRHhF_S_lvw5wXhu9b200vmYsyZI0j6A0oSLEyARxoOJtUaVJRJKN9CWVUrDUEsBKSbyIL0TO9I_YHQFNeLzWhNdMEu_K7oQI0GRCMs4)

![](https://www.pastposters.com/cw3/assets/product_full/JamieR-EW/4-sheets/existenz-cinema-4-sheet-movie-poster-%28teaser-1%29.jpg)

![](http://jeanpainleve.org/sites/default/files/2017-05/archivesjeanpainleve_header22x16_4_50.jpg)

  

![Fantastic Voyage](https://i.imgur.com/t9MuMN1.jpg)

![](https://www.myabandonware.com/media/screenshots/b/bubble-bobble-8bf/bubble-bobble_4.gif)

**Possible color schemes**
All white and minimal (modern medicine)
Orange and blue (friendly contrast)
Tints of red dimmed light (organic)

**Background**
- A background full of particle to give a sense of thickness done with Particle JS:[here](https://codepen.io/petitkriket/pen/WLVRrG?editors=0010)
- Particles video backgrounds : [1](https://www.youtube.com/watch?v=KzyUrGrvChg), [2](https://www.youtube.com/watch?v=LlsI5QvtSvU), [3](https://www.youtube.com/watch?v=iGpuQ0ioPrM), [4](https://www.youtube.com/watch?v=wsGXab0ogjY), [5](https://www.youtube.com/watch?v=ztjHO_2px3M), [6](https://www.youtube.com/watch?v=ar5ZLjqrMRI)
- Inside body red cell flow [loop](https://www.youtube.com/watch?v=Lr4zq0m5U7U)
- A surreal photograph taken Painlevé from [Glitterman Gallery](https://gittermangallery.com/images/21313_h2048w2048gt.5.jpg)
  

## Credits
