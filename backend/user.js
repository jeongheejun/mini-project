import Cheerio from "cheerio";
import axios from "axios";

export const getOg = async (prefer) => {
  const ogObj = {};
  // 1. 입력된 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기(.find() 등의 알고리즘 사용하기)
  if (!prefer.includes("http"))  return false;

  // 2. axios.get으로 요청해서 html 코드 받아오기 => 스크래핑
  const result = await axios.get(prefer);
  // 3. 스크래핑 결과에서 OG(오픈그래프) 코드를 골라내서 변수에 담기 => cheerio 도구 사용
  const $ = Cheerio.load(result.data);
  $("meta").each((index, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property").slice(3); // ex) og:title
      const value = $(el).attr("content"); // ex) 네이버
      ogObj[key] = value;
    }
  });

  return ogObj;
};

function dashCheck(num) {
  const dash = num.indexOf("-");

  if (dash !== 6) {
    return false;
  } else {
    return true;
  }
}

function lengthCheck(num) {
  const backNum = num.substring(7);

  if (backNum.length !== 7) {
    return false;
  } else {
    return true;
  }
}

function getNum(num) {
  const frontNum = num.substring(0, 6);
  const backFirstNum = num.substring(7, 8);

  const result = frontNum + "-" + backFirstNum + "******";

  return result;
}

export function customRegistrationNumber(num) {
  const dashIsValid = dashCheck(num);
  if (!dashIsValid) return;

  const lengthIsValid = lengthCheck(num);
  if (!lengthIsValid) return;

  const result = getNum(num);

  return result;
}
