/*
    Rutas de Usuarios / Auth
    host + /api/auth

*/

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');

const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

router.post( 
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength( {min: 7} )
    ],
    validarCampos,
    crearUsuario );

router.post( 
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty()
    ],
    validarCampos,
    loginUsuario );

router.get( '/renew', validarJWT, revalidarToken );

module.exports = router;