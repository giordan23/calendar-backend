/*
    Event Routes / 
    host + /api/events

    */
const { check } = require('express-validator');
const {Router} = require('express');
   
const { getEventos, eliminarEvento, actualizarEvento, crearEvento } = require('../controllers/events');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

   
   //Si es que todas las operaciones necesitan validarJWT, podemos subir de nivel
router.use(validarJWT);

router.get( '/', getEventos );
router.post( 
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    ],
    validarCampos,
    crearEvento
);
router.put( '/:id', actualizarEvento );
router.delete( '/:id', eliminarEvento );

module.exports = router;