# Clyde 'Thluffy' Sinclair
# SoftDev
# Oct 2021

from flask import Flask, render_template, session, request, redirect
from os import urandom
import sqlite3
app = Flask(__name__)

app.secret_key = urandom(32)

@app.route("/")
def test_tmplt():
    db = sqlite3.connect("users.db")
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users(Username TEXT, Password TEXT, HighScore INT, UNIQUE(username))")
    db.commit()
    db.close()
    return render_template( 'index.html')
def islogged():
    return 'username' in session.keys()
@app.route("/logout",  methods=['GET', 'POST'])
def logout():
    try:
        session.pop('username')
        session.pop('password')
    except KeyError:
        return redirect("/")
    return redirect("/")
@app.route("/login",  methods=['GET', 'POST'])
def login():
    if islogged():
        return redirect("/")
    db = sqlite3.connect("users.db")
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users(Username TEXT, Password TEXT, HighScore INT, UNIQUE(username))")
    db.commit()
    db.close()
    return render_template('login.html')
@app.route("/register", methods=['GET', 'POST'])
def register():
    if (request.method == 'POST'):
        username = request.form.get("username")
        password = request.form.get("password")
        reenterpasswd = request.form.get("reenterpasswd")

        if username == '':
            return render_template("register.html", error="Empty username, who are you?")
        elif password == '':
            return render_template("register.html", error="Empty password, you'll get hacked y'know :)")
        elif password != reenterpasswd:
            return render_template("register.html", error="Passwords don't match")

        db = sqlite3.connect('users.db')
        c = db.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS users(Username TEXT, Password TEXT, HighScore INT, UNIQUE(username))")
        c.execute("SELECT username FROM users WHERE username=?", (username,))

        if (c.fetchone() == None):
            c.execute("INSERT INTO users(username, password, HighScore) VALUES(?, ?, 0)", (username, password))


        else:
            return render_template("register.html", error="Username taken already")
        db.commit()
        db.close()
        return redirect("/login")
    else:
        return render_template("register.html")
@app.route("/auth", methods=['GET', 'POST'])
def auth():
    if (request.method == 'POST'):

        username = request.form.get("username")
        password = request.form.get("password")

        if username == '':
            return render_template("login.html", error="Empty username, who are you?")

        db = sqlite3.connect('users.db')
        c = db.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS users(Username TEXT, Password TEXT, HighScore INT, UNIQUE(username))")
        c.execute("SELECT username FROM users WHERE username=? ", (username,)) 
        if c.fetchone() == None:
            return render_template("login.html", error="Wrong username, double check spelling or register")
        else:
            c.execute("SELECT password FROM users WHERE username=? ", (username,))
            if ( ''.join(c.fetchone()) ) != password:
                return render_template("login.html", error="Wrong password")
            else:
                session['username'] = username
                session['password'] = password
                print(session['username'])
        db.close()
        return redirect('/')

    #get method
    else:
        return redirect('/login')


if __name__ == "__main__":
    app.debug = True
    app.run()