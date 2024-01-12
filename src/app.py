import os
import datetime
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, User
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv() # cargar las variables de entorno
app = Flask(__name__)

app.config['DEBUG'] = True # Permite ver los errores
app.config['ENV'] = 'development' # Activa el servidor en modo desarrollo
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI') # Leemos la url de conexion a la base de datos
# Configuracion de JWT
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

db.init_app(app)
CORS(app)
Migrate(app, db) # db init, db migrate, db upgrade, db downgrade
jwt = JWTManager(app)


@app.route('/')
def main():
    return jsonify({ "status": "Server Up"}), 200

@app.route('/iniciar-sesion', methods=['POST'])
def login():
    email = request.json.get("email")  # Cambié 'username' a 'email'
    password = request.json.get("password")

    if not email or not password:
        return jsonify({ "msg": "Email y contraseña son obligatorios!"}), 400

    user_found = User.query.filter_by(email=email).first()

    if not user_found:
        return jsonify({ "msg": "Email/password son incorrectos!"}), 401

    if not check_password_hash(user_found.password, password):
        return jsonify({ "msg": "Email/password son incorrectos!"}), 401

    expires = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user_found.id, expires_delta=expires)

    data = {
        "access_token": access_token,
        "user": user_found.serialize()
    }

    return jsonify(data), 200


@app.route('/crear-cuenta', methods=['POST'])
def register():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")

    if not username or not email or not password:
        return jsonify({ "msg": "Todos los campos son obligatorios!"}), 400

    userFound = User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first()

    if userFound:
        return jsonify({ "msg": "El nombre de usuario o correo electrónico ya está siendo usado!"}), 400

    user = User()
    user.username = username
    user.email = email
    user.password = generate_password_hash(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({ "success": "Registro con éxito, por favor iniciar sesión!"}), 200

@app.route('/private', methods=['GET'])
@jwt_required() # convierte el endpoint en una ruta privada
def private():

    # Saber quien es el usuario podemos hacerlo de la siguiente manera
    id = get_jwt_identity() # devuelve el valor unico del usuario
    user = User.query.get(id)

    return jsonify({ "success": { "user": user.serialize() }}), 200



if __name__ == '__main__':
    app.run()