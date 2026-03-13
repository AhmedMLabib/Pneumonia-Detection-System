from flask import Flask
from flask_cors import CORS
from DB.database import db
from models.user_model import User
from models.history_model import History
from flask_jwt_extended import JWTManager
from routes.predict_routes import predict_bp
from routes.user_routes import user_bp
from routes.media_routes import media_bp

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'pI1D5TdfY3Ep7RrxvhRIrOKB57aS59rrVGaxyKaVbyy' 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# initialize JWT manager and database
jwt = JWTManager(app)
db.init_app(app)

# routes               route bp  , url_prefix add prefix to all routes in this blueprint
app.register_blueprint(predict_bp, url_prefix="/predict")
app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(media_bp, url_prefix="/media")

# create database tables if not exist
with app.app_context():
  db.create_all()

# enable CORS for all routes and origins
CORS(app)


# @app.route("/reports/<filename>")
# @jwt_required()
# def get_report(filename):
#   return send_from_directory("reports", filename)

# @app.route("/uploads/<filename>")
# @jwt_required()
# def get_image(filename):
#   return send_from_directory("uploads", filename)

# run the app
if __name__ == "__main__":
  app.run(debug=True , port=3000)