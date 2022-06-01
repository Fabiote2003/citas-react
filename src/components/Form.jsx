import {useState, useEffect} from "react";
import Error from "./Error";

function Form ({pacientes, setPacientes, paciente, setPaciente}) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación del formulario
        if([ nombre, propietario, email, fecha, sintomas ].includes('') ) {
            setError(true);
            return;
        } else {
            setError(false);
        }
        
        const generarId = () => {
            const random = Math.random().toString(36).substring(2)
            const fecha = Date.now().toString(36)
            return random + fecha;
        }
        
        const objetoPaciente = {
            nombre,
            propietario,
            email, 
            fecha, 
            sintomas,
            // id: generarId()
            //Eliminamos el id, ya que si estamos editando, vamos a generar otro id y no el que teniamos antes
        }

        if(paciente.id) { //Significa que dimos click en editar
            //Editando el registro
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map(elementoPaciente => elementoPaciente.id === paciente.id ? objetoPaciente : elementoPaciente
                )
                setPacientes(pacientesActualizados);
                setPaciente({});
        } else {
            //Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]); 
        }

        

        //Reiniciar el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mr-3 ml-3">
            
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 mb-10 text-center">Añade Pacientes y 
            <span className="text-indigo-600 font-bold"> Administralos</span>
            </p>

            <form className="bg-white shadow-md rounded-lg py-10 px-10 mb-10 mx-5" onSubmit={handleSubmit}>

                {error && <Error mensaje="Todos los campos son obligatorios"/>}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 font-bold uppercase">Nombre Mascota</label>
                    <input id="mascota" type="text" placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre} 
                    onChange={ (e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 font-bold uppercase">Nombre Propietario</label>
                    <input id="propietario" type="text" placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario} 
                    onChange={ (e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 font-bold uppercase">Email</label>
                    <input id="email" type="email" placeholder="Email Contacto Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email} 
                    onChange={ (e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="block text-gray-700 font-bold uppercase">Fecha de Alta</label>
                    <input id="date" type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha} 
                    onChange={ (e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 font-bold uppercase">sintomas</label>
                    <textarea id="sintomas" placeholder="Describe los Sintomas" className="border-2 placeholder-gray-400 rounded-md w-full"
                    value={sintomas} 
                    onChange={ (e) => setSintomas(e.target.value)}
                    />
                </div>

                <input type="submit" value={paciente.id ? "Editar Paciente" : "Agregar Paciente"} className="block mx-auto w-full bg-indigo-600 p-3 text-white rounded-lg font-bold uppercase hover:bg-indigo-500 cursor-pointer"/>
            </form>
        </div>
        
    );
}

export default Form;