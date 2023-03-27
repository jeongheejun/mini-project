import { getToday } from "./utils.js";
import nodeMailer from "nodemailer";

import 'dotenv/config'

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_SENDER = process.env.EMAIL_SENDER;

export function emailCheck(email) {
  if (!email || !email.includes("@")) {
    return false;
  } else {
    return true;
  }
}

export function getTemplate({ name, phone, prefer }) {
  const myTemplate = `
        <html>
            <body>
              <h1>${name}님 가입을 환영합니다!!!</h1>
              <hr/>
              <div>이름 : ${name}</div>
              <div>전화번호 : ${phone}</div>
              <div>좋아하는 사이트 : <a href="${prefer}">${prefer}</a></div>
              <div style = "color : red;">가입일 : ${getToday()}</div>
            </body>
        </html>
    `;
  return myTemplate;
}


export async function sendTemplateToEmail(email, myTemplate) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "회원 가입을 축하합니다!!",
    html: myTemplate,
  });
}
