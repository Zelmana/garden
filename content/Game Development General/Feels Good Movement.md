---
title: "'Feels Good' Movement"
noteOrder: "2"
---
## Unreal Feel

Recently I've been thinking about the movement of my player controller. Since I am a beginner, and use a premade game engine, this is a big problem to overcome. 

Unreal Engine is notorious for having a player controller that is recognizable. There are terms that people use- either "unreal feel" or "unreal floatiness" when describing the player controller movement. Unreal isn't alone in this, Unity also has some of these problems. A lot of people, myself included, can pick it up instantly. It gives the vibe of an asset flip, even if some effort was made, and unique art assets and blueprint/code was created for the game.

## How do you avoid feeling like an asset flip in the movement department?

An asset flip is most commonly identified as the visuals- imported from the marketplace and slapped into a project with a few plugins. The player controller also has these issues as well, and the game will feel off unless some tweaks to the player controller is made.

###### Movement Options
Maybe some adjustments to the camera height, follow distance should be made. Another consideration is the movement system itself- ALS or GASP or another method could be used. For multiplayer replication and ease of use as a blueprint-first project, the standard movement via State Machines is likely best.

I was watching [this video](https://youtu.be/Q-69x0v9Wvo?si=-ZbJ94z4z0DjILS4) by BeardGames earlier today regarding this decision of state machines.

Another option is that we can alter the movement input method. Scroll to increase movement speed modifier on a scalar parameter instead of a shift-to-run single runspeed. The scroll option gives the player much more agency on their speed. Ability to adjust default walkspeed should be considered in a RP Engine because it would allow for slightly older characters to walk slightly slower.


#gamedev #seed #unreal #movement