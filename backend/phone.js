import coolSms from "coolsms-node-sdk";


const mySms = coolSms.default;

import "dotenv/config";
const SMS_KEY = process.env.SMS_KEY;
const SMS_SECRET = process.env.SMS_SECRET;
const SMS_SENDER = process.env.SMS_SENDER;

export function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    return false; // early exit 패턴
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return result;
}

export async function sendTokenToSMS(myPhone, myToken) {

  const messageService = new mySms(
    SMS_KEY,
    SMS_SECRET
  );
  const result = await messageService.sendOne({
    to: myPhone,
    from: SMS_SENDER,
    text: `안녕하세요!! 인증번호는 ${myToken} 입니다!!`,
  });
}


