from sqlalchemy import Column, Integer, DateTime
from datetime import datetime
from .database import Base

class NumberEntry(Base):
    __tablename__ = "number_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)