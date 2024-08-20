from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from ..connection import engine   # Importa el módulo que define el context manager

Base = declarative_base()

class Paciente(Base):
    __tablename__ = 'paciente'
    id = Column(Integer, primary_key=True)
    name = Column(String)

    def __repr__(self):
        return f"<Paciente(id={self.id}, nombre={self.name})>"
# Crear las tablas
Base.metadata.create_all(engine)
