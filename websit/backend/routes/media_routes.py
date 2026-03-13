from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask import send_from_directory


media_bp = Blueprint('media_bp', __name__)

# (get_jwt_identity is used to get user id from token and not from body , 
# jwt_required is used to protect the route and make sure that only authenticated users can access it)


@media_bp.route("/reports/<filename>")
@jwt_required()
def get_report(filename):
  return send_from_directory("reports", filename)

@media_bp.route("/uploads/<filename>")
@jwt_required()
def get_image(filename):
  return send_from_directory("uploads", filename)