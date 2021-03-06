const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await User.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }

        usuario = new User( req.body );

        //Encriptar el passowrd

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json( {
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan'
        })
    }
};

const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await User.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if (!validPassword) {
            return res.status(400).json( {
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar JWT

        const token = await generarJWT( usuario.id, usuario.name );
 
        res.json( {
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan'
        })
    }

   
};

const revalidarToken = async ( req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name );

    res.json( {
        ok: true,
        token,
        uid,
        name
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};