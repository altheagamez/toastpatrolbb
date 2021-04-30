class Menu extends Phaser.Scene {
    constructor(mode = 1) {
        super("menuScene");
        this.mode = mode;
    }
    preload() {
        this.load.image('logo', './assets/toastpatrollogo.png');
        // load sound files
        this.load.audio('sfx_select', './assets/letme.wav');
        this.load.audio('sfx_explosion', './assets/consider.wav');
        this.load.audio('sfx_yeet', './assets/bring.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '20px',
            backgroundColor: '#EA41F3',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 40, 'logo').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'P1 Controls: ←→ to move & ↑ to yeet\nP2 Controls: AD to move & W to yeet', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FF0080';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 100, 'Press ← for Novice Single Player\nPress → for Expert Single Player\nPress ↑ for Novice Multi  Player\nPress ↓ for Expert Multi  Player', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        //this.add.text(20, 20, "Rocket Patrol Menu");

        // change scenes
        //this.scene.start("playScene");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            // 2p mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene', {mode: 2});    
          }
          if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            // 2p mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene', {mode: 2});    
          }
    }
}