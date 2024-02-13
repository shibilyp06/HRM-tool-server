const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
console.log(accountSid, "hhh");

module.exports = function getOTP(number) {
  try{
    client.verify.v2
      .services("VA8b95e47837d753406b1c98a399a8d513")
      .verifications.create({ to: `+91${number}`, channel: "sms" })
      .then((verification) => console.log(verification.status));
  }catch{
      res.status(400).json({message:"OTP verification failed"})
  }
}
