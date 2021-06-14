const { response } = require("express");

const getEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Get evento'
    })
}

const crearEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Crear evento'
    })
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