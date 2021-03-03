// Importamos SDK
const mercadopago = require("mercadopago");
// Configuramos SDK con nuestro access token
mercadopago.configure({
  access_token:
    process.env.MP_CREDENTIALS
});

const demoCheckout = async (req, res) => {
  //console.log(req.body)
  const array =[]
 
  for (let i = 0; i < req.body.length; i++) {
    array.push({
      title: req.body[i].titulo,
      quantity: 1,
      currency_id: "ARS",
      unit_price: req.body[i].precio,
  
    })
  }

  //console.log(array)

  const estructuraPreferencia = {

    items: array,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
        {
          id: "atm",
        },
      ],
    },
    external_reference: "123123",
    binary_mode: true,
    auto_return: "all",
    back_urls: {
      failure: "http://localhost:3000/pago_rechazado/",
      success: "http://localhost:3000/pago_exitoso/",
    },
  };

  const preferenciaCreada = await mercadopago.preferences.create(estructuraPreferencia);
  //return res.redirect(preferenciaCreada.response.init_point);

  return res.json(preferenciaCreada);
};

const successPayment = (req, res) => {
  return res.render("success");
};

const failedPayment = (req, res) => {
  return res.render("rejected");
};

module.exports = {
  demoCheckout,
  successPayment,
  failedPayment,
};
