import  { useState } from 'react';
import './assets/css/Form.css'
export function Formulario({ formulario }) {
    // Initialize formValues as an empty object
    const [formValues, setFormValues] = useState({});

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission, e.g., sending data to a server
        console.log('Form submitted with values:', formValues);
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                {formulario  ? (
                    Object.keys(formulario).map((sectionKey) => {
                        const section = formulario[sectionKey];

                        return (
                            <div key={sectionKey} className="column">
                                {Object.keys(section).map((key) => {
                                    const { label, type, placeholder, id } = section[key];
                                    return (
                                        <div className="input-box" key={id}>
                                            <label htmlFor={id}>{label}</label>
                                            <input
                                                id={id}
                                                type={type}
                                                placeholder={placeholder}
                                                required={type !== "checkbox"}
                                                onChange={handleChange}
                                                value={formValues[id] || ''}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                ) : (
                    <p>No se ha podido cargar el formulario</p>
                )}
                <button className="button" type="submit">Enviar</button>
            </form>
        </>
    );
}
