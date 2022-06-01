import Pacientes from "./Pacientes";


function ListadoPacientes ({pacientes, setPaciente, eliminarPaciente}) {
    {if (pacientes.length >  0) {  
        
        return (
            
                <div className="md:w-1/2 lg:w-3/5  md:h-screen overflow-y-scroll">
                <h2 className="font-black text-3xl text-center w-full">Listado Pacientes</h2>
                <p className="text-lg text-center mt-5 mb-10">
                    Administra tus {' '}
                    <span className="font-bold text-indigo-600 ">Pacientes y Citas</span>
                </p>
                {pacientes.map( paciente => {
                    
                    return (
                        <Pacientes
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminarPaciente={eliminarPaciente}
                        />
                    )
                } )}
    
                
                
            </div>
        );
    }else {
        return (
            <div className="md:w-1/2 lg:w-3/5  md:h-screen">
                <h2 className="font-black text-3xl text-center w-full">No hay pacientes</h2>
                <p className="text-lg text-center mt-5 mb-10">
                    Comienza agregando pacientes {' '}
                   <span className="font-bold text-indigo-600 ">Aparecerán aqui</span>
                </p>
            </div>

        );
    }
}
   
}

export default ListadoPacientes;