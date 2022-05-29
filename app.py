# Clyde 'Thluffy' Sinclair
# SoftDev
# Oct 2021

from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def test_tmplt():
    return render_template( 'index.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
