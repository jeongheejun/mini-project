import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { PhoneToken } from "./model/phoneToken.model.js";
import { User } from "./model/user.model.js";
import { getOg, customRegistrationNumber } from "./user.js";
import { sendTemplateToEmail, getTemplate, emailCheck } from "./email.js";
import mongoose from "mongoose";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://my-database:27017/myDocker")
  .then(() => console.log("db접속에 성공하였습니다."))
  .catch(() => console.log("db접속에 실패하였습니다."));

const app = express();

app.use(
  "/mini-project",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(options))
);
app.use(express.json());
app.use(cors());

app.post("/users", async function (req, res) {
  let { name, email, personal, prefer, pwd, phone } = req.body;

  if (JSON.stringify(req.query) !== "{}") {
    name = req.query.name;
    email = req.query.email;
    personal = req.query.personal;
    prefer = req.query.prefer;
    pwd = req.query.pwd;
    phone = req.query.phone;
  }

  const isAuth = await PhoneToken.findOne({ phone });

  const joinAuth = await User.findOne({ phone });
  console.log(joinAuth)
  if (joinAuth) {
    return res
      .status(422)
      .send({ message: "이미 가입완료된 번호 입니다!", status: false });
  }

  if (!isAuth || !phone)
    return res.status(422).send({
      message: "에러!! 핸드폰 번호가 인증되지 않았습니다",
      status: false,
    });

  const og = await getOg(prefer);

  if (!og) {
    return res
      .status(422)
      .send({ message: "에러!! 주소를 확인해주세요", status: false });
  }

  const customPersonal = customRegistrationNumber(personal);

  const user = new User({
    name,
    email,
    personal: customPersonal,
    prefer,
    pwd,
    phone,
    og,
  });

  const isValid = emailCheck(email);
  if (!isValid)
    return res
      .status(422)
      .send({ message: "에러!! 이메일을 확인해주세요", status: false });

  const myTemplate = getTemplate({ name, phone, prefer });

  sendTemplateToEmail(email, myTemplate);

  const result = await user.save();

  res.send({ message: `${result._id} id로 가입 완료!!`, status: true });
});

app.get("/users", async function (req, res) {
  const result = await User.find();

  res.send(result);
});

app.post("/tokens/phone", async function (req, res) {
  let myPhone = req.body.phone;

  if (JSON.stringify(req.query) !== "{}") {
    myPhone = req.query.phone;
  }

  const isValid = checkPhone(myPhone);

  if (!isValid)
    return res.send({
      message: "에러 발생!! 핸드폰 번호를 제대로 입력해주세요!!!",
      status: false,
    });

  const myToken = getToken();

  const result = await PhoneToken.findOne({ phone: myPhone });

  const Phone = new PhoneToken({
    token: myToken,
    phone: myPhone,
    isAuth: "false",
  });

  if (result) {
    await PhoneToken.updateOne({ phone: myPhone }, { token: myToken });
  } else {
    await Phone.save();
  }

  sendTokenToSMS(myPhone, myToken);

  res.send({ message: "핸드폰으로 인증 문자가 전송되었습니다!", status: true });
});

app.patch("/tokens/phone", async function (req, res) {
  let myPhone = req.body.phone;
  let myToken = req.body.token;

  if (JSON.stringify(req.query) !== "{}") {
    myPhone = req.query.phone;
    myToken = req.query.token;
  }

  let isAuth = false;

  const result = await PhoneToken.findOne({ phone: myPhone });

  if (result) {
    if (result.token !== myToken) {
      isAuth = false;
    } else {
      isAuth = true;
      await PhoneToken.updateOne({ phone: myPhone }, { isAuth: isAuth });
    }
  } else {
    isAuth = false;
  }

  res.send(isAuth);
});

app.listen(4000);
