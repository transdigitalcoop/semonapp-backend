const { response } = require('express');
const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res = response) => {
    const usuarios = await Usuario.find({}, 'primerNombre primerApellido identificacion fechaVinculacion programa semestre');

    res.json({
        ok: true,
        usuarios
    });
}


module.exports = {
    getUsuarios
}
