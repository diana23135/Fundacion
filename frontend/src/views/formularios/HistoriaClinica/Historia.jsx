import { Formulario } from "../../utils/Form.jsx";

export function Historia (){

    const historia = {
        columna1: {
            paciente : {
                label: "paciente",
                type: "text",
                placeholder: "Ingrese su nombre",
                id: "nombre",
              }
        },
        columna2: {
            edad : {
                label: "edad",
                type: "text",
                placeholder: "Ingrese su nombre",
                id: "nombre",
              }
        }
    };

    return <>
        <Formulario formulario={historia}/>
    
    </>;
};