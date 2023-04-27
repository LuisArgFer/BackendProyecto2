import twilio from "twilio";

const accountSid = "ACf89faa14c8f2d2817748e062348de1a9";
const authToken = "35839167f516b42c8920373fb0fbf299";
const fromPhone = "+16813813252";

const client = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      to,
      from: fromPhone,
      body,
    });
    return message;
  } catch (error) {
    console.log(error);
  }
};

export default sendSMS;