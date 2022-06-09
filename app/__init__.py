from flask import Flask, render_template, session, request, redirect
from os import urandom
import sqlite3

import auth

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='static')
    # Configure app key & DB location
    app.config.from_mapping(
        SECRET_KEY = urandom(32),
    )
    return app

app = create_app()
app.register_blueprint(auth.bp)

@app.route("/",  methods=['GET', 'POST'])
def home():
    if auth.logged_in():
        return redirect("/game")
    return render_template('landing.html')

@app.route("/game")
def game():
    if (not auth.logged_in()):
        return redirect("/")
    auth.make_users
    return render_template('game.html', user=session["username"])

if __name__ == "__main__":
    app.debug = True
    app.run()
