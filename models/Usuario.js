const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({
    idUcc: {
        type: String,
        required: true,
        unique: true
    },
    primerNombre: {
        type: String,
        required: true
    },
    segundoNombre: {
        type: String
    },
    primerApellido: {
        type: String,
        required: true
    },
    segundoApellido: {
        type: String,
        required: true
    },
    programa: {
        type: String,
        required: true
    },
    semestre: {
        type: String,
        required: true
    },
    identificacion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correoInstitucional: {
        type: String,
        required: true,
        unique: true
    },
    fechaVinculacion: {
        type: Date,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },

});

module.exports = model('Usuario', UsuarioSchema);