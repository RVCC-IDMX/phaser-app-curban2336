import Phaser from 'phaser';
export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  preload() {
    this.load.image('phaser-logo-200x150', './assets/images/phaser-logo-200x150.png');
    this.load.image('background', './assets/images/background.png');

    //  Sprite Sheet
    // Load the player sprite sheet with calculated dimensions
    this.load.spritesheet('player', './assets/images/Player-Ship.png', {
      frameWidth: 72,   // Width of each frame
      frameHeight: 72   // Height of each frame
    });
  }

  create() {
    //  Intro Menu
    // Add background image, stretching to fit the game canvas
    this.add.image(401, 300, 'background').setDisplaySize(800, 600);
    const logo = this.add.image(1000, 300, 'phaser-logo-200x150');

    // Add a title text
    this.add.text(400, 150, 'Sci-Fi Shooter', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Add instructions
    this.add.text(400, 400, 'Press any key to start', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    this.add.text(400, 450, 'Arrows to move up and down', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    this.add.text(400, 500, 'Spacebar to shoot', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Add animation for phaser logo
    this.tweens.add({
      targets: logo,
      x: 400,
      ease: 'back.out',
      delay: 500,
      duration: 600,
    });

    // Insert commands to move to the main game
    this.input.keyboard.once('keydown-SPACE', () => {

      this.scene.start('MainScene');

    }, this);

    this.input.once('pointerdown', () => {

      this.scene.start('MainScene');

    });
  }
}