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
      consulta(pesoQuery)
        

    },
  });


   const consulta =async(pesoQuery)=>{ 
      try {

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate = year + "/" + month + "/" + day;
        console.log(newdate)
        // crear referencia 
        // const dbRef=addDoc(collection(db, "users",pesoQuery.usuario.email,year.toString(),month.toString(),day.toString()),pesoQuery);
        const dbRef=setDoc(doc(db, "users",pesoQuery.usuario.email,year.toString(),month.toString(),day.toString(),'id-example'),pesoQuery);

        //const docRef=await addDoc(collection(db, "users",pesoQuery.usuario.email,year.toString(),month.toString(),day.toString()),pesoQuery);
        //await setDoc(dbRef, pesoQuery);
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