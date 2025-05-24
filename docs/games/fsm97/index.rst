.. meta::
   :description: At the beginning of the game, you will be presented the option to load a game or create a new game. if you select to create a new game, you then select a team t
       
FIFA Soccer Manager 96/97
==================================

At the beginning of the game, you will be presented the option to load a game or create a new game. if you select to create a new game, you then select a team to manage, then after a whistle you arrive the manage screen.

The manage screen is where you manage your team. Except for watching the game, you will be on thus screen. This screen has a lot of information. From top to bottom:

* Current Date
* Balance watch this, if you went to negative, you could be fired if you cannot get back to positive in a short time. 
* Next match Date
* Next match teams and competition: home teams first. competition basically decides how large your bench would be. some leagues only allow 3 backup players but you can use 5 in continental games. 
* Tab buttons
    * Formation here you deal with players
    * Patch here you deal with buildings and ground
    * Balance Sheet here you deal money
    * Fixtures here you look up team performance

Formation

There are two rows of buttons at the bottom of this view. They are all for tabbing purposes showing various aspects of the team. The default tab is the team selection tab.

Team Selection Tab

Here you select the first team and reserve players and give them orders.It has 5 tabs, Formation, Stats, Style, Orders and Biasing. 

Formation

This is the default tab of the Team Selection Tab. In the left is a grid showing the name and attributes of your players. On the right is your formation. The grid has the following columns:

* Position: long click to see the player's stat on each position, click on a position to change. At the beginning of the game, you might have players out of position. If you keep a player out of position, the player might become unhappy and complain, even threaten to retire (but do so very, very rarely).  You cannot change the startup GK's position. 
* Flags. You will see startup and bench at the beginning, as time goes buy, you will also see injured players at the end of the list. 
* Stat how good a player is overall. Because most players would not have good GK skills, GKs are much higher than the rest of players.  High moral also increase stat. 
* POS how good a player is at the position, on paper that is
* Form game readiness. 
* Moral mental energy at the beginning of match. energy decides game performance.
* Energy physical energy. Both training and math cost physical energy and you need a balance between them or risk injuries... Or if you don't consider it cheating you can switch every bench player to GK and train 7 days a week (GKs rarely get injured while training).
* Games games played
* Goals 
* Mom number of player of the game award won

On the right of the grid, there is a vertical area where you can drag players from left grid into. Those are your bench. Different competitions have different rules on the number of bench players you can take to a match. You can also drag players from here to either the left grid (remove from bench) or to the formation to the right (move to starting team). Similarly you can drag players out of the starting team to the bench or to the left grid. 

Stats

This is the second subtab of the Team Selection Tab. The left grid remained but on the right you can see player attributes. There are some attributes with plus sign, which means you can click and expand the column to see details. 

The attributes are the following:

* Move
    * speed: everyone needs speed. front court and wings need it more than others as they need to outrun opponents.
    * agil: Besides GK none really depend on this attribute much. 
    * accl: essential for wings and front court. 

.. csv-table:: Attributes:Position and training factors (Speed)
   :file: attributeSpeed.csv
   :header-rows: 1

* Pwr  
    * stam: not sure what this does. For some reason, performance in the second half depends on another attribute, Cons. 
    * str not sure what this does. might have something to do with injuries on court
    * fit reduces risk of injury in training, An injury can parse training progress for a point in rating or more, despite not contributing to a player's position ranking, this attribute is important for all positions

.. csv-table:: Attributes: training factors (Power)
   :file: attributePower.csv
   :header-rows: 1

* Skill
    * shoot：accuracy in shooting. Essential for PF and SS.
    * pass: accuracy in passing. Everyone need this skill, the middle fielders need it the most. passing accuracy caps at 90%, passing above 75 does nothing but increase position ranking on paper. You can increase effective passing with styles so you can get by with 63 in passing at the cost of shooting accuracy. if it is higher than greed, then reduce shooting accuracy for 50%. 
    * head: CD and FOR need it the most, not surprisingly the two positions are often fighting face to face. 
    * control: i guess it increases the chance a shot is on target. 
    * drib: essential for wings and FR.     

.. csv-table:: Attributes:Position and training factors (Skill)
   :file: attributeSkill.csv
   :header-rows: 1

* Tackling
    * deter how determined a player tries to get a tackle. Even a high cool player would get red card with too many tackles. But setting it too low would cause a player not even try to tackle. Set to 45% for forwards and 70% for high cool and tackle skill players.
    * skill

.. csv-table:: Attributes:Position and training factors (Tackling)
   :file: attributeTackling.csv
   :header-rows: 1

* Cool: pick a better shooting time, also increases tackling success rate and avoid fouls.
* Awar: vision and the ability to case disruption. Also the ability to decide who to pass to correctly.
* Flair: the ability to score an impossible goal. 
* Goalkeeping
    * 
* Cons(istency) this one only contribute to player position rating for GK, LRB and CD. However it also determines the energy at the start of a match thus the higher the better for everyone. 
* Greed: tendency to shoot the ball. Also keeps the ball instead of passing, even when a teammate has better position and procession bias. 

Money

You will be fired if your team ran out of money. So this is the highest priority. There are many ways to make money

* ticket sales Ticket sales is the main source of your income. The more home games the better, thus you probably do not want to give up cup matches. As for attendance, fans increase if you win, up to 5 times of your seats. But having too many seats also decrease the expectation of your ticket price. Thus you might have lower ticket income if you increase seats too soon. You can reduce the home seats by increasing guest seats, then charge an arm and an leg (up to 500/375/250/150) for home tickets. If you have full attendance then gradually increase home seats. 

* play transfer
* merchandise depends on your attendance. 
* random events


If you are in a higher league, you can buy players from low league and immediately sell to make money. Players are worth more simply for being in a higher league. The downsides that if you are not careful, you would have a full 40 (or 39 in the 97/98 patch) squad at some point, and that causes a buffer overflow in the game that will raise negative events every week, and you will be fired shortly after no matter what you do. 


Style
Style settings increases one attribute at the cost of another.  If a player's one skill doesn't really matter it might be wise to sacrifice that for in exchange for boosting another useful attribute. However skills do cap out (e.g. passing accuracy is capped at 90%) it may not be beneficial when your player's skill reaches the cap without the boost. 

Style and processing bias decide who teammates pass the ball to. Plan your ball route carefully based on your players' abilities. 

* shoot on sight Greed +10% shooting -10%. VERY situational. If a player passing is less than 110% greed, it is beneficial to boost greed for 10%, the shooting chance would increase 50% (greed > pass bonus) at the cost of 10% shooting accuracy(shoot on sight penalty).
* crossing game shooting -10% passing +20%, change passing choice
* long ball game shooting -10% passing +20%, change passing choice
* passing game shooting -10% passing +20%, change passing choice

Passing accuracy maxs out at 90%, thus it does not make sense to increase passing with style in most cases. You only need 75 in pass to reach the cap, there is no need to increase passing attriute except maybe making the player better on paper. However you want your full team to reach the cap asap, as turnovers reduces your procession time. 


Orders

* All out attack shooting +5%
* Attack shooting +2%
* Defend shooting -2%
* All out defend shooting -5%

The attack line decides where your players would start shooting. You need a high leadership player on the field to execute orders effectively. 

Biasing

Procession bias determines how teammates decide who to pass to. Combined with Styles, you can decide how a ball is most likely brought up to the front court. 

Basically you want to lower procession bias for the back court and increase it for the front court. For example, you should not really pass back to a GK.  If you have good wings, you want to decrease procession for AM and increase for L/RM. If you have a good SS insread, you might want to have DM playing a long ball game and increase SS's procession bias.

As for tackling, it can increase your procession time if successful, therefore you want high Cool on player with tackling bias, or you risk fouls or even red cards. Reduce this tendency on your forwards. 


Take a loan first to upgrade your team. 


You need a player with high fitness. An injury-prone player is not worth training. 

For CD, you need someone with high leadership, although for regens I don't see anyone above 75. Which means your CD ranking would be maxed at 97.
The following attributes cannot be trained:

* Lead (CD)
* Throw 

For the rest of attributes, the most effective training methods are:
* Sprinting
* Training match
* Control (for those who need it)
* Head (for those who need it)
