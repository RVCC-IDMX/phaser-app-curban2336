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
    // Load the Phaser logo image
    this.load.image('logo', 'assets/images/phaser-logo-200x150.png');

    // Load a sound effect for clicking
    this.load.audio('click', 'assets/sounds/mixkit-sci-fi-click-900.wav');
  }

  /**
   * Create - Called once after preload is complete
   * Use this to create game objects and set up the scene
   */
  create() {
    // Add a title
    this.add.text(400, 100, 'Hello Phaser!', {
      font: '64px Arial',
      fill: '#11ff66'
    }).setOrigin(0.5);

    // Add background details or instructions
    this.add.text(400, 180, 'My First Phaser Game', {
      font: '24px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Add the Phaser logo image to the center of the screen
    const logo = this.add.image(400, 300, 'logo');

    // Make the logo interactive
    logo.setInteractive();

    // Add click handler
    logo.on('pointerdown', () => {
      console.log('Logo clicked!');

      if (!this.gameOver) {
        // Play sound when clicked
        this.sound.play('click');

        // Update score
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
      }
    });

    // Add hover effects
    logo.on('pointerover', () => {
      logo.setScale(1.1);  // Make logo slightly bigger on hover
    });

    logo.on('pointerout', () => {
      logo.setScale(1.0);  // Return to normal size when not hovering
    });

    //add movement to logo
    this.tweens.add({
      targets: logo,
      x: 200,
      y: 420,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });

    //add countdown to game over
    this.timeLeft = 30; // 30 seconds
    this.timeText = this.add.text(16, 60, 'Time: 30', {
      font: '32px Arial',
      fill: '#ffffff'
    });

    // Create a timer event
    this.time.addEvent({
      delay: 1000, // 1000ms = 1 second
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Add a score display
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '32px Arial',
      fill: '#ffffff'
    });

    // Add instructions
    this.add.text(400, 500, 'Click the logo to increase your score!', {
      font: '18px Arial',
      fill: '#024f9f'
    }).setOrigin(0.5);
  }

  /**
   * updateTimer - updates timer and checks for game over conditions
   */
  updateTimer() {
    this.timeLeft--;
    this.timeText.setText(`Time: ${this.timeLeft}`);

    if (this.timeLeft <= 0) {
      // Game over logic
      this.add.text(400, 300, 'GAME OVER', {
        font: '64px Arial',
        fill: '#ff0000'
      }).setOrigin(0.5);

      const reset = this.add.rectangle(400, 400, 200,
        100, 0xff0000).setOrigin(0.5);

      this.add.text(400, 400, 'Click to Reset', {
        font: '18px Arial',
        fill: '#ffffff'
      }).setOrigin(0.5);

      //make interactive
      reset.setInteractive();

      // Add click handler, full reset of game
      reset.on('pointerdown', () => {
        this.score = 0;
        this.gameOver = false;
        this.children.removeAll();
        this.create();
      });

      // Add hover effects
      reset.on('pointerover', () => {
        reset.setScale(1.1);  // Make reset button slightly bigger on hover
      });

      reset.on('pointerout', () => {
        reset.setScale(1.0);  // Return to normal size when not hovering
      });

      // Stop the timer
      this.time.removeAllEvents();

      //turn off click mechanic
      this.gameOver = true;
    }
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