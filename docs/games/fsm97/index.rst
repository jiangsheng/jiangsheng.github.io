FIFA Soccer Manager 96/97
==================================

At the beginning of the game, you will be presented the option to load a game or create a new game. if you select to create a new game, you then select a team to manage, then after a whisle you arrive the manage screen.

The manage screen is where you manage your team. Except for watching the game, you will be on thus screen. This screen has a lot of information. From top to buttom:

* Current Date
* Balance watch this, if you went to negative, you could be fired if you cannot get back to positive in a short time. 
* Next match Date
* Next match teams and competition: home teams first. competition basically decides how large your bench would be. some leagues only allow 3 backup players but you can use 5 in continental games. 
* Tab buttons
    * Formation here you deal with players
    * Potch here you deal with buildings and ground
    * Balance Sheet here you deal money
    * Fixtures here you look up tean performance

Formation

There are two rows of buttons at the buttom of this view. They are all for tabbing purposes showing various aspects of the team. The default tab is the team selection tab.

Team Selection Tab

Here you select the first team and reserve players and give them orders.It has 5 tabs, Formation, Stats, Style, Orders and Biasing. 

Formation

This is the default tab of the Team Selection Tab. In the left is a grid showing the name and attributes of your players. On the right is your formation. The grid has the following columns:

* Position: long click to see the player's stat on each position, click on a position to change. At the beginning of the game, you might have players out of position. If you keep a player out of position, the player might become unhappy and complain, even threaten to retire (but do so very, very rarely).  You cannot change the startup GK's position. 
* Flags. You will see startup and bench at the beginning, as time goes buy, you wlil also see injured players at the end of the list. 
* Stat how good a player is overall. Because most players would not have good GK skills, GKs are much higher than the rest of players.   High moral also increaes stat. 
* POS how good a player is at the position, on paper that is
* Form game readiness. 
* Moral mental energy at the beginning of match. energy decides game performance.
* Energy physical energy. Both training and math cost physical energy and you need a balance between them or risk injuries... Or if you dont consider it cheating you can switch every bench player to GK and train 7 days a week (GKs rarely get injured while training).
* Games games played
* Goals 
* Mom number of player of the game award won

On the right of the grid, there is a vertical area where you can drag players from left grid into. Those are your bench. Different competitions have diffent rules on the number of bench players you can take to a match. You can also drag players from here to either the left grid (remove from bench) or to the formatio to the right (move to starting team). Similarly you can drag players out of the starting team to the bench or to the left grid. 

Stats

This is the second subtab of the Team Selection Tab. The left grid remained but on the right you can see player attributes. There are some attributes with plus sign, which means you can click and expand the column to see details. 

The attributes are the following:

* Move
    * speed: everyone needs speed. front court and wings need it more than others as they need to outrun opponents.
    * agil: Besides GK noone really depend on this attibute much. 
    * accl: essential for wings and front court. 

.. csv-table:: Attributes:Position and training factors (Speed)
   :file: attributeSpeed.csv
   :header-rows: 1

* Pwr  
    * stam: not sure what this does. For some reason, performance in the second half dependes on another attribute, Cons. 
    * str not sure what this does. might have something to do with injuries on court
    * fit reduces risk of injury in training, An injury can parse training progress for a point in rating or more, despite not contributing to a player's position ranking, this attribute is important for all positions

.. csv-table:: Attributes: training factors (Power)
   :file: attributePower.csv
   :header-rows: 1

* Skill
    * shoot：accuracy in shooting. Essential for PF and SS.
    * pass: accuracy in passing. Everyone need this skill, the middle fielders need it the most. passing accuracy caps at 90%, passing above 75 does nothing but increase position ranking on paper. You can increase effective passing with styles so you can get by with 63 in passing at the cost of shooting accuracy. if it is higher than greed, then reduce shooting accuracy for 50%. 
    * head: CD and FOR need it the most, not surpisingly the two positions are often fighting face to face. 
    * control: i guess it increases the chance a shot is on target. 
    * drib: essencial for wins and FR.     

.. csv-table:: Attributes:Position and training factors (Skill)
   :file: attributeSkill.csv
   :header-rows: 1

* Tackling
    * deter how determined a player tries to get a tackle. Even a high cool player would get red card with too many tacklings. But setting it too low would cause a player not even try to tackle. Set to 45% for forwards and 70% for high cool and tackle skill players.
    * skill

.. csv-table:: Attributes:Position and training factors (Tackling)
   :file: attributeTackling.csv
   :header-rows: 1

* Cool: pick a better shooting time, also increases tackling success rate and avoid fouls.
* Awar: vision and the ability to case distruption. Also the ability to decide who to pass to correctly.
* Flair: the ability to score an impossible goal. 
* Goalkeeping
    * 
* Cons(istency) this one only contribute to player position rating for GK, LRB and CD. However it also determins the energy at the start of a matchm thus the higher the better for everyone. 
* Greed: tendency to shoot the ball. Also keeps the ball instead of passing, even when a teammate has better position and procession bias. 

Money

You will be fired if your team ran out of money. So this is the highest priority. There are many ways to make money

* ticket sales Ticket sales is the main source of your income. The more home games the better, thus you probably do not want to give up cup matches. As for attendance, fans increase if you win, up to 5 times of your seats. But having too many seats also decrease the expectation of your ticket price. Thus you might have lower ticket income if you increase seats too soon. You can reduce the home seats by increasing guest seats, then charge an arm and an leg (up to 500/375/250/150) for home tickets. If you have full attendence then gradually increase home seats. 

* play transfer
* merchandise depends on your attendence. 
* random events


If you are in a higher league, you can buy players from low league and immediately sell to make money. Players are worth more simply for being in a higher league. The downsideis that if you are not careful, you would have a full 40 (or 39 in the 97/98 patch) squad at some point, and that causes a buffer overflow in the game that will raise negative events every week, and you will be fired shortly after no matter what you do. 


Style
Style settings increases one attribute at the cost of another.  If a player's one skill doesn't really matter it might be wise to sacrifize that for in exchange for boosting another useful attibute. However skills do cap out (e.g. passing accuracy is capped at 90%) it may not be beneficial when your player's skill reaches the cap without the boost. 

Style and processing bias decide who teammates pass the ball to. Plan your ball route carefully basd on your players' abilities. 

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

Procession bias determins how teammates decide who to pass to. Combined with Styles, you can decide how a ball is most likely brought up to the front court. 

Basically you want to lower procession bias for the back court and increse it for the front court. For example, you should not really pass back to a GK.  If you have good wings, you want to decrease procession for AM and increase for L/RM. If you have a good SS insread, you might want to have DM playing a long ball game and increase SS's procession bias.

As for tackling, it can increase your procession time if successful, therefore you want high Cool on player with tackling bias, or you risk fouls or even red cards. Reduce this tendency on your forwards. 


Take a loan first to upgrade your team. 


You need a player with high fitness. An injury-prone player is not worth training. 

For CD, you need someone with high leadership, although for regens I don't see anyone above 75. Which means your CD ranking would be maxed at 97.
The following attributes cannot be trained:

* Lead (CD)
* Throw 

For the rest of attributes, the most effective traning methods are:
* Sprinting
* Traning match
* Control (for those who need it)
* Head (for those who need it)


 | | 判断/deter | 铲球/skill | 冷静/Cool | 意识/Awar | 资质/Flair | 踢球/kick | 掷球/throw | 救球/hand | 领导/Lead | 意志/Cons | 决心/Deter | 得分欲/Greed | 总计/Total | 体力/Energy cost |



* GK:健康(选特低的练成负数也行) 掷球 踢球 训练： 救球 守门 踢球 比赛 举重 冲刺 控球（练意志）
* LRB：意志 训练：比赛 举重 冲刺 控球
* CD：领导 头球
* FOR：头球 意志 健康、速度、起动、意志、得分欲
* 其他：训练：比赛 举重 冲刺

主要训练项目是比赛，所以不需要练射门和传球。资质和意识也不需要单独练。
守门员训练里救球这个训练项目最有用。因为训练比赛比较少，选人的时候要挑健康高或者能练成负数的，因为守门员训练不休息的。
因为要训练意志的原因，控球训练不会少，因此冷静也不需要单独练。盘带控球练得慢，可以在选人的时候考虑。控球本身是训练比赛也涨所以不用考虑。
后场建议买L/RWB，别的位置上的技能很容易训练。前场同理买L/RW和FR



|                      | 速度/speed | 敏捷/agil | 冲刺/accl | 耐力/Stam | 力量/str | 健康/fit | 射门/shoot | 传球/pass | 头球/head | 控球/ctrl | 盘带/drib | 判断/deter | 铲球/skill | 冷静/Cool | 意识/Awar | 资质/Flair | 踢球/kick | 掷球/throw | 救球/hand | 领导/Lead | 意志/Cons | 决心/Deter | 得分欲/Greed | 总计/Total | 体力/Energy cost |
|----------------------|------------|-----------|-----------|-----------|----------|----------|------------|-----------|-----------|-----------|-----------|------------|------------|-----------|-----------|------------|-----------|------------|-----------|-----------|-----------|------------|--------------|------------|------------------|
| 冲刺/Sprinting       | 8          | 4         | 8         | 4         |          | 6        | -1         | -1        | -1        | -1        | -1        | -1         | -1         |           |           |            |           |            |           |           |           |            |              | 23         | 3                |
| 举重/Weight Training | -2         |           |           |           | 10       | 4        | -1         | -1        | -1        | -1        | -1        | -1         | -1         |           |           |            |           |            |           |           |           | 8          |              | 13         | 3                |
| 练习/Exercise        |            | 8         |           | 4         | 4        |          |            |           |           |           |           |            |            |           |           |            |           |            |           |           |           |            |              | 16         | 1                |
| 慢跑/Jogging         |            |           |           | 8         |          |          | -1         | -1        | -1        | -1        | -1        | -1         | -1         |           |           |            |           |            |           |           |           |            |              | 5          | 2                |
| 射门/Shooting        |            |           |           | -4        |          |          | 8          |           |           |           |           |            |            | 4         |           |            |           |            |           |           |           |            |              | 8          | 0.05             |
| 传球/Pass            |            |           |           |           |          |          |            | 8         |           |           |           | -1         | -1         |           |           |            |           |            |           |           |           |            |              | 10         | 0.05             |
| 头球/Head            |            |           | -2        |           | -2       |          |            |           | 8         |           |           |            |            |           |           |            |           |            |           |           |           |            |              | 4          | 0.1              |
| 控球/Control         |            |           |           |           |          |          |            |           |           | 8         | 8         |            |            | 8         | 2         | 4          |           |            |           |           | 6         |            |              | 34         | 0.05             |
| 盯人/Marking         |            |           |           |           |          |          | -1         | -1        | -1        | -1        | -1        | 8          | 4          |           | 4         |            |           |            |           |           |           |            |              | 11         | 0.1              |
| 铲球/Tackling        |            |           |           |           |          |          | -1         | -1        | -1        | -1        | -1        | 4          | 8          |           | 4         |            |           |            |           |           |           |            |              | 11         | 0.1              |
| 守门/Goal Keeping    |            | 8         |           |           |          |          |            |           |           |           |           |            |            |           | 6         |            | -2        |            | 4         |           |           |            |              | 16         | 0.1              |
| 救球/Handling        |            |           |           |           |          |          |            |           |           |           |           |            |            |           |           |            | -2        | 4          | 8         |           |           |            |              | 10         | 0.05             |
| 掷球/Throwing        |            |           |           |           |          |          |            |           |           |           |           |            |            |           |           |            |           | 8          |           |           |           |            |              | 8          | 0.05             |
| 踢球/Kicking         |            | -2        |           |           |          |          |            |           |           |           |           |            |            |           |           |            | 8         | -2         |           |           |           |            |              | 4          | 0.05             |
| 区域/Zonal Defense   |            |           |           | -1        | -1       | -1       |            |           |           |           |           |            |            |           | 8         |            |           |            |           |           |           |            |              | 5          | 0.1              |
| 五人赛/Five-a-side   |            | 4         |           | 4         |          | 6        | 4          | 8         | 2         | 8         | 2         | 2          | 6          |           |           |            |           |            |           |           |           |            |              | 58         | 6                |
| 比赛/Traning match   |            | 4         |           | 8         | -4       | 4        | 8          | 8         | 4         | 4         | 2         | 4          | 4          | 4         | 6         | 6          |           |            |           |           |           |            |              | 62         | 5                |
| 理疗/Physiotherapist | -1         | -1        | -1        |           |          |          |            |           |           |           |           |            |            |           |           |            |           |            |           |           |           |            |              | -10        | -12              |
| 休息/None            |            |           |           |           |          |          |            |           |           |           |           |            |            |           |           |            |           |            |           |           |           |            |              | 0          | 5                |

