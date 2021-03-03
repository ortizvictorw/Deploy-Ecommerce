/*Confirma si el usuario envia su token de autorizacion, 
creado al momento del registro*/
const jwt = require('jsonwebtoken');
const UsuarioSchema = require('../database/models/UsuarioSchema');
const Role = require ('../database/models/Role');

module.exports ={ 
    
    verificacionToken:

    async (req, res, next) => {

        try {
            //recibimos un token
        let token = req.headers["x-access-token"];

 
             //si no existe 
            if(!token){
                    return res.status(403).json
                    ({message:"no enviaste un token"})
            }
 
             //si existe decodificamos para extraer un id
            if(token){
                        const decoded = jwt.verify(token,`${process.env.SECRET}`)
                        req.userId = decoded.id;
                        //buscamos el usuario con ese id
                        const user = await UsuarioSchema.findById(req.userId, {password:0})
                        
                        //si no esta en la db
                        if(!user){
                            return res.status(404).json({message:'el usuario no existe en db'})
                        }   
            }
 
         next()
     
        }   catch (error) {
                return res.status(401).
                json({message:'Token invalido'})
            }
        
    },
    esAdministrador:

        async (req, res, next) => {
        try {
          const user = await UsuarioSchema.findById(req.userId);
         
          const roles = await Role.find({ _id: { $in: user.roles } });
            
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].nombre === "administrador") {
              next();
              return;
            }
          }
          return res.status(403).json({ message: "Requires Rol de Administrador!" });
        } catch (error) {
          console.log(error)
          return res.status(500).send({ message: error });
        }
      },
      validacionDeRoles:async(req, res, next) => {
        const ROLES = await Role.find()
        const rolNOmbre = ROLES.map(rol => rol.nombre)
       
        if (req.body.roles) {
          for (let i = 0; i < req.body.roles.length; i++) {
            if (!rolNOmbre.includes(req.body.roles[i])) {
              return res.status(400).json({
                message: `Role ${req.body.roles[i]} does not exist`,
              });
            }
          }
        }
      
        next();
      }
}