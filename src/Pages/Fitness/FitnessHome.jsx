

import React, { useContext } from 'react'
import { Grid, Paper, Container, Modal, Box, Button, Typography, IconButton } from '@mui/material'
import PesoFormulario from './Formulario/PesoFormulario';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import * as  Generales from '../../Funciones/Generales'
import { useEffect } from 'react';
import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/firebase';
import { UsuarioContext } from '../../Provider/UsuarioContext';
import Tabla from '../../Funciones/Tabla'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const textoCentral = {
  fontSize: '40px',
  textAlign: 'center'
}

const margenCentral = {
  margin: '20px auto 0px auto'
}

const noRegistroEstilo={
    fontSize: '25px',
     color: '#00000063'
}


const FitnessHome = () => {

  const [peso, setpeso] = useState(0)
  const usuario=useContext(UsuarioContext)
  const [existeRegistro, setexisteRegistro] = useState(false)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const buscarPesoHoy = async (fecha) => {

    const q = query(collection(db, "Users", usuario.email, 'Peso'), where('fechaString', '==', fecha));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (d) => {
      // doc.data() is never undefined for query doc snapshots
      setpeso(d.data().peso)
      setexisteRegistro(true)
    });
  }
  useEffect(() => {
    console.log('Guardando Peso');
    // buscar peso del dia de hoy 
    var fecha = Generales.fechaFormatHoy();
    buscarPesoHoy(fecha);
   
  }, [])

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >

            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              {/* <Fab onClick={handleOpen} color="secondary" aria-label="edit" style={margenCentral}>
                <EditIcon />
              </Fab> */}
              <IconButton color="secondary" component="label" style={margenCentral} onClick={handleOpen}>
                <MonitorWeightIcon />
              </IconButton>
              <div style={textoCentral}>
                <span>
                  {existeRegistro 
                  ? peso +' Kg':
                    <Typography variant="overline" color="secondary"> 
                     No existe registro
                   </Typography>
                  }
                </span>
                <Typography>
                  Hoy
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 480 ,
                overflowY: 'scroll',
              }}
            >
                <Tabla></Tabla>
            </Paper>
          </Grid>
        </Grid>



      </Container>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <PesoFormulario handleClose={handleClose} setpeso={setpeso} peso={peso} setexisteRegistro={setexisteRegistro}></PesoFormulario>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>

  )
}

export default FitnessHome