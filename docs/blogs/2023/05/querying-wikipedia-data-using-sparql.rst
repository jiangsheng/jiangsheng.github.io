.. meta::
   :description: Recently I have been working on a trainer for a football manager game. The game has a player database, when a player retires, another with the same last name wo

Querying Wikipedia data using SPARQL
====================================
.. post:: 5, May, 2023
   :category: Uncategorized
   :author: me
   :nocomments:

Recently I have been working on a trainer for a football manager game. 
The game has a player database, when a player retires, another with the
same last name would respawn in some other club. When you play the game
for many seasons, the player database becomes gradually out of date. Fan
patches are created but due to the amount of work involved (check the
team roster for every minor team in every league, for starters) only a
few patches are ever created. My goal is to get some actual real players
to replace the respawned ones and refresh as time elapses.

I first tried to extract data from a recent football manager game.
However, it has some issues that made me rule out of using a database
from another game. First, different games have different way to rate
players.  Some attributes in another game can be mapped to the game I am
working on, but for other attributes, I need to come up with values for
thousands of players, most of them I have never heard of. Yikes. Second,
the game would only list current playing players. Thus I might miss
players retired early,

I then checked player database web sites. Some have the same issue with
games, only listing current players (one does not even have David
Beckham). Some has extensive player coverage but no easy way to crawl.
Then I think of Wikipedia.

Wikipedia is not on my radar at the beginning, because there is no
single category that contains all footballers, may require crawling
multiple layers of categories to find them. However, when I revisit the
possibility I come across the DBpedia project, with some more Google-fu
I come up with this query to replace my respawns.

   | PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
   | PREFIX dbo: <http://dbpedia.org/ontology/>
   | PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
   | PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

   | SELECT DISTINCT ?player , ?name
   | WHERE {?player dbo:wikiPageID ?number; rdf:type dbo:SoccerPlayer ;
   | dbo:birthDate|dbp:birthDate ?birthdate ;rdfs:label ?name
     ;dcterms:subject ?category
   | FILTER ((lang(?name)="{2}")&&?birthdate>= "{0}0101"^^xsd:date &&
     ?birthdate<= "{1}1231"^^xsd:date && ?category
     =<http://dbpedia.org/resource/Category:{3}> ).
   | }
   | ORDER BY (?number)

you can test the query at https://dbpedia.org/sparql

rdf:type dbo:SoccerPlayer would return only football players, which is
exactly what I wanted. I used {0} and {1} to specify the from year and
to year for birth date range. Due to dbpedia has properties not mapped
from templates I need to pull data from multiple data sets and use
Distinct to filter out pages with both dbo and dbp birthdates.

Generally both from year and to year are set 17 years before the current
in game year, except when the query return no players (most likely due
to current game date too far into the future) then I make another query
to return all players since Diego Maradona.

I support multiple versions of the game, thus I need to pull player
names from different Wikipedia projects.  {2} is the wiki language to
query, for example, for the Chinese version of the game, the trainer
pulls play names from the Chinese Wikipedia ({2}=zh).

To limit player from a certain category, I added ;dcterms:subject as a
column and filter based on that. {3} is a address for an English
Wikipedia category. E.g. for the A.C. Milan players category, the
address is A.C._Milan_players. When the specified category is empty I
remove the category column from the query.

Then result is sorted by page number, which is basically sorting by page
creating time. It will be off for some players now, for example Lionel
Messi is not in top 5 for the 2004 class, but not far off except for
late boomers. For older players, their page creation date would be
decided by how famous they were when Wikipedia of the specified language
started. For the purpose of game data supplement , it was close enough
to the release year of the game to be accurate enough.

The query has some unexpected results, for example, woman footballers
are also appearing in the game now, but I consider this a feature, not a
bug. Those who Wikipedians consider more notable than males most likely
can make a team roster somewhere in the game if allowed.

