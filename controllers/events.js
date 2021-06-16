const { response } = require("express");
const Event = require("../models/Event");

const getEventos = async (req, res = response) => {

    try {
        
        const eventos = await Event.find().populate('user', 'name');
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

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Event.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no fue encontrado'
            })
        }

        if( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Event.findOneAndUpdate(eventoId, nuevoEvento, { new:true });

        res.json( {
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan -actE'
        });
    }

 
}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Event.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no fue encontrado'
            })
        }

        if( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de eliminar este evento'
            })
        }

        const eventoEliminado = await Event.findByIdAndRemove(eventoId);

        res.json( {
            ok: true,
            evento: eventoEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador Giordan -DelEv'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}