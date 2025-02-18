.. _front_mission_mechanics_parts:


Parts
===============================

Parts have the following attributes:
* DF: defense (effective HP = defense * HP)
* HP: hit points
* Hit: Accuracy, only used when a weapon is in grip (multiplied with the weapon's Hit). 
* Engine: power output 
* Move: movement points
* Weight: how much it costs engine output
* Int Weapon: the part's built-in :ref:`weapon <front_mission_mechanics_weapons>`, used when another weapon is not in grip. Some parts allow another weapon (e.g. normal hands with a melee weapon), some don't (e.g. mobile weapons or gun hands) 


Body: provide engine support. When the body is destroyed, the wanzer is defeated and withdraw from the battle. You will get a movement bonus when weight/power ratio is low. When the W/P ration is
  * 90% or higher, no bonus
  * 80%-89% ： 1 movement point
  * 70%-79% ：2 movement points
  * 60%-69% ： 3 movement points
  * 50%-59% ： 4 movement point
  * <50% : 5 movement point

Arm: When an arm is destroyed, you can not use grip or shoulder weapons on that arm without :ref:`repairing <front_mission_mechanics_commands>`. 

Leg: provides movement. When the leg is destroyed, the unit would have very limited movement. Actual range depends on leg type (or lack thereof) and the :ref:`terrain <front_mission_mechanics_terrain>`. Normal legs are best for traveling between different elevation levels. For flat terrains, you can switch to other type of legs. 