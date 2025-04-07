# Bottle Recycler

A simple game, where the player can buy one or more bottle recyclers where people deposit bottles of different types. As the recycler is running, it can malfunction caused by a jam in the machine.
The player will have to fix the jam by fixing it or emptying the machine completely. When emptied, money is earned.
The game will increase in difficulty after the timer have run out. To get more money, the player will have to buy more recyclers and manage them.

## Packages and technologies used

Trying to create a larger application, using React and the tools I like to try out.

- Basic React
- Playwright
- Material UI
- CI/CD github actions

## Components

Manager - Can create recyclers.

Recycler - Machine that accepts 3 different types of bottles to be recycled. It can also display the total amount of each type of bottle it has accepted so far, but when it gets full it need to be emptied.

![Screenshot](./doc/image.png)
