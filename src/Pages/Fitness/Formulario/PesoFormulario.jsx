import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button,TextField } from '@mui/material';
import { UsuarioContext } from '../../../Provider/UsuarioContext';
import firebaseConfig from '../../../Firebase/config';
import {doc,setDoc,addDoc,collection,query,where,getDocs} from 'firebase/firestore'
import {db} from '../../../Firebase/firebase'
const validationSchema = yup.object({
  peso: yup
    .number('Formato incorrecto')
    .required('El peso es requerido '),
});

const PesoFormulario = (props) => {
  const usuario =useContext(UsuarioContext)
  const formik = useFormik({    
    initialValues: {
      peso: props.peso,
    },
    validationSchema: validationSchema,
    onSubmit:  (values) => {
      // alert(JSON.stringify(values, null, 2));
      // agregar peso  con fecha usuario
      var pesoQuery={
        peso:values.peso,
        fecha: new Date(),

        usuario:{
            uid:usuario.uid,
            email:usuario.email
        }
      }
      props.setpeso(pesoQuery.peso);
      props.setexisteRegistro(true);
      console.log(db)
      consulta(pesoQuery)
      props.handleClose();

    },
  });


   const consulta =async(pesoQuery)=>{ 
      try {

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate = day + "/" + month + "/" + year;
        pesoQuery.fechaString=newdate;
        console.log(newdate)
        // ver si el  registro ya existe 
        var  registroExiste =false;
        const q =query (collection(db,"Users",pesoQuery.usuario.email,'Peso'),where('fechaString','==',newdate));
        const querySnapshot = await getDocs(q);
        var  dbRef='';

        querySnapshot.forEach(async(d) => {
          // doc.data() is never undefined for query doc snapshots
          console.log('se esta editando ')
          console.log(d.id, " => ", d.data());
          registroExiste=true;
          dbRef=await setDoc(doc(db,"Users",pesoQuery.usuario.email,'Peso',d.id),pesoQuery);
        });
        console.log('termina for each');
        //respuesta de lo que si hizo 
        if(!registroExiste){
          console.log('se esta guardando '+registroExiste);
          dbRef=await addDoc(collection(db, "Users",pesoQuery.usuario.email,'Peso'),pesoQuery);
        }

         console.log("Document written with ID: ", dbRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Ingrese su peso </h1>
        <TextField
          fullWidth
          id="peso"
          name="peso"
          label="Peso"
          value={formik.values.peso}
          onChange={formik.handleChange}
          error={formik.touched.peso && Boolean(formik.errors.peso)}
          helperText={formik.touched.peso && formik.errors.peso}
        />
        
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PesoFormulario;