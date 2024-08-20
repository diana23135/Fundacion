import os

# Determina el entorno actual
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')


DATABASE_CONFIG = {
    'development': {
        'url': os.getenv('DB_URL_DEV', 'sqlite:///development.db'),
        'echo': os.getenv('DB_ECHO_DEV', 'True') == 'True',
        'pool_timeout': int(os.getenv('DB_POOL_TIMEOUT_DEV', 30))
    },
    'production': {
        'url': os.getenv('DB_URL_PROD', 'postgresql://user:password@localhost/production_db'),
        'echo': os.getenv('DB_ECHO_PROD', 'False') == 'True',
        'pool_timeout': int(os.getenv('DB_POOL_TIMEOUT_PROD', 60))
    }
}
# Configuración del entorno actual
DATABASE_URL = DATABASE_CONFIG[ENVIRONMENT]['url']
ECHO = DATABASE_CONFIG[ENVIRONMENT]['echo']
POOL_TIMEOUT = DATABASE_CONFIG[ENVIRONMENT]['pool_timeout']

# Configuración del context manager
SESSION_CONFIG = {
    'timeout': 30  # Tiempo de espera para operaciones de la sesión en segundos
}
