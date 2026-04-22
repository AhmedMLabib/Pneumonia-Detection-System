from flask_jwt_extended import create_access_token
from flask import request, jsonify
from DB.database import db
from models.history_model import History
from models.user_model import User
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from werkzeug.utils import secure_filename
import os
from config import BASE_DIR

def register():
  data = request.form # data sent from frontend (data.form because it contains image)
  
  if User.query.filter_by(email=data.get('email')).first():
    return jsonify({"message": f"can not register with this email '{data['email']}'"}), 400
  
  # get image from request and save it to uploads folder with unique name
  image = request.files.get("image") if "image" in request.files else None
  original_filename = secure_filename(image.filename)
  name, extension = os.path.splitext(original_filename)
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  new_filename = f"{name}_{timestamp}{extension}"
  image_path = os.path.join(BASE_DIR, "uploads", new_filename)
  image.save(image_path)
  # hash the password before saving user to database
  password = data.get('password')
  if not password:
    return jsonify({"message": "Password is required"}), 400
  hashed_password = generate_password_hash(password)
  next_check_dt = None

  new_user = User(
    name=data.get('name'),
    email=data.get('email'),
    password_hash=hashed_password,
    age=data.get('age'),
    next_check=next_check_dt,
    phone=data.get('phone'),
    image=new_filename,
    gender=data.get('gender'),
    address=data.get('address'),
    user_type="patient"
  )
  
  db.session.add(new_user)
  db.session.commit()
  
  return jsonify({"message": "User created successfully!"}), 201

def login():
  data = request.get_json()
  # get user by email and check if password is correct
  user = User.query.filter_by(email=data['email']).first()

  if user and check_password_hash(user.password_hash, data['password']):
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
      "message": "Login successful",
      "access_token": access_token,
      "user": {"id": user.id, "name": user.name,"user_type": user.user_type}
    }), 200
  return jsonify({"message": "Invalid credentials"}), 401

def get_user_info(user_id):
  # get user by id (id from token not in body) and return user info along with their histories
  user = User.query.get(user_id)
  if not user:
    return jsonify({"message": "user not found"}), 404


  histories = History.query.filter_by(user_id=user_id).all()
  histories_list = []
  for h in histories:
    histories_list.append({
      "id": h.id,
      "date": h.date.strftime('%d-%m-%Y %H:%M:%S') if h.date else None,
      "diagnosis": h.diagnosis,
      "check_type": h.check_type,
      "advice": h.advice,
      "image_url": h.image_url,
      "report_url": h.report_url
    })

  return jsonify({
    "id": user.id,
    "name": user.name,
    "email": user.email,
    "age": user.age,
    "phone": user.phone,
    "next_check": user.next_check.strftime('%d-%m-%Y') if user.next_check else None,
    "image": user.image,
    "address": user.address,
    "histories": histories_list,
  }), 200

def create_doctor(current_user_id):
    admin = User.query.get(current_user_id)
    if not admin or admin.user_type != 'admin':
        return jsonify({"message": "Only admins can create doctors"}), 403
    
    data = request.form 
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"message": f"can not create doctor with this email '{data.get('email')}'"}), 400

    password = data.get('password')
    if not password:
        return jsonify({"message": "Password is required"}), 400
    hashed_password = generate_password_hash(password)

    image_name = None
    if 'image' in request.files: 
        file = request.files['image']
        if file.filename != '':
            filename = secure_filename(file.filename)
            name, extension = os.path.splitext(filename)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            image_name = f"{name}_{timestamp}{extension}"
            upload_path = os.path.join(BASE_DIR, "uploads", image_name)
            file.save(upload_path)


    # 5. إنشاء سجل الطبيب
    new_doctor = User(
        name=data.get('name'),
        email=data.get('email'),
        password_hash=hashed_password,
        age=data.get('age'),
        next_check=None,
        phone=data.get('phone'),
        image=image_name,  # نخزن اسم الملف فقط للرجوع إليه لاحقاً
        gender=data.get('gender'),
        address=data.get('address'),
        user_type='doctor'
    )
    
    try:
        db.session.add(new_doctor)
        db.session.commit()
        return jsonify({
            "message": "Doctor created successfully!", 
            "doctor_id": new_doctor.id
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Database error: {str(e)}"}), 500
# get all users details
def get_all_users(current_user_id):
  admin = User.query.get(current_user_id)
  if not admin or admin.user_type != 'admin':
    return jsonify({"message": "Only admins can access this resource"}), 403
  users = User.query.all()
  users_list = []
  for user in users:
    users_list.append({
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "age": user.age,
      "phone": user.phone,
      "next_check": user.next_check.strftime('%d-%m-%Y') if user.next_check else None,
      "image": user.image,
      "address": user.address,
      "user_type": user.user_type
    })
  return jsonify(users_list), 200

# remove user by id
def remove_user(user_id , current_user_id):
  admin = User.query.get(current_user_id)
  if not admin or admin.user_type != 'admin':
    return jsonify({"message": "Only admins can access this resource"}), 403
  user = User.query.get(user_id)
  if not user:
    return jsonify({"message": "user not found"}), 404
  histories = History.query.filter_by(user_id=user_id).all()
  for h in histories:
    if h.report_url:
      if os.path.exists(h.report_url):
        os.remove(h.report_url)
    if h.image_url :
      if os.path.exists(h.image_url):
        os.remove(h.image_url)
    db.session.delete(h)
  if user.image:
    im_path = os.path.join('uploads', user.image)
    if os.path.exists(im_path):
      os.remove(im_path)
  db.session.delete(user)
  db.session.commit()
  return jsonify({"message": "User removed successfully!"}), 200

# get users reports
def get_users_reports(user_id , current_user_id):
  doctor = User.query.get(current_user_id)
  if not doctor or doctor.user_type != 'doctor':
    return jsonify({"message": "Only doctors can access this resource"}), 403
  user = User.query.get(user_id)
  if not user:
    return jsonify({"message": "user not found"}), 404
  
  histories = History.query.filter_by(user_id=user_id).all()
  reports_list = []
  for h in histories:
    reports_list.append({
      "id": h.id,
      "date": h.date.strftime('%d-%m-%Y %H:%M:%S') if h.date else None,
      "diagnosis": h.diagnosis,
      "check_type": h.check_type,
      "advice": h.advice,
      "image_url": h.image_url,
      "report_url": h.report_url
    })
  return jsonify({"histories":reports_list,"patent_id":user_id}), 200

def get_users_names(current_user_id):
  doctor = User.query.get(current_user_id)
  if not doctor or doctor.user_type != 'doctor':
    return jsonify({"message": "Only doctors can access this resource"}), 403
  users = User.query.filter_by(user_type="patient").all()
  users_list = []
  for user in users:
    users_list.append({
      "id": user.id,
      "name": user.name,
      "age": user.age,
      "image": user.image,
    })
  return jsonify(users_list), 200