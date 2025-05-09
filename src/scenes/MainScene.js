
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
    this.load.setPath('assets/images/');
    this.load.image(['background', 'Blue-Scifi-Pillar', 'Green-Scifi-Pillar', 'alienship']);

    //  Sprite Sheet
    // Load the player sprite sheet with calculated dimensions
    this.load.spritesheet('player', 'assets/images/Player-Ship.png', {
      frameWidth: 72,   // Width of each frame
      frameHeight: 72   // Height of each frame
    });

    //  Audio
    // Load a sound effect for clicking
    this.load.audio('shoot', 'assets/sounds/mixkit-sci-fi-click-900.wav');
  }

  /**
   * Create - Called once after preload is complete
   * Use this to create game objects and set up the scene
   */
  create() {
    // Add background image, stretching to fit the game canvas
    this.bg1 = this.add.tileSprite(0, 0, 2400, 1800, 'background').setOrigin(0, 0);
    this.bg2 = this.add.tileSprite(800, 0, 2400, 1800, 'background').setOrigin(0, 0);

    // Create player using the new method
    this.createPlayer();

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
    this.player = this.physics.add.sprite(170, 450, 'player');

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

    // Center the physics body
    this.player.body.setOffset(
      this.player.width * 0.2,  // 20% offset from left
      this.player.height * 0.2  // 20% offset from top
    );
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

    // This is where you'd put code that needs to run every frame
    // For example, checking for collisions, movement, etc.

    // For now, we'll leave it empty or add basic debugging
    // console.log('Update called', time, delta);
  }
}