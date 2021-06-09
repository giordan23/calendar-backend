const {response} = require('express');

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    if( name.trim().length < 7 ) {
        return res.status(400).json( {
            ok: false,
            msg: 'el nombre debe tener como minimo 7 Letras'
        })
    }

    return res.json ( {
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