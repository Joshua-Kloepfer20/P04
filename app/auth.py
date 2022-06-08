from flask import Flask, Blueprint, request, session, render_template, redirect, g
from functools import wraps
import os, sqlite3, json, urllib

bp = Blueprint('auth', __name__)

def logged_in():
    """Returns whether a user is logged in or not."""
    print(session.keys())
    return 'username' in session.keys()

def guest_only(f):
    """Denotes a page where users that are not logged in can access."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if logged_in():
            return redirect("/")
        return f(*args, **kwargs)
    return decorated_function

def make_users():
    db = sqlite3.connect("users.db")
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users(Username TEXT, Password TEXT, HighScore INT, UNIQUE(username))")
    db.commit()
    db.close()

@guest_only
@bp.route("/login", methods=['GET', 'POST'])
def login():
    if logged_in():
        return redirect("/game")

    make_users()
    return render_template('login.html')

@guest_only
@bp.route("/register", methods=['GET', 'POST'])
def register():
    if (request.method == 'POST'):
        username = request.form.get("username")
        password = request.form.get("password")
        reenterpasswd = request.form.get("reenterpasswd")

        if username == '':
            return render_template("register.html", error="Username cannot be empty")
        elif password == '':
            return render_template("register.html", error="Password cannot be empty")
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
        return redirect("/")
    else:
        return render_template("register.html")
        
@guest_only        
@bp.route("/auth", methods=['GET', 'POST'])
def auth():
    if (request.method == 'POST'):

        username = request.form.get("username")
        password = request.form.get("password")

        if username == '':
            return render_template("login.html", error="Username cannot be empty")
        elif password == '':
            return render_template("login.html", error="Password cannot be empty")

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
                # print(session['username'])
        db.close()
        return redirect('/game')

    else:
        return redirect('/login.html')

@bp.route('/logout', methods=['GET', 'POST'])
def logout():
    if logged_in():
        session.pop('username')
    return redirect("/")
