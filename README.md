# Untitled Circle Game by Marvelous Moles

## Description
A game that mimics Agar.io, an endless game about growing bigger by eating other players.  Players will be able to play on a multiplayer server with other players and eat their friends. They will also be able to login to save their highscores to a global leaderboard.

## Roles
* Lia - game mechanics (JS), backend
js
  * Keeping track of coordinates
  * Determining when/how eating, ejections and splits occur
  * Spawning viruses, players and agar
* Michael - multiplayer (JS)
  * Setting up client-server connection
  * Making sure game mechanics work in multiplayer
  * Also working on certain game mechanics
* Daniel - front-end (HTML/CSS)
  * Login/Register page
  * Overlay for game page
  * Assets for game
* Joshua (PM) - database integration, game mechanics (JS, SQL)
  * Leaderboard
  * Other game mechanics that need implementation

## APIs
No APIs used thus far.

## Launch Codes - Run Locally
### Run Client-Facing Server
#### Clone Repository

Clone this repository to your computer with ssh link:
```
$ git clone git@github.com:Joshua-Kloepfer20/P04.git
```

#### Set up a Virtual Environment

1. Create a virtual environment
  ```
  $ python3 -m venv <path_to_virtual_environment>
  ```

2. Activate the virtual environment
  ```
  $ . <path_to_virtual_environment>/bin/activate
  ```

#### Install Libraries Contained in ``` requirements.txt```

```
(<venv_name>)$ cd <path_to_P04>
(<venv_name>)$ pip3 install -r requirements.txt 
```

#### Run Program

```
(<venv_name>)$ cd <path_to_P04>/app
(<venv_name>)$ python __init__.py
```
### Run Node.js Backend Server
```
$ cd <path_to_P04>
$ node app.js
```
### Launch Site

Go to http://127.0.0.1:5000/ in your browser, since this is where the Flask server is running.
The Node.js server runs on http://127.0.0.1:3000/, but a client will never need to access it directly.

## Launch Codes - Don't Run Locally

Go to http://192.34.56.31/p4 or softdev.miczuk.com/p4. 

