const { response } = require("express");
const Event = require("../models/Event");

const getEventos = async (req, res = response) => {
    

    try {
        
        const eventos = await Event.find().populate('user', 'name');
        console.log(eventos);
        res.json( {
            ok: true,
            eventos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan -get'
        })
    }
}

const crearEvento = async (req, res = response) => {

    const evento = new Event( req.body );
    
    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json( {
            ok: true,
            evento: eventoGuardado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan -ece'
        })
    }
}

const actualizarEvento = (req, res = response) => {

    const eventoId = req.id;
    console.log(eventoId);

    res.json({
        ok: true,
        msg: 'Actualizar evento'
    })
}

const eliminarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Eliminar evento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}