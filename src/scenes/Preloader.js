/* eslint-disable max-len */
import Phaser from 'phaser';
export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');

    this.loadText;
  }

  preload() {
    //Make a simple loading screen
    this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
    this.loadText = this.add.text(400, 300, 'Loading ...', { fontFamily: 'Arial', fontSize: 74, color: '#e3f2ed' });
    this.loadText.setOrigin(0.5);
    this.loadText.setStroke('#203c5b', 6);
    this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);
  }

  create() {
    this.scene.start('MainMenu');
  }
}