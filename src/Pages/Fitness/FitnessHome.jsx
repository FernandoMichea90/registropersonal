

import React from 'react'
import { Grid ,Paper,Container ,Modal,Box,Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import  PesoFormulario   from './Formulario/PesoFormulario';

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

const   FitnessHome = () => {


    const mostrarModal=()=>{

    }

const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


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
               <Fab onClick={handleOpen} color="secondary" aria-label="edit">
                   <EditIcon />
                </Fab> 
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
    <Box sx={{ ...style}}>
      <PesoFormulario></PesoFormulario>
      <Button onClick={handleClose}>Close Child Modal</Button>
    </Box>
  </Modal>
  </>

  )
}

export default FitnessHome