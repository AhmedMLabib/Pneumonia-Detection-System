import tensorflow.keras.backend as K
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os
from config import BASE_DIR

def focal_loss(alpha=0.3, gamma=2.0):
	def loss(y_true, y_pred):
		y_pred = K.clip(y_pred, K.epsilon(), 1 - K.epsilon())
		pt = tf.where(K.equal(y_true, 1), y_pred, 1 - y_pred)
		return -K.mean(alpha * K.pow(1. - pt, gamma) * K.log(pt))
	return loss

model = None

IMG_SIZE = (150, 150)
THRESHOLD = 0.6

def preprocess_image(img_path):
	img = image.load_img(img_path, target_size=IMG_SIZE)
	img_array = image.img_to_array(img)
	img_array = img_array / 255.0
	img_array = np.expand_dims(img_array, axis=0)
	return img_array

def predict(image_path):
	global model
	if model is None:
		model_path = os.path.join(BASE_DIR, "models_ml", "best_model_150.keras")
		model = load_model(model_path, custom_objects={"focal_loss": focal_loss})
	
	img = preprocess_image(image_path)
	prediction = model.predict(img)[0][0]

	result = "pneumonia" if prediction >= THRESHOLD else "normal"
	return result
