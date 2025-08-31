# main.py
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy

# Create Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your-secret-key'

# Initialize database
db = SQLAlchemy(app)

# Sample data for testing
projects_data = [
    {"id": 1, "name": "Website Redesign", "status": "In Progress"},
    {"id": 2, "name": "Mobile App", "status": "Planning"},
    {"id": 3, "name": "API Integration", "status": "Completed"}
]

# Create a simple test route
@app.route('/')
def home():
    return jsonify({"message": "It's working! 🎉"})

@app.route('/api/test')
def test():
    return jsonify({"message": "API is working!"})

# Auth routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    return jsonify({"message": "Registration endpoint ready!"})

@app.route('/api/auth/login', methods=['POST'])
def login():
    return jsonify({"message": "Login endpoint ready!"})

# Project routes - CORRECTED VERSION
@app.route('/api/projects', methods=['GET'])  # Fixed: @app.route NOT @app:route
def get_projects():
    return jsonify({
        "success": True,
        "count": len(projects_data),
        "projects": projects_data
    })

# Dashboard route
@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    print("✅ Server starting at http://127.0.0.1:5000")
    app.run(debug=True)