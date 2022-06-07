from flask import Flask, render_template, session, request, redirect
from os import urandom
import sqlite3

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='static')
    # Configure app key & DB location
    app.config.from_mapping(
        SECRET_KEY = urandom(32),
    )
    return app

app = create_app()

app.secret_key = urandom(32)

@app.route("/")
def test_tmplt():
    db = sqlite3.connect("users.db")
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users(Username TEXT, Password TEXT, HighScore INT, UNIQUE(username))")
    db.commit()
    db.close()
    return render_template('index.html', user="test_user")


if __name__ == "__main__":
    app.debug = True
    app.run()
