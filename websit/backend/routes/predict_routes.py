from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers.predict_controller import predict_from_form , predict_from_image

predict_bp = Blueprint('predict_bp', __name__)

# (get_jwt_identity is used to get user id from token and not from body , 
# jwt_required is used to protect the route and make sure that only authenticated users can access it)

# predict from form data route
@predict_bp.route("/form", methods=["POST"])
@jwt_required()
def form():
  return predict_from_form(get_jwt_identity())

# predict from image data route
@predict_bp.route("/image", methods=["POST"])
@jwt_required()
def img():
  return predict_from_image(get_jwt_identity())