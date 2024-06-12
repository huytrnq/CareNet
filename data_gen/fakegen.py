import mysql.connector
from faker import Faker
import random
from datetime import datetime

# Initialize Faker
fake = Faker()

# Connect to the MySQL database
conn = mysql.connector.connect(
    host='localhost',         # e.g., 'localhost'
    port=3306,                # e.g., 3306
    database='CareNet',   # Replace with your database name
    user='root',     # Replace with your username
    password='Huytr1997'  # Replace with your password
)

cursor = conn.cursor()

# Function to create fake user data
def create_fake_user(role):
    username = fake.user_name()
    firstname = fake.first_name()
    lastname = fake.last_name()
    gender = random.choice(['male', 'female', 'other'])
    phone = fake.phone_number()
    email = fake.email()
    address = fake.address()
    password = fake.password()  # You should use a proper password hashing in a real scenario
    weight = round(random.uniform(50, 100), 2)
    height = round(random.uniform(1.5, 2.0), 2)
    occupation = fake.job()
    allergies = fake.word()
    current_medication = fake.word()
    genetic_conditions = fake.word()
    last_surgery = fake.word()
    emergency_contact = fake.phone_number()
    insurance = fake.company()
    license_number = fake.bothify(text='??####') if role == 'doctor' else None
    expiry_date = fake.date_this_century() if role == 'doctor' else None
    date_of_birth = fake.date_of_birth()
    affiliations = fake.company() if role == 'doctor' else None
    profile_path = fake.file_path(depth=1, category='image')

    return (username, firstname, lastname, role, gender, phone, email, address, password,
            weight, height, occupation, allergies, current_medication, genetic_conditions,
            last_surgery, emergency_contact, insurance, license_number, expiry_date,
            date_of_birth, affiliations, profile_path)

# Function to create fake medical information
def create_fake_medical_info(user_id):
    heart = fake.word()
    blood_pressure = f"{random.randint(90, 140)}/{random.randint(60, 90)} mmHg"
    pulse = f"{random.randint(60, 100)} / min"
    abdomen = fake.word()
    risk_factor = random.randint(1, 10)
    xray_path = fake.file_path(depth=1, category='image')
    ultrasound_path = fake.file_path(depth=1, category='image')

    return (user_id, heart, blood_pressure, pulse, abdomen, risk_factor, xray_path, ultrasound_path)

# Function to create fake appointments
def create_fake_appointment(doctor_id, patient_id):
    date = fake.date_this_year()
    time = fake.time()
    status = random.choice(['scheduled', 'completed', 'cancelled'])

    return (doctor_id, patient_id, date, time, status)

# Insert fake doctors and patients
doctor_ids = []
patient_ids = []

for _ in range(20):  # Insert 5 doctors
    user_data = create_fake_user('doctor')
    cursor.execute("""
        INSERT INTO `user` (username, firstname, lastname, role, gender, phone, email, address, password,
        weight, height, occupation, allergies, current_medication, genetic_conditions, last_surgery, 
        emergency_contact, insurance, license_number, expiry_date, date_of_birth, affiliations, profile_path)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, user_data)
    doctor_id = cursor.lastrowid
    doctor_ids.append(doctor_id)
    
    # Add medical info for doctors
    medical_info_data = create_fake_medical_info(doctor_id)
    cursor.execute("""
        INSERT INTO `medical_info` (user_id, heart, blood_pressure, pulse, abdomen, risk_factor, xray_path, ultrasound_path)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, medical_info_data)

for _ in range(100):  # Insert 10 patients
    user_data = create_fake_user('patient')
    cursor.execute("""
        INSERT INTO `user` (username, firstname, lastname, role, gender, phone, email, address, password,
        weight, height, occupation, allergies, current_medication, genetic_conditions, last_surgery, 
        emergency_contact, insurance, license_number, expiry_date, date_of_birth, affiliations, profile_path)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, user_data)
    patient_id = cursor.lastrowid
    patient_ids.append(patient_id)

# Insert fake appointments
for _ in range(100):  # Insert 20 appointments
    doctor_id = random.choice(doctor_ids)
    patient_id = random.choice(patient_ids)
    appointment_data = create_fake_appointment(doctor_id, patient_id)
    cursor.execute("""
        INSERT INTO `appointment` (doctor_id, patient_id, date, time, status)
        VALUES (%s, %s, %s, %s, %s)
    """, appointment_data)

# Commit the transaction
conn.commit()

# Close the connection
cursor.close()
conn.close()