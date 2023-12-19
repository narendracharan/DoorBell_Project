const paytabs = require("paytabs_pt2");
const { error, success } = require("../../response");

let profileID = "105265",
  serverKey = "STJN6W2MZH-JHG2BDB6DG-KLJHRR9ZT2",
  region = "SAU";
paytabs.setConfig(profileID, serverKey, region);

exports.paytabsPament = async (request, respose) => {
  try {
    const {
      payment,
      userName,
      Email,
      mobileNumber,
      City,
      State,
      Country,
      Street,
    } = request.body;
    if (!payment) {
      return respose
        .status(201)
        .json(error("Please Provide Payment", respose.statusCode));
    }
    if (!userName) {
      return respose
        .status(201)
        .json(error("Please Provide userName", respose.statusCode));
    }
    if (!Email) {
      return respose
        .status(201)
        .json(error("Please Provide Email", respose.statusCode));
    }
    const transaction = {
      type: "Sale",
      class: "Ecom",
    };
    const cart = {
      id: "908893",
      currency: "SAR",
      amount: payment,
      description: "test payment",
    };
    const customer = {
      name: userName,
      email: Email,
      phone: mobileNumber,
      city: City,
      state: State,
      country: Country,
      street: Street,
    };
    const url = {
      response: "https://www.techgropsedev.com:2053",
      callback: "https://www.techgropsedev.com:2053",
    };
    let paymentMethods = ["all"];

    let transaction_details = [transaction.type, transaction.class];

    let cart_details = [cart.id, cart.currency, cart.amount, cart.description];

    let customer_details = [
      customer.name,
      customer.email,
      customer.phone,
      customer.street,
      customer.city,
      customer.state,
      customer.country,
      // customer.zip,
      // customer.IP
    ];

    let shipping_address = customer_details;

    let response_URLs = [url.response, url.callback];

    let lang = "en";

    paymentPageCreated = function ($results) {
      respose
        .status(200)
        .json(success(respose.statusCode, "Suucess", { $results }));
    };

    let frameMode = true;
    paytabs.createPaymentPage(
      paymentMethods,
      transaction_details,
      cart_details,
      customer_details,
      shipping_address,
      response_URLs,
      lang,
      paymentPageCreated,
      frameMode
    );
  } catch (err) {
    console.log(err);
    respose.status(400).json(error("Error", respose.statusCode));
  }
};

// exports.validatePayment = (tranRef,callback)=>{

//   data = {
//       'profile_id':profileID,
//       'tran_ref':"TST2335300822100"
//   }
//    url = _sendPost(config.region)+'payment/query';
//  _sendPost(url,data,callback);
// }
