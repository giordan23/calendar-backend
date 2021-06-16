const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next) => {

    const token= req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

        const { uid, name } = payload;

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valid'
        })
    }

    next();
}

module.exports = {
    validarJWT
}