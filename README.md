# Phaser App: Sci-fi Shooter

This project is a simple side scrolling shooter game using javascript and Phaser. Assets imported and sourced below are used to facilitate the science fiction nature of the game. Pillars will scroll across the screen, shoot the green one to pass. Every 5 walls a boss will appear. After beating them the next set of 5 walls and the next boss become faster. See how long you can last in this escalating shooter game.

## Sources and Credits

- [Alien Ship by MillionthVector](https://opengameart.org/content/green-alien-spaceship)
- [Background by ansimuz](https://ansimuz.itch.io/warped-sci-fi-lab)
- [Pillars by FunwithPixels](https://opengameart.org/content/sci-fi-blue-pillar)
  - Pillar modified with green overlay for Green Pillar
- [Player Ship by Keleborn](https://opengameart.org/content/spaceship-1-0)

- Code base utilizes the following:
  - https://phaser.io/examples/v3.85.0/games/view/snowmen-attack
  - https://github.com/RVCC-IDMX/phaser-app-curban2336
  - https://github.com/RVCC-IDMX/sprite-animation-curban2336
  - https://github.com/RVCC-IDMX/hello-phaser-curban2336
  - https://github.com/RVCC-IDMX/breakout-curban2336

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- NPM (v8 or higher)

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

### Running the Game

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and go to: `http://localhost:3000`

## Project Structure

```
phaser-app/
├── public/               # Static assets
│   └── assets/
│       ├── images/       # Game images and sprites
│       └── sounds/       # Game audio files
├── src/                  # Source code
│   ├── main.js           # Game entry point
│   └── scenes/
│       └── MainScene.js  # Main game scene
├── index.html            # Game HTML wrapper
├── package.json          # Project dependencies
└── vite.config.mjs       # Vite configuration
```

## Project Tasks

- [ ] Set up the Phaser game configuration
- [ ] Create a main scene
- [ ] Load and display at least two images
- [ ] Add text elements
- [ ] Implement basic interactivity (clicking, hovering)
- [ ] Add a simple scoring system

## Resources Used

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser 3 Examples](https://phaser.io/examples)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgements

- Phaser.io for the amazing game framework
- Richard Davey (Photonstorm) for creating and maintaining Phaser