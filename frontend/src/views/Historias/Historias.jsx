
import './Historias.css'
import { Nav } from '../utils/Nav/Nav';
import { Footer } from '../utils/Footer/Footer';
import {Tabla} from '../utils/Tabla/Tabla'
import { useState, useEffect } from 'react';
export function HistoriasClinicas (){
    
    
    return (
        <>
            <Nav/>
            <div className='formulario'>
            <h1 className="titulo">Hoja de Evolución</h1>
            
            <div className="form-group">
                <label className="form-label">Profesional</label>
                <input className="form-input" type="text" disabled />

                <label className="form-label">T.P.: Educación Especial</label>
                <input className="form-input" type="text" disabled />
            </div>

            <div className="form-group">
                <label className="form-label">Documento identificación paciente</label>
                <input className="form-input" type="text" disabled />
            </div>

            <div className="form-group">
                <label className="form-label">1er Apellido</label>
                <input className="form-input" type="text" disabled />

                <label className="form-label">2do Apellido</label>
                <input className="form-input" type="text" disabled />

                <label className="form-label">Nombres</label>
                <input className="form-input" type="text" disabled />
            </div>
            </div>
                
            {/* <Tabla/> */}
            <Footer/>
        </>
    );


}