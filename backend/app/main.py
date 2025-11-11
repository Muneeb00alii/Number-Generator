from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import random
from datetime import datetime

from .database import get_db
from .models import NumberEntry
from .schemas import NumberResponse

app = FastAPI()

# CORS - allows Next.js to call your API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.post("/generate", response_model=NumberResponse)
def generate_number(db: Session = Depends(get_db)):
    # Generate random number
    random_num = random.randint(1, 1000)
    print(f"[LOG] Generated number: {random_num} at {datetime.now()}")
    
    # Create database entry
    new_entry = NumberEntry(number=random_num)
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)  # Get the ID and created_at from DB
    
    return new_entry

@app.get("/history", response_model=list[NumberResponse])
def get_history(db: Session = Depends(get_db)):
    # Get last 10 entries, newest first
    entries = db.query(NumberEntry).order_by(NumberEntry.created_at.desc()).limit(10).all()
    return entries