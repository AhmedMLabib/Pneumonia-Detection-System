from DB.database import db

# user table schema
class User(db.Model):
  __tablename__ = "users"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  email = db.Column(db.String(120), unique=True)
  password_hash = db.Column(db.String(200))
  image = db.Column(db.String(200))
  age = db.Column(db.Integer)
  phone = db.Column(db.String(20))
  next_check = db.Column(db.DateTime)
  gender = db.Column(db.String(10))
  address = db.Column(db.String(200))
  user_type = db.Column(db.String(20), default="patient") # patient / admin / doctor
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())