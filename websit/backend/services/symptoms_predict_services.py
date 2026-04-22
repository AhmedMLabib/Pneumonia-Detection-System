import os

import pandas as pd
import joblib
from config import BASE_DIR


model = None
trained_encoders = None

def prepare_user_data(df):
  binary_cols = ['Gender', 'Confusion', 'Crackles']
  numeric_cols = ["Age", "Oxygen_saturation", "Temperature"]
  df['Shortness_of_breath'] = df['Shortness_of_breath'].replace('None', 'Mild')
  df['Chest_pain'] = df['Chest_pain'].replace('None', 'Mild')
  df['Cough'] = df['Cough'].replace('None', 'Dry') 
  for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')
  for col in binary_cols:
    le = trained_encoders["label_encoders"][col]
    df[col] = le.transform(df[col])
  categorical_cols = [c for c in df.columns if c not in numeric_cols + binary_cols]
  OE = trained_encoders["onehot_encoder"]
  encoded = OE.transform(df[categorical_cols])
  encoded_df = pd.DataFrame(encoded, columns=OE.get_feature_names_out(categorical_cols))
  df = df.drop(columns=categorical_cols)
  df = pd.concat([df, encoded_df], axis=1)
  df = df[trained_encoders["columns_order"]]
  return df


def predict(data):
  global model, trained_encoders
  if model is None or trained_encoders is None:
    model = joblib.load(f"{BASE_DIR}/models_ml/pneumonia_model.pkl")
    trained_encoders = joblib.load(f"{BASE_DIR}/models_ml/encoders.pkl")
  try:
    user_df = pd.DataFrame([data])
    clean_user_data = prepare_user_data(user_df)
    pred = model.predict(clean_user_data)[0]
    response = "pneumonia" if pred == 1 else "normal"
    return response
  except :
    return "server can't dealing with this data please provide correct data format"
