//**REQUERIR EL MODELO DE LA BASE DE DATOS**/
const ProductoSchema = require ('../database/models/ProductosSchema');
const fs = require ('fs')
const path = require('path');


module.exports = {
    listar : async(req, res, next)=> {
            const productos = await ProductoSchema.find();
            res.json(productos);
          },
          listarUno : async(req, res, next)=> {
            const unProducto = await ProductoSchema.findById(req.params.id);
            
            res.json(unProducto);
          },

    crear: async(req,res,next)=>{
    
 //console.log(req.files)
            const { titulo, descripcion, precio } = req.body

            const producto = await new ProductoSchema({
               titulo,
               descripcion, 
               precio, 
               imagen:`/img/${req.files[0].filename}`
               
    
            });
            
            await producto.save();
            res.json({
              status: 'producto Guardado'
            });
 
          },

    editar:async(req,res,next)=>{
if(!req.body.imagen){

  const urlImg = req.body.imgVieja

  fs.unlink(`public/${urlImg}`, (err) => {
    if (err)
    console.log(urlImg + "   eliminado");
  }); 

        const { titulo, descripcion, precio } = req.body
        const bodyEdit = {
            titulo,
            descripcion, 
            precio, 
            imagen:`/img/${req.files[0].filename}`
        }
        
        await ProductoSchema.findByIdAndUpdate(req.params.id, bodyEdit);
        res.json({
          status: 'producto Editado'
        });
      
    
     

      }else{
 
await ProductoSchema.findByIdAndUpdate(req.params.id, req.body);
res.json({
  status: 'producto Editado'
});
      }

        },
    eliminar:async(req,res,next)=>{

const unProducto = await ProductoSchema.findById(req.params.id);
const urlImg = unProducto.imagen

fs.unlink(`public/${urlImg}`, (err) => {
  if (err)
  console.log(urlImg + "   eliminado");
}); 

  await ProductoSchema.findByIdAndRemove(req.params.id);

  res.json({
    status: 'producto Eliminado'
      });
        }
}