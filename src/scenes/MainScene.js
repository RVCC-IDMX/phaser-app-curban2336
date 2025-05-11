/* eslint-disable indent */
/* eslint-disable max-len */
import Phaser from 'phaser';

/**
 * MainScene - The primary scene for our game
 * This class handles all the main game logic, rendering, and interactions
 */
export default class MainScene extends Phaser.Scene {
  constructor() {
    // Scene key - used to start or reference this scene
    super('MainScene');

    // Initialize any properties here
    this.score = 0;
    this.gameOver = false;
  }

  /**
   * Preload - Called before the scene is created
   * Use this to load assets (images, sounds, etc.)
   */
  preload() {
    //  Images
    this.load.image('background', './assets/images/background.png');
    this.load.image('Blue-Scifi-Pillar', './assets/images/Blue-Scifi-Pillar.png');
    this.load.image('Green-Scifi-Pillar', './assets/images/Green-Scifi-Pillar.png');
    this.load.image('alienship', './assets/images/alienship.png');
    this.load.image('blast', './assets/images/Blast.png');

    //  Sprite Sheet
    // Load the player sprite sheet with calculated dimensions
    this.load.spritesheet('player', './assets/images/Player-Ship.png', {
      frameWidth: 72,   // Width of each frame
      frameHeight: 72   // Height of each frame
    });

    //  Audio
    // Load a sound effect for clicking
    this.load.audio('shoot', './assets/sounds/mixkit-sci-fi-click-900.wav');

    //  Animations
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,   // First frame
        end: 3      // Last frame (there are 10 frames total, 0-9)
      }),
      frameRate: 10,  // 10 frames per second
      repeat: -1      // -1 means loop indefinitely
    });

    // Set variables for wall and background movement
    this.columnSpeed = 80;
    this.parallax = 0.4;
    this.wallIndex = 0;
    this.sending = false;

    // Set variables for game loop
    this.isThrowing = false;
    this.levelCount = 0;

    // recollect Highscore
    this.highscore = this.registry.get('highscore');
  }

  /**
   * Create - Called once after preload is complete
   * Use this to create game objects and set up the scene
   */
  create() {
    // Add background image, stretching to fit the game canvas
    this.bg1 = this.add.tileSprite(0, 0, 0, 0, 'background').setOrigin(0, 0);

    //Scale to frame size
    this.bg1.setScale(2.5);

    // Create player using the new method
    this.createPlayer();

    //create blaster for projectiles
    this.createBlaster();

    //create walls
    this.createWalls();

    // Create cursor keys for input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add a score display
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '32px Arial',
      fill: '#ffffff'
    });

    this.highscoreText = this.add.text(680, 16, `Best: ${this.highscore}`, {
      fontFamily: 'Arial',
      fontSize: 32,
      color: '#ffffff'
    });
  }

  /**
* Create and configure the player character
*/
  createPlayer() {
    // Add player sprite at the left side of the screen
    this.player = this.physics.add.sprite(130, 450, 'player');

    // Enable physics body
    this.player.setCollideWorldBounds(true);

    // Adjust the physics body size for better collision
    // This creates a tighter collision box around the character
    this.player.body.setSize(
      this.player.width * 0.6,  // 60% of the sprite width
      this.player.height * 0.8  // 80% of the sprite height
    );

    this.player.setAngle(90);
  }

  /**
* Create and configure the blaster
*/
  createBlaster() {
    // Add blast sprite
    this.blast = this.physics.add.sprite(0, 0, 'blast');

    // Scale the blaster down (the sprite is too large)
    this.blast.setScale(0.5);

    // Adjust the physics body size for better collision
    // This creates a tighter collision box around the character
    this.blast.body.setSize(
      this.blast.width * 0.6,  // 60% of the sprite width
      this.blast.height * 0.8  // 80% of the sprite height
    );

    // Set damage for blaster
    this.blast.damage = 5;

    // turn off
    this.blast.setActive(false);
    this.blast.setVisible(false);
    this.blast.body.enable = false;
  }

  /**
* Create and configure the walls
*/
  createWalls() {
    // Add wall sprites
    this.wall1 = [this.physics.add.sprite(1000, 80, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 240, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 400, 'Green-Scifi-Pillar'), this.physics.add.sprite(1000, 560, 'Blue-Scifi-Pillar')];

    this.wall2 = [this.physics.add.sprite(1000, 80, 'Green-Scifi-Pillar'), this.physics.add.sprite(1000, 240, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 400, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 560, 'Blue-Scifi-Pillar')];

    this.wall3 = [this.physics.add.sprite(1000, 80, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 240, 'Green-Scifi-Pillar'), this.physics.add.sprite(1000, 400, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 560, 'Blue-Scifi-Pillar')];

    this.wall4 = [this.physics.add.sprite(1000, 80, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 240, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 400, 'Blue-Scifi-Pillar'), this.physics.add.sprite(1000, 560, 'Green-Scifi-Pillar')];

    // Scale the wall components down (the sprite is too large)
    this.wall1.forEach(element => {
      element.setScale(0.5);

      // Adjust the physics body size for better collision
      // This creates a tighter collision box around the character
      element.body.setSize(
        element.width * 0.7,  // 60% of the sprite width
        element.height * 0.8  // 80% of the sprite height
      );

      //turn off
      element.setActive(false);
      element.setVisible(false);
      element.body.enable = false;
    });

    this.wall2.forEach(element => {
      element.setScale(0.5);

      // Adjust the physics body size for better collision
      // This creates a tighter collision box around the character
      element.body.setSize(
        element.width * 0.7,  // 60% of the sprite width
        element.height * 0.8  // 80% of the sprite height
      );

      //turn off
      element.setActive(false);
      element.setVisible(false);
      element.body.enable = false;
    });

    this.wall3.forEach(element => {
      element.setScale(0.5);

      // Adjust the physics body size for better collision
      // This creates a tighter collision box around the character
      element.body.setSize(
        element.width * 0.7,  // 60% of the sprite width
        element.height * 0.8  // 80% of the sprite height
      );

      //turn off
      element.setActive(false);
      element.setVisible(false);
      element.body.enable = false;
    });

    this.wall4.forEach(element => {
      element.setScale(0.5);

      // Adjust the physics body size for better collision
      // This creates a tighter collision box around the character
      element.body.setSize(
        element.width * 0.7,  // 60% of the sprite width
        element.height * 0.8  // 80% of the sprite height
      );

      //turn off
      element.setActive(false);
      element.setVisible(false);
      element.body.enable = false;
    });
  }

  /**
   * Update - Called every frame
   * Use this for gameplay logic, movement, etc.
   * @param {number} time - Current time
   * @param {number} delta - Time since last frame
   */
  update(time, delta) {
    // The time parameter is the total elapsed time in milliseconds
    // The delta parameter is the time elapsed since the last frame

    // Run collision for player blast and green portions
    if (this.physics.overlap(this.blast, this.wall1[2])) {
      this.greenShot(0);
    }
    else if (this.physics.overlap(this.blast, this.wall2[0])) {
      this.greenShot(1);
    }
    else if (this.physics.overlap(this.blast, this.wall3[1])) {
      this.greenShot(2);
    }
    else if (this.physics.overlap(this.blast, this.wall4[3])) {
      this.greenShot(3);
    }

    // Then run collisions for player blast and blue portions
    if (this.physics.overlap(this.blast, this.wall1)) {
      this.stop();
    }
    else if (this.physics.overlap(this.blast, this.wall2)) {
      this.stop();
    }
    else if (this.physics.overlap(this.blast, this.wall3)) {
      this.stop();
    }
    else if (this.physics.overlap(this.blast, this.wall4)) {
      this.stop();
    }

    // Run collisions for player and blue portions
    if (this.physics.overlap(this.player, this.wall1)) {
      if (this.score > this.highscore) {
        this.registry.set('highscore', this.score);
      }
      this.scene.start('MainMenu');
    }
    else if (this.physics.overlap(this.player, this.wall2)) {
      if (this.score > this.highscore) {
        this.registry.set('highscore', this.score);
      }
      this.scene.start('MainMenu');
    }
    else if (this.physics.overlap(this.player, this.wall3)) {
      if (this.score > this.highscore) {
        this.registry.set('highscore', this.score);
      }
      this.scene.start('MainMenu');
    }
    else if (this.physics.overlap(this.player, this.wall4)) {
      if (this.score > this.highscore) {
        this.registry.set('highscore', this.score);
      }
      this.scene.start('MainMenu');
    }

    //run check to send wall
    if (time > 500 && !this.sending) {
      this.wallIndex = Math.floor(Math.random() * 4);
      this.sendWall(this.wallIndex);
      this.sending = true;
    }

    // Run check for wall reset
    if (this.wall1[0].x <= 0 || this.wall2[0].x <= 0 || this.wall3[0].x <= 0 || this.wall4[0].x <= 0 || this.wall1[2].x <= 0 || this.wall2[2].x <= 0 || this.wall3[2].x <= 0 || this.wall4[2].x <= 0) {
      this.score += 1;
      this.levelCount += 1;
      this.stopWalls();
    }

    // Establish player movement variables
    const speed = 500;  // Movement speed in pixels per second
    const halfHeight = this.player.height * 0.5 * this.player.scale;
    const worldHeight = this.scale.height;

    // Player animation
    this.player.anims.play('fly', true);

    //Parallax for background
    this.bg1.tilePositionX += this.parallax;

    // Player movement with caps at top and bottom of screen
    if (this.cursors.down.isDown && this.player.y > halfHeight - worldHeight) {
      this.player.setVelocityY(speed);
    } else if (this.cursors.up.isDown && this.player.y < worldHeight) {
      this.player.setVelocityY(-speed);
    } else {
      this.player.setVelocityY(0);
    }

    // Check for firing input
    if (this.cursors.space.isDown && !this.isThrowing) {
      this.isThrowing = true;
      this.fire(this.player.x, this.player.y);
    }

    // Blast border check
    if (this.blast.x >= 775) {
      this.stop();
    }
  }

  //  Wall Methods
  sendWall(index) {
    // Depending on the randomly generated index number, a different configuration of the wall is sent across the screen
    switch (index) {
      case 1:
        this.wall1.forEach(element => {
          element.setActive(true);
          element.setVelocityX(-this.columnSpeed);
          element.setVisible(true);
          element.body.enable = true;
        });
        break;
      case 2:
        this.wall2.forEach(element => {
          element.setActive(true);
          element.setVelocityX(-this.columnSpeed);
          element.setVisible(true);
          element.body.enable = true;
        });
        break;
      case 3:
        this.wall3.forEach(element => {
          element.setActive(true);
          element.setVelocityX(-this.columnSpeed);
          element.setVisible(true);
          element.body.enable = true;
        });
        break;
      case 4:
        this.wall4.forEach(element => {
          element.setActive(true);
          element.setVelocityX(-this.columnSpeed);
          element.setVisible(true);
          element.body.enable = true;
        });
        break;
      default:
        this.wall4.forEach(element => {
          element.setActive(true);
          element.setVelocityX(-this.columnSpeed);
          element.setVisible(true);
          element.body.enable = true;
        });
        break;
    }
  }

  stopWalls() {
    //Reset the walls position
    switch (this.wallIndex) {
      case 1:
        this.wall1.forEach(element => {
          element.setVelocityX(0);
          element.x = 1000;
          element.setActive(false);
          element.setVisible(false);
          element.body.enable = false;
        });
        break;
      case 2:
        this.wall2.forEach(element => {
          element.setVelocityX(0);
          element.x = 1000;
          element.setActive(false);
          element.setVisible(false);
          element.body.enable = false;
        });
        break;
      case 3:
        this.wall3.forEach(element => {
          element.setVelocityX(0);
          element.x = 1000;
          element.setActive(false);
          element.setVisible(false);
          element.body.enable = false;
        });
        break;
      case 4:
        this.wall4.forEach(element => {
          element.setVelocityX(0);
          element.x = 1000;
          element.setActive(false);
          element.setVisible(false);
          element.body.enable = false;
        });
        break;
      default:
        this.wall4.forEach(element => {
          element.setVelocityX(0);
          element.x = 1000;
          element.setActive(false);
          element.setVisible(false);
          element.body.enable = false;
        });
        break;
    }
    //modify score and reset sending check
    this.sending = false;
    this.scoreText.text = `Score: ${this.score}`;

    // If the score reaches a multiple of 5, increase the difficulty
    if (this.levelCount % 5 === 0) {
      this.increment();
      this.levelCount = 1;
    }
  }

  increment() {
    // Increase the speed of the walls passing and increase the speed of the parallax to match
    this.columnSpeed += 60;
    this.parallax += 0.2;
  }

  /**
   * When the Player Blast hits a green portion of the wall, remove that portion
   * @param {*} index the configuration of the wall
   */
  greenShot(index) {
    //reset player blast
    this.stop();
    //reset green portion of the wall
    switch (index) {
      case 0:
        this.wall1[2].setVelocityX(0);
        this.wall1[2].x = 1000;
        this.wall1[2].setActive(false);
        this.wall1[2].setVisible(false);
        this.wall1[2].body.enable = false;
        break;
      case 1:
        this.wall2[0].setVelocityX(0);
        this.wall2[0].x = 1000;
        this.wall2[0].setActive(false);
        this.wall2[0].setVisible(false);
        this.wall2[0].body.enable = false;
        break;
      case 2:
        this.wall3[1].setVelocityX(0);
        this.wall3[1].x = 1000;
        this.wall3[1].setActive(false);
        this.wall3[1].setVisible(false);
        this.wall3[1].body.enable = false;
        break;
      case 3:
        this.wall4[3].setVelocityX(0);
        this.wall4[3].x = 1000;
        this.wall4[3].setActive(false);
        this.wall4[3].setVisible(false);
        this.wall4[3].body.enable = false;
        break;
      default:
        break;
    }
  }

  //  Blaster Methods

  /**
   * Fire the blast and set the physics movement in place
   * @param {*} x the x coordinate of the player
   * @param {*} y the y coordinate of the player
   */
  fire(x, y) {
    this.blast.body.enable = true;
    this.blast.body.reset(x + 40, y);

    this.sound.play('shoot');

    this.blast.setActive(true);
    this.blast.setVisible(true);

    this.blast.setVelocityX(1500);
    this.blast.setAccelerationX(1400);
  }

  /**
   * Reset blast back to ready position and reset check bools for shooting
   */
  stop() {
    this.isThrowing = false;
    this.blast.setActive(false);
    this.blast.setVisible(false);

    this.blast.setVelocityX(0);
    this.blast.body.reset(this.player.x + 10, this.player.y);

    this.blast.body.enable = false;
  }
}