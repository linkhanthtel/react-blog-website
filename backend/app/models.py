from sqlalchemy import Table, Column, Integer, String, MetaData

metadata = MetaData()

users_table = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("username", String, unique=True, nullable=False),
    Column("hashed_password", String, nullable=False),
)

posts_table = Table(
    "posts",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("title", String, nullable=False),
    Column("content", String, nullable=False),
    Column("author", String, nullable=False),
)
