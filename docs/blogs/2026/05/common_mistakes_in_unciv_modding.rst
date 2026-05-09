.. meta::
   :description: My experience fixing some mods for Unciv, an open source clone of civilization V. 

Common mistakes in Unciv Modding
===================================================================

.. post:: 7 May, 2026
   :tags: ABlog
   :category: Sphinx 
   :author: me
   :nocomments:

Unciv is an open source clone of Civilization V. I have been playing it for a while and decided to try modding it. The modding process is quite straightforward. The modding is done by creating json files. You can find the built-in ruleset at https://github.com/yairm210/Unciv/tree/master/android/assets/jsons and start from there. Once you have a mod, you can download it in the mod section in game by providing the downloading address. The game also has a mod list that is based on github repos. On a Windows machine, you can find mods in the mods subfolder of the game and inspect the folder structure of mods and how they are json files work. You can add new nations, beliefs, units or buildings by copying the existing by copying the existing ones and rename them. But from what I see, a lot of modders make mistakes due to misunderstanding of the unique system and their code didn't work. 

--------------------------
Missing elements
--------------------------

The most common mistake is to assume building exist but they don't in a different ruleset. For example, some mods has this: 

.. code-block:: json

    "requiredBuilding": "Theatre",

This requires the game engine to have a building called Theatre, which is not always the case. Although the built-in "Civ V - Vanilla" and "Civ V - Gods & Kings" rulesets have it, "RekMod“, a popular mod, doesn't. When you have a ruleset and mod combination that does not have a referenced building defined, the time you found a city and open the city screen, the game will crash. The game is more forgiving when it comes to promotions, a referenced promotion won't block you from starting the game, you just cannot gain a promotion if the prerequisite does not exist. RekMod has many promotion like "Formation I" and "[Privateer] ability" renamed, thus creates incompatibility with mods that rely on those promotions.

The easy fix would be defining the object that is referenced like https://github.com/Kurwizimi/Enlightenment-Era/compare/master...jiangsheng:Enlightenment-Era:master#diff-725582079deeb862a15431c175400961f158479ce3d0deda3153eab86d68c6cc. However, if some other mod or the basic ruleset also define it, this could cause a name conflict and the mod enabled later overwrites the one defined earlier. 

Although this would not block the game from starting or crash the game, it would cause the affected building behave differently than what the author intended. Another way is to have a sub mod who has a dependency unique on the ruleset that has the required building, like this:

.. code-block:: json

    "uniques":
    [
        "Mod requires [Civ V - Gods & Kings]"
    ],


Although this would avoid conflicts, it would also make the mode itself incompatible with other rulesets even when they have the required building.
 
 
Finally, you can add a condition to check if the game runs under a required ruleset, like this:

.. code-block:: json
    
    "uniques": 
    [
            "Only available <if [Civ V - Gods & Kings] is enabled>",
            "Only available <if [RekMod] is enabled>"
    ],
 
This way, you don't need to write a sub mod for each ruleset and duplicate your code in each sub mod. But with the number of rulesets increasing, this could get hard to maintain.

--------------------------
Name Conflicts
--------------------------
 
Another common error is about policies. The policy logic is a bit different from other objects, you can't have the police defined twice. If you enable a mod that has a policy with the same name as the basic ruleset, the game would disable the mod immediately after you enable it. And the default policy tree is different in different rulesets, you can't really assume a policy won't exist in the basic ruleset. The most common one that causes a conflict is Aesthetics, which is defined in the RekMod ruleset and many other mods. If the mod's design goal is not to place the whole policy tree, you can rename the conflicting policy like https://github.com/IsNss-DFFEF/Modern-Policy-Trees/commit/613bf05bcf8e3368e73780015edf745ffcd02718. 

--------------------------
Misunderstood Uniques
--------------------------

You may wonder how those "Mod requires" or "Only available" work. This is where the unique system comes in. The unique system is a way to define the uniqueness of an object. It is a list of strings that can be used to define the uniqueness of an object. If you write the uniqueness incorrectly, it won't work, and you would see the error in the game's "options"->"locate mod errors"  screen. Always use this screen to troubleshoot why your mode doesn't work.

Each unique string can apply to one or more object types. If you applied a unique to the wrong object type, it won't work. Finding the right way to implement something you want is a bit tricky, as not all patterns are documented at https://yairm210.github.io/Unciv/Modders/uniques/, and I have to read through the processing code at https://github.com/yairm210/Unciv/tree/3f2a181d2d4d15455a47cdeb56b99d04f5716cdd/core/src/com/Unciv/models/ruleset/unique. But keep in mind that if you put an undocumented unique on an object, it may stop working in the future when the game engine changes. Here are some examples of how I fixed some unique related issues in my forks:

.. code-block:: json

    "uniques": 
    [
           "[1 Faith] from every [Scientist] <in cities with a [Sage's Lodge]>",
    ]

This does not work for founder and enhancer beliefs, as the "[stats] from every specialist [cityFilter]" only applies to follower and pantheon beliefs. The fix would be changing the belief type.

.. code-block:: json

    "uniques": 
    [
           "uniques": ["[+2 Production] <in cities with at least [1] [Specialists]>"]
    ]

This looks like a "[stats] [cityFilter]" unique, but it is not, as "+2 Production" is not a stat. The correct way to implement this is to use the unique "Gain [amount] [stat]", although it is documented only for Triggerable, which makes it one time deal after adopting the religion, unless you make it recurring by adding a <upon turn start> filter.

.. code-block:: json

    "uniques": 
    [
           "+[50]% Strength for units fighting in [Water] tiles"
    ]

This does not work on a belief. Until Unciv adds the unique to beliefs, the only way to add this benefit to a religion is to use a unique that gives a promotion to the unit, and then put the unique on the promotion.

.. code-block:: json

    "uniques": 
    [
        "[All] units gain the [Tidal Connection Ability] promotion <upon turn start>"
    ],

The following is another unique that does not work on beliefs and had to switch to another unique that does:

.. code-block:: json

    "uniques": 
    [
        "[+10 Gold]",
        "[+5 Gold] <after discovering [Theology]>",
        "[+5 Gold] <after discovering [Printing Press]>",
    ]

The follower belief unique list only has "[stats] [cityFilter]" and not "[stats]". Therefore to fix this, I have to add a city filter that only occurs once:

.. code-block:: json

    "uniques": 
    [
        "[+10 Gold] [in capital]",
        "[+5 Gold] [in capital] <after discovering [Theology]>",
        "[+5 Gold] [in capital] <after discovering [Printing Press]>",
    ]

Another example of a unique that is not working as a global unique is like this: 

.. code-block:: json

    "uniques": 
    [
        "[+1] [Military Support] per [1] population <in all cities>"
    ]

This kind of unique only work on buildings. So I have to add a building for this:

.. code-block:: json

    {
        "name": "Logistics Hub",
        "cost": 10,
        "hurryCostModifier": 1,
        "maintenance": 0,
        "uniques": [
            "Only available in capitol",
            "Moves to new capital when capital changes",
            "[100]% of [Food] from every [Building] in the city added to [Military Support]"
        ]
    }

If you do not want an extra entry in the buildable building list, you can add a unique to hide the building from users:

.. code-block:: json

    "uniques": 
    [
        "Automatically built in all cities where it is buildable <hidden from users>",
    ]

-----------------
Coordinates
-----------------
Finally, a less occurring conflict is element positions. This is not a mistake but an unfortunate result of multiple people customizing the same game.

Many elements can have their rows and columns defined, and if two mods adding elements to the same cell, conflict happen and you cannot enable both mods. The solution is to fork one on Github, moves the element elsewhere like https://github.com/PokegetaTV/UNIT_LIMIT_REKMOD_V2/commit/947b14ffcf4d1f44fb6d1f724657b81891da5c71, then download the mod from your fork instead of the original in game. 

-----------
Conclusion
-----------
With many mods forked and corrected, I am finally enjoying the game and mods as the authors intended. I hope this post can help other modders get their mods working as well.