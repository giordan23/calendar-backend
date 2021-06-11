const {response} = require('express');

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json( {
        ok: true,
        msg: 'registrar usuario',
        name,
        email,
        password
    })
};

const loginUsuario = ( req, res = response ) => {

    res.json( {
        ok: true,
        msg : 'iniciar sesion'
    })
};

const revalidarToken = ( req, res = response) => {

    res.json( {
        ok: true,
        msg : 'renovar token'
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};