const { response } = require("express");
const Event = require("../models/Event");

const getEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Get evento'
    })
}

const crearEvento = async (req, res = response) => {

    const evento = new Event( req.body );

    try {
        evento.user = req.uid;
        console.log(evento);
        const eventoGuardado = await evento.save();

        return res.json( {
            ok: true,
            evento : eventoGuardado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan - EcE'
        })
    }
}

const actualizarEvento = (req, res = response) => {
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