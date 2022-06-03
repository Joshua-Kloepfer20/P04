# Clyde 'Thluffy' Sinclair
# SoftDev
# Oct 2021

from flask import Flask, render_template
import os

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='static')
    # Configure app key & DB location
    app.config.from_mapping(
        SECRET_KEY = os.urandom(32),
    )
    return app

app = create_app()

@app.route("/")
def home():
    return render_template( 'index.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
