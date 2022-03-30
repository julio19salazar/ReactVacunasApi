import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const url="https://181g0543.81g.itesrc.net/api/personas/";
class App extends Component {

state={
  data:[],
  modalInsertar:false,
  modalElimar:false,
  form:{
    id:'',
    nombre:'',
    edad:'',
    sexo:'',
    vacuna:'',
    lote:'',
    tipoModal:''
  }
}

peticionGet=()=>{
  axios.get(url).then(response=>
    {
      this.setState({data:response.data});
    }).catch(error=>{
      alert(error.message);
    })
}

peticionPost=async ()=>{
  delete this.state.form.id;
 await axios({
    url:"https://181g0543.81g.itesrc.net/api/personas/",
    method: 'post',
    responseType: 'json', // predeterminado
    data: {
      ...this.state.form
    }
}).then(response=> {
   
  this.modalInsertar();
 
  this.peticionGet();
  
}).catch(error=> {
  alert(error.message);
    });

}
petici0onPut=async()=>{
  await axios({
    url:"https://181g0543.81g.itesrc.net/api/personas/",
    method: 'put',
    responseType: 'json', // predeterminado
    data: {
      ...this.state.form
    }
}).then(response=> {
   
  this.modalInsertar();
 
  this.peticionGet();
  
}).catch(error=> {
  alert(error.message);
    });
}

peticionDelete=async()=>{
  await axios({
    url:"https://181g0543.81g.itesrc.net/api/personas/",
    method: 'delete',
    responseType: 'json', // predeterminado
    data: {
      ...this.state.form
    }
}).then(response=> {
   
  this.setState({modalElimar:false});
 
  this.peticionGet();
  
}).catch(error=> {
  alert(error.message);
    });

}
modalInsertar=()=>{
  this.setState({modalInsertar:!this.state.modalInsertar});
}
seleccionarPersona=(persona)=>{

  this.setState({
    tipoModal:'actualizar',
    form:{
      id:persona.id,
      nombre:persona.nombre,
      edad:persona.edad,
      sexo:persona.sexo,
      vacuna:persona.vacuna,
      lote:persona.lote
    }
  })

}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]:e.target.value
}
});
console.log(this.state.form);
}
  componentDidMount()
  {
    this.peticionGet();

  }
  render(){
    const {form}=this.state;
  return (
   <div className="App">
     <br></br>
<button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}}>Agregar registro</button>
<br></br>
<table className="table">
<thead>
<tr>
  <th>Id</th>
  <th>Nombre</th>
  <th>Edad</th>
  <th>Sexo</th>
  <th>Vacuna</th>
  <th>Lote</th>
  <th>¿Qúe desea?</th>
</tr>
</thead>
<tbody>
{this.state.data.map(personas=>{
  return (
    <tr>
      <td>{personas.id}</td>
      <td>{personas.nombre}</td>
      <td>{personas.edad}</td>
      <td>{personas.sexo}</td>
      <td>{personas.vacuna}</td>
      <td>{personas.lote}</td>
      
      <td><button onClick={()=>{this.seleccionarPersona(personas);this.modalInsertar()}} className="btn btn-primary">
        <FontAwesomeIcon icon={faEdit}>
          </FontAwesomeIcon></button>{"  "}
          <button className="btn btn-danger" onClick={()=>{this.seleccionarPersona(personas);this.setState({modalElimar:true})}}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
          </td>
    </tr>
  )
})}
</tbody>
</table>
<Modal isOpen={this.state.modalInsertar}>
  <ModalHeader style={{display:"block"}}>
   <span style={{float:"right"}}></span>
  </ModalHeader>
  <ModalBody>
    <div className='form-group'>
      <label>Id</label>
      <input className="form-control" type="number" name="id" id='id' readOnly onChange={this.handleChange} value={form?form.id:this.state.data.length+1}></input>
      <br></br>
      <label>Nombre</label>
      <input className="form-control" type="text" name="nombre" id='nombre' onChange={this.handleChange} value={form?form.nombre:''}></input>
      <br></br>
      <label>Edad</label>
      <input className="form-control" type="number" name="edad" id='edad' onChange={this.handleChange} value={form?form.edad:''}></input>
      <br></br>
      <label>Sexo</label>
      <input className="form-control" type="text" name="sexo" id='sexo' onChange={this.handleChange} value={form?form.sexo:''}></input>
      <br></br>
      <label>vacuna</label>
      <input className="form-control" type="text" name="vacuna" id='vacuna' onChange={this.handleChange} value={form?form.vacuna:''}></input>
      <br></br>
      <label>Lote</label>
      <input className="form-control" type="text" name="lote" id='lote' onChange={this.handleChange} value={form?form.lote:''}></input>
      <br></br>

    </div>
  </ModalBody>
  <ModalFooter>
    
    {this.state.tipoModal=='insertar'?
      <button className='btn btn-success' onClick={()=>this.peticionPost()}>Insertar</button>
  :
  <button className='btn btn-primary' onClick={()=>this.petici0onPut()} >Editar</button>
}


    <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button>
  </ModalFooter>
</Modal>
<Modal isOpen={this.state.modalElimar}>
  <ModalBody>
  <div className='form-group'>
      <label>Id</label>
      <input className="form-control" type="number" name="id" id='id' readOnly onChange={this.handleChange} value={form?form.id:this.state.data.length+1}></input>
      <br></br>
      <label>Nombre</label>
      <input className="form-control" type="text" name="nombre" id='nombre' onChange={this.handleChange} value={form?form.nombre:''}></input>
      <br></br>
      <label>Edad</label>
      <input className="form-control" type="number" name="edad" id='edad' onChange={this.handleChange} value={form?form.edad:''}></input>
      <br></br>
      <label>Sexo</label>
      <input className="form-control" type="text" name="sexo" id='sexo' onChange={this.handleChange} value={form?form.sexo:''}></input>
      <br></br>
      <label>vacuna</label>
      <input className="form-control" type="text" name="vacuna" id='vacuna' onChange={this.handleChange} value={form?form.vacuna:''}></input>
      <br></br>
      <label>Lote</label>
      <input className="form-control" type="text" name="lote" id='lote' onChange={this.handleChange} value={form?form.lote:''}></input>
      <br></br>

    </div>
    ¿Estás seguro de eliminar a la persona {form && form.nombre}
  </ModalBody>
  <ModalFooter>
    <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>Sí</button>
    <button className='btn btn-secundary' onClick={()=>this.setState({modalElimar:false})}  >No</button>
  </ModalFooter>
</Modal>
   </div>
  );
}
}

export default App;
