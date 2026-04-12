from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.user_controller import create_doctor, get_all_users, get_users_names, get_users_reports, register, login , get_user_info, remove_user

user_bp = Blueprint('user_bp', __name__)

# register route
@user_bp.route("/register", methods=["POST"])
def reg():
  return register()

# login route
@user_bp.route("/login", methods=["POST"])
def log():
  return login()

# (get_jwt_identity is used to get user id from token and not from body , 
# jwt_required is used to protect the route and make sure that only authenticated users can access it)

# get user info 
@user_bp.route("/info", methods=["GET"])
@jwt_required()
def inf():
  return get_user_info(get_jwt_identity())



@user_bp.route("/create_doctor", methods=["POST"])
@jwt_required()
def create_doc():
  return create_doctor(get_jwt_identity())

@user_bp.route("/get_all_users", methods=["GET"])
@jwt_required()
def get_all_users_route():
  return get_all_users(get_jwt_identity())


@user_bp.route("/remove_user/<int:user_id>", methods=["DELETE"])
@jwt_required()
def remove_user_route(user_id):
  return remove_user(user_id ,get_jwt_identity())


@user_bp.route("/get_users_reports/<int:user_id>", methods=["GET"])
@jwt_required()
def get_users_reports_route(user_id):
  return get_users_reports(user_id , get_jwt_identity())

@user_bp.route("/get_users_names", methods=["GET"])
@jwt_required()
def get_users_names_route():
  return get_users_names(get_jwt_identity())