from flask import render_template, request, jsonify
import pdfkit
from DB.database import db
from models.user_model import User
from models.history_model import History
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
import os
from services.symptoms_predict_services import predict as form_serv
from services.image_predict_services import predict as image_serv

normal_advice = "The analysis does not show signs commonly associated with pneumonia. This is a reassuring result. However, this system is intended to assist with preliminary screening and should not replace a professional medical evaluation. If you are experiencing symptoms such as persistent cough, fever, chest pain, or difficulty breathing, it is still recommended to consult a healthcare professional for proper assessment. Maintaining a healthy lifestyle, staying hydrated, and seeking medical advice when symptoms appear are important steps for protecting your respiratory health."

pneumonia_advice = "The analysis suggests a possible indication of pneumonia. There is no need to panic, as many cases of pneumonia can be successfully treated when medical care is received in time. It is recommended that you get adequate rest, drink plenty of fluids, and avoid smoking or strenuous physical activity. Please monitor your symptoms, especially fever, persistent cough, chest discomfort, or shortness of breath. Most importantly, you should visit a qualified healthcare professional as soon as possible for a proper medical examination and accurate diagnosis. Early medical evaluation and appropriate treatment greatly improve recovery and help prevent complications."

def create_report(report_data):
  rendered = render_template("report_temp.html", **report_data)
  
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  new_filename = f"{report_data['user_id']}_{timestamp}.pdf"
  
  path = os.path.join('reports', new_filename)
  
  pdfkit.from_string(rendered, path)
  return new_filename

def predict_from_form(user_id):
  try:
    # get user by id (id from token not in body) 
    user = User.query.get(user_id)
    data = request.get_json()
    # predict diagnosis based on form data and get advice and next checkup date based on diagnosis
    diagnosis = form_serv(data)
    advice = normal_advice
    next_checkup = None
    if diagnosis == "pneumonia":
      next_checkup = datetime.now() + timedelta(days=7)
      advice = pneumonia_advice
    date = datetime.now()
    check_type = "symptoms_form"
    # no image in this case
    image_url = None
    # create report and save in reports folder and return the path
    report_path = create_report({
      "user_id": user_id,
      "report_date": date,
      "name": user.name,
      "email": user.email,
      "age": user.age,
      "phone": user.phone,
      "check_type": check_type,
      "diagnosis": diagnosis,
      "advice": advice,
      "gender":user.gender
    })
    # update user next checkup date based on diagnosis
    user.next_check = next_checkup 
    db.session.add(user)
    # create new history record and save in database
    new_history = History(
      user_id=user_id,
      date=date,
      diagnosis=diagnosis,
      check_type=check_type,
      advice=advice,
      image_url=image_url,
      report_url=report_path,
    )

    db.session.add(new_history)
    db.session.commit()

    return jsonify({"diagnosis": diagnosis, "advice": advice, "report_url":report_path}), 201
  except Exception as e:
    db.session.rollback()
    return jsonify({"error": "An error occurred while processing the request."}), 500


def predict_from_image(user_id):
  try:
    # get user by id (id from token not in body) 

    user = User.query.get(user_id)
    if "image" not in request.files:
      return jsonify({"error": "image not found", }), 400

    image = request.files.get("image") 
    original_filename = secure_filename(image.filename)
    
    name, extension = os.path.splitext(original_filename)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    new_filename = f"{name}_{timestamp}{extension}"
    
    image_path = os.path.join('uploads', new_filename)
    
    image.save(image_path)
    # predict diagnosis based on uploaded Image and get advice and next checkup date based on diagnosis
    diagnosis = image_serv(image_path)
    next_checkup = None
    advice = normal_advice
    if diagnosis == "pneumonia":
      next_checkup = datetime.now() + timedelta(days=7)
      advice = pneumonia_advice
    date = datetime.now()
    check_type = "X-ray image"
    # create report and save in reports folder and return the path
    report_path = create_report({
      "user_id": user_id,
      "report_date": date,
      "name": user.name,
      "email": user.email,
      "age": user.age,
      "phone": user.phone,
      "check_type": check_type,
      "diagnosis": diagnosis,
      "advice": advice,
      "gender":user.gender
    })
    # update user next checkup date based on diagnosis
    user.next_check = next_checkup
    db.session.add(user)
    # create new history record and save in database
    new_history = History(
      user_id=user_id,
      date=date,
      diagnosis=diagnosis,
      check_type=check_type,
      advice=advice,
      image_url=new_filename,
      report_url=report_path,
    )

    db.session.add(new_history)
    db.session.commit()

    return jsonify({"diagnosis": diagnosis, "advice": advice , "report_url":report_path}), 201
  except Exception as e:
    db.session.rollback()
    return jsonify({"error": "An error occurred while processing the request."}), 500
