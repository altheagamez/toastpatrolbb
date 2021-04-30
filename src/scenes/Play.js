class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init(data) {
        this.mode = data.mode;
    }

    preload() {
        // load images/tile sprites
        this.load.image('breadbear', './assets/breadbear.png');
        this.load.image('jamblob', './assets/jam2.png');
        this.load.image('factory', './assets/background.png');
        this.load.image('frozenbb', './assets/frozen.png');
        // load a spritesheet
        this.load.spritesheet('jammed', './assets/spritesheet.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'factory').setOrigin(0, 0);

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white boarders
        /*
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        */
        
        // add spaceship
        this.ship01 = new Jam(this, game.config.width + borderUISize * 6, borderUISize * 4, 'jamblob', 0, 30).setOrigin(0, 0);
        this.ship02 = new Jam(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding*2, 'jamblob', 0, 20).setOrigin(0, 0);
        this.ship03 = new Jam(this, game.config.width, borderUISize * 6 + borderPadding *4, 'jamblob', 0, 10).setOrigin(0, 0);

        // define our keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // add rocket player 1
        this.p1Rocket = new Bread(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'breadbear', keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
        // show score
        let scoreConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#9E08A3',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                },
            fixedWidth: 100
            }
        // player 1 score
        this.p1Score = 0;
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        if(this.mode == 2) {
            // add rocket player 2
            this.p2Rocket = new Bread(this, game.config.width/2 + 32, game.config.height - borderUISize - borderPadding, 'frozenbb', keyA, keyD, keyW).setOrigin(0.5, 0);
            // player 2 score
            this.p2Score = 0;
            this.scoreRight = this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding * 2, this.p2Score, scoreConfig);
        }

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('jammed', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
        
        // Game Over flag
        this.gameOver = false;
        
        // 60 second gameplay clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
        }
        if(this.mode == 2) {
            // check collisions player 2
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship03);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship01);
            }           
        }

        // update rocket and ships
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            if(this.mode == 2) {
                this.p2Rocket.update();
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(rocket, ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship position
        let boom = this.add.sprite(ship.x, ship.y, 'jammed').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // add score and repaint
        if(rocket == this.p1Rocket) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        if(rocket == this.p2Rocket && this.mode == 2) {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        this.sound.play('sfx_explosion');
    }
}