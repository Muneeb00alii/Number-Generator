from pydantic import BaseModel
from datetime import datetime

class NumberResponse(BaseModel):
    id: int
    number: int
    created_at: datetime
    
    class Config:
        from_attributes = True  # Allows converting SQLAlchemy model to Pydantic. Basically what it does is to read data from object attributes instead of dict keys. In simple words, it allows Pydantic to work seamlessly with ORM models. For example if you have a SQLAlchemy model instance, Pydantic can read the data directly from the model's attributes without needing to convert it to a dictionary first. This is particularly useful when working with databases and ORMs, as it simplifies the process of data validation and serialization.