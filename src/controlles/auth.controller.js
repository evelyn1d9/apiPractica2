const Usuarios = require('../models/auth.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = async(req,res)=>{
    try {
        const {correo,clave} = req.body;
        if(correo == undefined || clave == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Faltan parametros"
            })
        }
        else{
            const usuario = await Usuarios.findOne({correo:correo});
            if(!usuario){
                res.status(404).json({
                    estado:0,
                    mensaje:"Usuario no encontrado"
                })
            } else{
            usuario.clave = clave
            const resultadoComparacion = bcrypt.compare(clave,usuario.clave)
            if (resultadoComparacion) {
                res.status(200).json({
                    estado:1,
                    mensaje:"Acceso correcto",
                    token:"Aqui va el token"
                })
            } else {
                res.status(401).json({
                    estado:1,
                    mensaje:"Clave incorrecta, intente de nuevo por favor"
                })
            }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrio un error desconocido"
        })
    }
}

exports.register = async (req, res) => {
    try {
      const { correo, clave } = req.body;
  
      
      const usuarioExistente = await Usuarios.findOne({ correo });
  
      if (usuarioExistente) {
        return res.status(400).json({
          estado: 0,
          mensaje: 'El usuario ya existe',
        });
      }
  
      
      const hashedPassword = await bcrypt.hash(clave, 10);
  
      // Crear nuevo  user
      const newUser = new Usuarios({
        correo,
        clave: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
        expiresIn: '1h',
      });
  
      res.status(201).json({
        estado: 1,
        mensaje: 'Usuario registrado exitosamente',
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        estado: 0,
        mensaje: 'Ocurrió un error desconocido',
      });
    }
  };