let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 400,
    scene: [ Menu, Play]

}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 0; // set to have stable backdrop

// reserve keyboard bindings
let keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyA, keyD, keyW;

/*
Name: Althea "Thea" Gamez
Project Title: Bread Bear in... Toast Patrol!
Date: April 28th, 2021 at 10:48 pm PST
Length: I took about a couple of weeks because of multiple reasons. The big thing was my mental health and emotional wellbeing just not
being great around the time we were to complete this project. I asked and received an extension from Nathan. Another thing that prolonged
my progress was my wifi messing up constantly during my extension period, so I got this done a lot later than expected. Sorry, campus wifi is bad :(

Thea's Mod List
- Complete Theme Overhaul (60 pts): 
    new sprites, new audio clips, new background, new explosion animation, new toast factory run by a mouse smoking a cigarette theme 
- Simultaneous Multiplayer (30 pts): 
    two new game modes allow novice and expert play by passing information from Menu to Play using an init() method
- Redesigned title screen (10pts):
    i made my own logo in photoshop and redesigned all the text fonts and colors

Total Expected Points: 100

Sources:
https://phaser.io/examples/v3/view/scenes/passing-data-to-a-scene, 
    used this to track whether game mode was single or multi player across the menu and play scenes
Eloquent Javascript Chapter 6,
    used this to better understand constructors in class objects 

*/
