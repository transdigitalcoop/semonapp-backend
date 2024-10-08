/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const router = Router();

router.post(
    '/new',
    [//middlewares
        check('primerNombre', 'El primer nombre es obligatorio').not().isEmpty(),
        check('primerApellido', 'El primer apellido es obligatorio').not().isEmpty(),
       check('segundoApellido', 'El segundo apellido es obligatorio').not().isEmpty(),
        check('programa', 'El programa es obligatorio').not().isEmpty(),
        check('semestre', 'El semestre es obligatorio').not().isEmpty(),
        check('identificacion', 'La identificacion es obligatoria').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('correoInstitucional', 'El correo institucional es obligatorio').isEmail(),
        check('fechaVinculacion', 'La fecha de vinculacion es obligatoria').not().isEmpty(),
        check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        validarCampos
    ],
     crearUsuario);

router.post(
    '/',
    [
        check('correoInstitucional', 'El correo es obligatorio').isEmail(),
        check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', revalidarToken);

module.exports = router;