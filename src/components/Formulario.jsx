import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

  const [nombre, setNombre]= useState('');
  const [propietario, setPropietario]= useState('');
  const [email, setEmail]= useState('');
  const [fecha, setFecha]= useState('');
  const [sintomas, setSintomas]= useState('');

  const [error, setError]= useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])
  
  

  const generarId = ()=> {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e)=> {
    e.preventDefault();

    //Validacion formulario
    if([nombre, propietario,email,fecha,sintomas].includes('')){
      //console.log('Hay al menos un campo sin completar');
      setError(true);
      return;
    }
    setError(false);
    //Objeto de pacientes
    const objetoPaciente={
      nombre, 
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editando el Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState =>pacienteState.id 
        === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})


    }else{
      //Nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente]);
    }


    //Reiniciar formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }
    

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}{" "}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-md py-10 px-5 mb-10">
      {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold cursor-pointer">Nombre mascota</label>
          <input 
          id="mascota"
          type="text"
          placeholder="Nombre de la Mascota"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md cursor-pointer"
          value={nombre}
          onChange= {(e)=> setNombre(e.target.value)}
          
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold cursor-pointer">Nombre del Propietario</label>
          <input 
          id="propietario"
          type="text"
          placeholder="Nombre del Propietario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md cursor-pointer"
          value={propietario}
          onChange= {(e)=> setPropietario(e.target.value)}
          
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold cursor-pointer">Email</label>
          <input 
          id="email"
          type="email"
          placeholder="Email de contacto del propietario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md cursor-pointer"
          value={email}
          onChange= {(e)=> setEmail(e.target.value)}
          
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold cursor-pointer">Fecha de Alta</label>
          <input 
          id="alta"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md cursor-pointer"
          value={fecha}
          onChange= {(e)=> setFecha(e.target.value)}
          
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold cursor-pointer">Síntomas</label>
          <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md cursor-pointer" 
          placeholder="Describe los síntomas"
          id="sintomas" 
          cols="30" 
          rows="5"
          value={sintomas}
          onChange= {(e)=> setSintomas(e.target.value)}
          >
          </textarea>
        </div>
        <input type="submit" 
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
        cursor-pointer hover:bg-indigo-700 transition-all" 
        value= {paciente.id ? 'Editar paciente' : 'Agregar paciente'}
       
        />
      </form>
    </div>
  );
};

export default Formulario;
