
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
    this.columnSpeed = 0.5;
    this.parallax = 0.4;
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

    // Create cursor keys for input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add a score display
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '32px Arial',
      fill: '#ffffff'
    });
  }

  /**
* Create and configure the player character
*/
  createPlayer() {
    // Add player sprite at the left side of the screen
    this.player = this.physics.add.sprite(130, 450, 'player');

    // Scale the player down (the cat sprite is quite large)
    //this.player.setScale(0.5);

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
   * Update - Called every frame
   * Use this for gameplay logic, movement, etc.
   * @param {number} time - Current time
   * @param {number} delta - Time since last frame
   */
  update(time, delta) {
    // The time parameter is the total elapsed time in milliseconds
    // The delta parameter is the time elapsed since the last frame

    const speed = 500;  // Movement speed in pixels per second
    const halfHeight = this.player.height * 0.5 * this.player.scale;
    const worldHeight = this.scale.height;

    this.player.anims.play('fly', true);

    this.bg1.tilePositionX += this.parallax;

    if (this.cursors.down.isDown && this.player.y > halfHeight - worldHeight) {
      this.player.setVelocityY(speed);
    } else if (this.cursors.up.isDown && this.player.y < worldHeight) {
      this.player.setVelocityY(-speed);
    } else {
      this.player.setVelocityY(0);
    }

    // This is where you'd put code that needs to run every frame
    // For example, checking for collisions, movement, etc.

    // For now, we'll leave it empty or add basic debugging
    // console.log('Update called', time, delta);
  }
}