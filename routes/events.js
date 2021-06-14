/*
    Rutas de CRUD EVENTOS / 
    host + /

    */
   const { getEventos, eliminarEvento, actualizarEvento, crearEvento } = require('../controllers/events');
   
   const {Router} = require('express');
   const router = Router();
   const { validarJWT } = require('../middlewares/validar-jwt');
   
   
   router.get( '/', validarJWT, getEventos );
   router.post( '/', validarJWT, crearEvento );
   router.put( '/:id', validarJWT, actualizarEvento );
   router.delete( '/:id', validarJWT, eliminarEvento );
   
   module.exports = router;