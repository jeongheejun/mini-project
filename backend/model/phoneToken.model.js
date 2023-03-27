import mongoose from "mongoose";

// 구조 생성
const PhoneTokenSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean,
});

// 모델 생성
export const PhoneToken = mongoose.model("phoneToken", PhoneTokenSchema);
