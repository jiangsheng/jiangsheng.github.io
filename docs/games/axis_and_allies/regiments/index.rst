.. meta::
   :description: Unlike other RTS games, in this game units are grouped into regiments. When you lost all units in the regiment, you lost the regiment. If not, you can have the

.. _axis_and_allies_regiments:

Regiments (Axis and Allies)
========================================

.. toctree::
   :maxdepth: 1
   :caption: Contents:
   
      
   Formation <formation>
   Terrain <terrain>
   Infantry <infantry_regiment>
   Mechanized <mechanized_regiment>
   Tanks <tank_regiment>
   Not producible units <npc_unit>

.. index:: pair: Axis & Allies; Regiments

Unlike other RTS games, in this game units are grouped into regiments. When you lost all units in the regiment, you lost the regiment. If not, you can have the regiment retreat to the :ref:`supply <axis_and_allies_supply>` zone and restore /heal units over time. Provided the regiment is linked to a HQ for supply. 

There are three type of regiments, infantry, halftracks and tanks. Different kinds of regiments have different number of units, but they have similar command structure. 

A regiment has an officer unit that relays your command to its units. In most cases the officer unit is armed differently. When the officer unit is lost, the moral of the regiment takes a big hit. A new officer will be assigned once the regiment is supplied in the supply zone. 

A regiment has a :ref:`formation <axis_and_allies_formation>` that affects the regiment's efficiency in different aspects. For example, the assault formation increases attack but decreases movement. You may want to change formations between reinforcing and attacking. 

A regiment's moral drops when taking fire, and drop further when losing a unit. When reaching the moral breakpoint, the unit will rout, running to safety. You can regain control of the regiment once its moral is back up above the breakpoint. The Advanced Infantry Training :ref:`upgrade <axis_and_allies_upgrades>` can be used to lower the moral breakpoint, however this may cause your elite troops fight to their death. Always keep an eye on your troops and withdraw manually before too late. 

A regiment can also gain exp and rank during battle. Elite regiments have better attributes. The exp gain is also contribute to the general and can be used in :ref:`special operations<axis_and_allies_special_operations>`.`

A regiment's speed is largely decided by formation and :ref:`terrain <axis_and_allies_terrain>`. A regiment's speed is usually decided by the slowest unit. Except when routed, then everyone run as fast as they can without trying to keep a formation. 

A regiment cost upkeep in oil and ammo, a supply slot in the HQ when linked, and a slot in the total regiment cap. 

Units in a regiment can have a mix of weapons, each may have different damage types. Different damage types inflict various degree of damage depending on target's resistance to the damage type. For example, armor piercing weapons are best against armored units and guns are best against infantry. 

.. list-table:: Damage Types
    :header-rows: 1
    
    * - Unit
      - Gunfire Resistance
      - Armor Piercing Resistance
      - Explosive Resistance
      - Flame Resistance
    * - Building
      - N/A
      - +25%  
      - N/A
      - N/A
    * - Bunkers
      - +25%
      - +25%
      - N/A
      - N/A
    * - Infantry
      - N/A
      - +25%
      - +25%
      - N/A
    * - Vehicles
      - N/A
      - +25%
      - N/A
      - N/A
    * - Tanks
      - N/A
      - N/A
      - +25%
      - N/A


A regiment also has various status. For example, an out of supply unit will not heal or replace lost units even when in a supply zone. An entrenched(rested) unit has better defense bonuses. To minimize casualties, you might want to setup a trap of entrenched troops and lure an entrenched enemy in.

.. list-table:: Entrenched Bonus
    :header-rows: 1

    * - Unit
      - Defensive
      - Gunfire Resistance
      - Armor Piercing Resistance
      - Explosive Resistance
      - Flame Resistance
      - Moral Loss
    * - Infantry
      - +4
      - +25%
      - +25%
      - +25%
      - N/A
      - +50% Slower
    * - Vehicles
      - +4
      - N/A
      - +25%
      - +25%
      - N/A
      - +25% Slower

When attacking or attacked a regiment enters engage status. Only run and rout commands are available. Speed bonus +25%. When routed, you lose control to the regiment (therefore it is usually better to issue the Run command to retreat)
