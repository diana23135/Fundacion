from model.entities.Acudientes import Acudiente
from model.entities.Pacientes import Paciente
from model.connection import session_scope 
if __name__ == '__main__':
    # Crear un nuevo usuario
    new_user = Acudiente(name="John Doe", id=1)
    new_user = Paciente(name="John Doe", id=1)
    with session_scope()  as connect :
        connect.add(new_user)
        connect.commit() 
        users = connect.query(Acudiente).all()
    # print(users)
    # for us in users:
    #     print(us)