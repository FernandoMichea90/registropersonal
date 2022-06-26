import {useState,useEffect} from 'react'
import {auth} from "../Firebase/firebase"
import { onAuthStateChanged } from 'firebase/auth'
const useAutenticado = props => {   


    const [usuarioAutenticado, setusuarioAutenticado] = useState(null)



    // const administrador = async(user)=> 
    
    // {
    // var result=false
    // //  await db.collection("administradores")
    // //   .where("adminitrador", "==", user.email).get().then((querySnapshot) => {
    // // querySnapshot.forEach((doc) => {
    // //         // doc.data() is never undefined for query doc snapshots     
    // //        result=true
    // //     });
      
    // // })
    // // .catch((error) => {
    // //     console.log("Error getting documents: ", error);
    // // });
          
    //    return result
      
  
    // }



    // const usuarioExistente=async(usuario)=>{

    //             console.log(usuario )
    //             //consultar en la base de datos
                
    //             // crear constantes  de referencias a usuarios 

    //             const usuarios=firebase.db.collection("usuarios")
    //             //firebase.db.collection("usuarios")

    //             const  consulta=await usuarios.where("correo","==",usuario.email).get().then(doc=>
    //                 {
    //                     return doc.docs
    //                 }
    //                 )


    //             if(consulta.length){
    //                 console.log("vacio")
    //             }else{
    //                 console.log("lleno")
                
    //                 let usuarioAgregar={
    //                     correo:usuario.email,
    //                     nombre:usuario.displayName,
    //                     photoURL:usuario.photoURL

    //                 }
    //                 console.log(usuarioAgregar)
    //                  await usuarios.doc(usuarioAgregar.correo).set(usuarioAgregar)
                    

    //             } 








    // }


    useEffect(() => {
       console.log('paso por aca')
        const unsuscribe= onAuthStateChanged(auth,(user)=>{
            
            if(user){
                 //  consultar si el usuario  existe            
                 setusuarioAutenticado(user)
                //   administrador(user).then(function(result) {
                //             console.log(result) // "Some User token"
                //             setusuarioAutenticado({...user,administrador:result})
                //          })
                localStorage.setItem('usuario',user)

                  
                // usuarioExistente(user)
            }else{
                setusuarioAutenticado(false);  
            }
             return ()=>unsuscribe();  
        })
      
    },[usuarioAutenticado] )

    return usuarioAutenticado
}

export default useAutenticado