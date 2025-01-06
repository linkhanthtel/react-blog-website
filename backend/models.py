from sqlalchemy import Table, Column, Integer, String, Text, MetaData, ARRAY

metadata = MetaData()

users_table = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("username", String(50), unique=True, nullable=False),
    Column("hashed_password", String(200), nullable=False),
)

posts_table = Table(
    "posts",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String(100), nullable=False),
    Column("content", Text, nullable=False),
    Column("author", String(50), nullable=False),
    Column("tags", ARRAY(String), nullable=True),
)
