/*
    Rutas de Usuarios
    host + /api/usuarios
*/

const { Router } = require('express');
const router = Router();
const { getUsuarios } = require('../controllers/users');

router.get('/', getUsuarios );

module.exports = router;