# Tic Tac Toe

Minimal Tic Tac Toe game built with React. Explicit state management, allowing instant change of previous game history states. An experimental and educational project.

The game implements features such as:

- State time-travel – navigate through every move and observe the board change instantly.
- Deterministic UI – completely derived from the game state.
- Modern and minimal UI – visible transitions and color highlights for each interaction.

> [Live demo](https://theparitet.github.io/tic-tac-toe-react/)

<img src="https://github.com/theparitet/tic-tac-toe-react/blob/main/assets/demo-1.png?raw=true" width="300" alt="image showing tic tac toe game"> <img src="https://github.com/theparitet/tic-tac-toe-react/blob/main/assets/demo-2.png?raw=true" width="300" alt="image showing tic tac toe game">

## Tech

- React 19 (`create-react-app`*)
- JavaScript
- GitHub Pages (deploying the build from `docs/` folder)

\* – `create-react-app` is a legacy, deprecated tool that is only meant for small, experimental projects like this one.

## Run & Build

Clone the repo your preferred way. We will clone using SSH:
```bash
git clone git@github.com:theParitet/tic-tac-toe-react.git
```

Then go to the project's directory and install dependencies:
```bash
cd tic-tac-toe-react
npm install
```

To run the application on local host:
```bash
npm start
```

To build the application at `build/` folder:
```bash
npm run build
```

## Background

This was my first project building with React.

Based on the official [React documentation tutorial](https://react.dev/learn/tutorial-tic-tac-toe).
