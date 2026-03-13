from DB.database import db

# history table schema
class History(db.Model):
  __tablename__ = "histories"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  date = db.Column(db.DateTime, default=db.func.current_timestamp())
  diagnosis = db.Column(db.String(100))
  check_type = db.Column(db.String(100))
  report_url = db.Column(db.String(200))
  advice = db.Column(db.Text)
  image_url = db.Column(db.String(200))
