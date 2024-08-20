from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
import connection  # Importa el módulo que define el context manager

Base = declarative_base()

class Pacientes(Base):
    __tablename__ = 'pacientes'
    id = Column(Integer, primary_key=True)
    name = Column(String)

# Crear las tablas
Base.metadata.create_all(connection.engine)
