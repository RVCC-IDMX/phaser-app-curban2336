import Phaser from 'phaser';
export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    // establish the highscore global in the registry
    this.registry.set('highscore', 0);

    this.scene.start('Preloader');
  }
}