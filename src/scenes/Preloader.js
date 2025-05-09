/* eslint-disable max-len */
import Phaser from 'phaser';
export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');

    this.loadText;
  }

  preload() {
    this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
    this.loadText = this.add.text(400, 300, 'Loading ...', { fontFamily: 'Arial', fontSize: 74, color: '#e3f2ed' });
    this.loadText.setOrigin(0.5);
    this.loadText.setStroke('#203c5b', 6);
    this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);
    // Load the player sprite sheet with calculated dimensions
    this.load.spritesheet('player', 'assets/images/Player-Ship.png', {
      frameWidth: 72,   // Width of each frame
      frameHeight: 72   // Height of each frame
    });
  }

  create() {
    //  Create our global animations
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,   // First frame
        end: 4      // Last frame (there are 10 frames total, 0-9)
      }),
      frameRate: 10,  // 10 frames per second
      repeat: -1      // -1 means loop indefinitely
    });

    this.scene.start('MainMenu');
  }
}