import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button,TextField } from '@mui/material';
import { UsuarioContext } from '../../../Provider/UsuarioContext';
import firebaseConfig from '../../../Firebase/config';
import {doc,setDoc,addDoc,collection} from 'firebase/firestore'
import {db} from '../../../Firebase/firebase'
const validationSchema = yup.object({
  peso: yup
    .number('Formato incorrecto')
    .required('El peso es requerido '),
});

const PesoFormulario = () => {
  const test =useContext(UsuarioContext)
  const formik = useFormik({    
    initialValues: {
      peso: '100',
    },
    validationSchema: validationSchema,
    onSubmit:  (values) => {
      // alert(JSON.stringify(values, null, 2));
      // agregar peso  con fecha usuario
      var pesoQuery={
        peso:values.peso,
        fecha: new Date(),
        usuario:{
            uid:test.uid,
            email:test.email
        }
      }
      console.log(db)
      consulta()
        

    },
  });


   const consulta =async()=>{ 
      try {
        const docRef = await addDoc(collection(db, "users","correo","auto"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
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