const response = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  try {

    const { idUcc, primerNombre, segundoNombre, primerApellido, segundoApellido, programa, semestre, identificacion, telefono, correoInstitucional, fechaVinculacion, fechaNacimiento, direccion} = req.body;

    let usuario = await Usuario.findOne({ correoInstitucional, idUcc, identificacion });

    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: "Un usuario existe con ese correo, id de la universidad o identificación",
        });
    }


    let contraseña = identificacion;

    usuario = new Usuario({
        idUcc,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        programa,
        semestre,
        identificacion,
        telefono,
        correoInstitucional,
        fechaVinculacion,
        fechaNacimiento,
        direccion,
        contraseña
    });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.contraseña = bcrypt.hashSync(contraseña, salt);

    //Guardar usuario en la base de datos
    await usuario.save();
    
     //Generar JWT
     const token = await generarJWT(usuario.id, usuario.primerNombre);

    //El status 201 indica que se ha hecho el registro correcto en la base de datos
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.primerNombre,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { correoInstitucional, contraseña } = req.body;

  try{

    const usuario = await Usuario.findOne({ correoInstitucional});

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario y contraseña no son correctos",
        });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(contraseña, usuario.contraseña);

    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: "Usuario y contraseña no son correctos",
        });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.primerNombre);

    res.json({
        ok: true,
        uid: usuario.id,
        nombre: usuario.primerNombre,
        token
    });


  }catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
