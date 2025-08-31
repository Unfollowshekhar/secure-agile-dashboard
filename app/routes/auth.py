# app/routes/auth.py
from flask import Blueprint, request, jsonify
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])  # Fixed: methods=['POST']
def register():
    return jsonify({"message": "Register endpoint will be here"})  # Fixed: use {} not []

@auth_bp.route('/login', methods=['POST'])  # Fixed: methods=['POST']
def login():
    return jsonify({"message": "Login endpoint will be here"})  # Fixed: use {} not []