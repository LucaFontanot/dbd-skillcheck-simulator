!! This project has been taken from the now unmaintained official https://github.com/trekkspace/dbd-skillcheck-simulator  and updated to fit the new changes



# Dead by Daylight Skillcheck Simulator
Dead by Daylight Skillcheck Simulator - Train your skills. 
Killer perks, items and add-ons that can affect the Skillcheck in any way can be tested and learned here.

## Website
Visit https://dbd.lucaservers.com to play.

## Known issues

- Sometimes, if changing game mode too fast, skillchecks can do wierd things and stop working. Just reload the page if this happen

## Perks

The Killer Perks can be activated/deactivated using **CUSTOM** mode from the **GAME MODE** menu. Selecting **CUSTOM** mode, will activate the selected perks at the maximum tier or at the maximum number of tokens(Hex: Huntress Lullaby). 
There are 3 preset mode **EASY** **MEDIUM** **HARD**
#### Killer perks:
  - Hex: Ruin - **Version 2.6.0** *(got nerfed in **Version 3.5.0**)* 
    - Good Skill Checks result in 3/4/5 % regression on the Generator.
    - Great Skill Checks grant 0 % bonus progression on the Generator.
  - Hex: Huntress Lullaby 
    - 1 to 4 Tokens: Time between the Skill Check warning sound and the Skill Check becomes shorter.
    - 5 Tokens: No Skill Check warning.
  - Unnerving Presence
    - Triggered Skill Checks' success zones are reduced by 40/50/60 %. 
  - Oppression
    - A hard Skill Check is made after killer kicks a generator
  - Coulrophobia
    - Increases the Rotation speed of Skill Checks by +50 %
#### Survivor perks:
  - This is not happening
    - Increase the great area when injured
  - Fast Track
    - Set how many tokens to simulate a real game scenario
    - Each token gives you 1% of progress on successful Great Skill Check
  - Stake out
    - Consume a token to turn a good Skill Check into a Great Skill Check
  - Hyperfocus
    - For each Token, the following stack-able effects are applied:
      - Increases the Skill Check Rotation speed by +4 % per Token. 
      - Increases the Skill Check Bonus progression by 10/20/30 % of its base value per Token.

## Toolboxes 
The Toolbox is an item that can be used to repair generators more quickly. Different Toolboxes have different uses and not all of them are good for both uses. Add-ons can be equipped to enhance their speed and durability. Toolboxes and add-ons can be bought with bloodpoints. You can gain bloodpoins fast by hitting great skillchecks multiple times. You can gain free Bloodpoints by finding the secret :)


## Local Installation

DBD Skillcheck Simulator requires [Node.js](https://nodejs.org/) v12+ to run
Install the dependencies and start the server.

```sh
$ cd dbd-skillcheck-simulator
$ npm install
$ npm run serve
```
Go to **localhost:8080** to play.
## Changelog

### 0.1.4
- Now audio files preload on page open, so there is no delay when triggering them

### 0.1.3
- Added support for controller

### 0.1.2
- Changed wiggle speed to better match the game
- New perk: Coulrophobia. It should apply only on heals, but the perk is added in generator mode for convenience
- New perk: Hyperfocus
- New perk: Stake out
- New perk: Fast Track
- Added Madness effect to glyph
- Changed madness animation
- Added Madness effect to Wiggle, bcz why not
- Fixed DS Madness
### 0.1.1
- Added Glyph mode
- Added Custom and preset modes
- Added Brand new part
- Added customizable tokens and tiers
- Added the new grade system
- Added Wiggle Skill Check
 
## Contribute

Want to contribute? Great!
This project uses Javascript and VueJS, feel free to improve the project if you found bugs or have other ideeas.


License
----

MIT

