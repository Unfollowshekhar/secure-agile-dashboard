# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'fallback-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    CORS(app)
    
    # Register blueprints (we'll add these later)
    try:
        from app.routes.auth import auth_bp
        from app.routes.projects import projects_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(projects_bp, url_prefix='/api/projects')
    except ImportError:
        # Blueprints not ready yet, that's okay
        pass
    
    return app