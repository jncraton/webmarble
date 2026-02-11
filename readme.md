# Marble Run Sandbox

[![Release](https://github.com/jncraton/webmarble/actions/workflows/release.yml/badge.svg)](https://github.com/jncraton/webmarble/actions/workflows/release.yml)
[![Deploy](https://github.com/jncraton/webmarble/actions/workflows/deploy.yml/badge.svg)](https://github.com/jncraton/webmarble/actions/workflows/deploy.yml)
[![Test](https://github.com/jncraton/webmarble/actions/workflows/test.yml/badge.svg)](https://github.com/jncraton/webmarble/actions/workflows/test.yml)
[![Lint](https://github.com/jncraton/webmarble/actions/workflows/lint.yml/badge.svg)](https://github.com/jncraton/webmarble/actions/workflows/lint.yml)

A simple interactive web-based marble run game.

[Demo](https://jncraton.github.io/webmarble/)

## Usage

Select a tool from the palette and click on the canvas to place parts or drop marbles.

- Marble: Drops a red marble
- Line: Click and drag to draw a static line segment at any angle
- Fountain: Places a blue square that automatically spawns marbles every 0.5 seconds
- Trash: Clears all dynamic objects and fountains from the sandbox

## Saving

The current layout is continuously saved in the URL fragment. You can bookmark the page or share the URL to save and load your creations.

## Simulation Rules

- Maximum of 256 marbles at a time. The oldest marble is removed when the limit is reached.
- Marbles that fall below the screen are automatically removed from the simulation.

## Development

```bash
make
```

## Testing

```bash
make test
```
