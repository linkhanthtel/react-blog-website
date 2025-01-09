from databases import Database
from sqlalchemy import create_engine, MetaData
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
metadata = MetaData()
