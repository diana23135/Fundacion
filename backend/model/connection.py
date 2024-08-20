from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from contextlib import contextmanager
import settings

# Configuración de SQLAlchemy
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.ECHO,
    pool_timeout=settings.POOL_TIMEOUT
)

SessionFactory = sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)

@contextmanager
def session_scope():
    """Proporciona un contexto para una sesión SQLAlchemy."""
    session = Session()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
