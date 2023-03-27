import mongoose from "mongoose";

// 구조 생성
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: Object,
});

// 모델 생성
export const User = mongoose.model("user", userSchema);
