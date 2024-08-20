
import "./assets/css/App.css";
import { Formulario } from "./Form";
import { Footer} from "./view/utils/Footer";
import { ButtonBack } from "./view/utils/buttonBack";
import { Nav } from "./view/utils/Nav";
export function App() {
  const formulario = {
    columna1: {
      nombre: {
        label: "Nombre",
        type: "text",
        placeholder: "Ingrese su nombre",
        id: "nombre",
      },
      apellido: {
        label: "Apellido",
        type: "text",
        placeholder: "Ingrese su apellido",
        id: "apellido",
      },
    },
    columna2: {
      edad: {
        label: "Edad",
        type: "number",
        placeholder: "Ingrese su edad",
        id: "edad",
      },
      fecha_nacimiento: {
        label: "Fecha Nacimiento",
        type: "date",
        placeholder: "",
        id: "fecha_nacimiento",
      },
      lugar_nacimiento: {
        label: "Lugar Nacimiento",
        type: "text",
        placeholder: "Ingrese el lugar de nacimiento",
        id: "lugar_nacimiento",
      },
    },
    columna3: {
      diagnostico: {
        label: "Diagnóstico",
        type: "text",
        placeholder: "Ingrese el diagnóstico",
        id: "diagnostico",
      },
    },
    columna4: {
      escolarizado: {
        label: "¿Se encuentra escolarizado?",
        type: "checkbox",
        placeholder: "",
        id: "escolarizado",
      },
      institucion: {
        label: "Nombre de la institución",
        type: "text",
        placeholder: "Ingrese el nombre de la institución",
        id: "institucion",
      },
    },
    columna5: {
      jornada: {
        label: "Jornada",
        type: "text",
        placeholder: "Ingrese la jornada",
        id: "jornada",
      },
      curso: {
        label: "Curso",
        type: "text",
        placeholder: "Ingrese el curso",
        id: "curso",
      },
      eps: {
        label: "EPS",
        type: "text",
        placeholder: "Ingrese EPS",
        id: "eps",
      },
    },
    columna6: {
      terapias: {
        label: "¿Se encuentra en terapias?",
        type: "checkbox",
        placeholder: "",
        id: "terapias",
      },
      donde: {
        label: "¿Dónde?",
        type: "text",
        placeholder: "Ingrese dónde",
        id: "donde",
      },
    },
    columna7: {
      cuidador1_nombre: {
        label: "Nombre del cuidador",
        type: "text",
        placeholder: "Ingrese el nombre del cuidador",
        id: "nombre_cuidador1",
      },
      cuidador1_edad: {
        label: "Edad",
        type: "number",
        placeholder: "Ingrese la edad del cuidador",
        id: "edad_cuidador1",
      },
    },
    columna8: {
      identificacion: {
        label: "No. de Documento de identidad",
        type: "text",
        placeholder: "Ingrese el número de documento",
        id: "identificacion_cuidador1",
      },
    },
    columna9: {
      ocupacion: {
        label: "Ocupación",
        type: "text",
        placeholder: "Ingrese la ocupación",
        id: "ocupacion_cuidador1",
      },
    },
    columna10: {
      cuidador2_nombre: {
        label: "Nombre del cuidador",
        type: "text",
        placeholder: "Ingrese el nombre del cuidador",
        id: "nombre_cuidador2",
      },
      cuidador2_edad: {
        label: "Edad",
        type: "number",
        placeholder: "Ingrese la edad del cuidador",
        id: "edad_cuidador2",
      },
    },
    columna11: {
      identificacion: {
        label: "No. Documento de identidad",
        type: "text",
        placeholder: "Ingrese el número de documento",
        id: "identificacion_cuidador2",
      },
    },
    columna12: {
      ocupacion: {
        label: "Ocupación",
        type: "text",
        placeholder: "Ingrese la ocupación",
        id: "ocupacion_cuidador2",
      },
    },
    columna13: {
      barrio: {
        label: "Barrio donde viven",
        type: "text",
        placeholder: "Ingrese el barrio",
        id: "barrio",
      },
      direccion: {
        label: "Dirección",
        type: "text",
        placeholder: "Ingrese la dirección",
        id: "direccion",
      },
    },
    columna14: {
      telefono_fijo: {
        label: "Telefono fijo",
        type: "text",
        placeholder: "Ingrese el teléfono fijo",
        id: "telefono_fijo",
      },
      telefono_celular: {
        label: "Telefono celular",
        type: "text",
        placeholder: "Ingrese el teléfono celular",
        id: "telefono_celular",
      },
    },
  };

 

  return (
    <>
      <header className="header">
        <Nav/>
      </header>
      <ButtonBack/>
      <main className="board">
        <aside>
        </aside>
        
         
          <section className="section-form">
            <header>Formulario</header>
            <Formulario formulario={formulario}></Formulario>
          
          </section>
        
      </main>
      <Footer/>
    </>
  );
}
