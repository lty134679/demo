// 固话和手机号
export const fixedAndMobile = (val) => {
  let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
  return reg.test(val);
};

// 手机号
export const mobile = (val) => {
  let reg = /^1[3456789]\d{9}$/;
  return reg.test(val);
};

// 身份证号
export const IDCard = (val) => {
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  return reg.test(val);
};

// 信用代码
export const creditCode = (val) => {
  let reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
  return reg.test(val);
};

// 日期
export const date = (val) => {
  var result = val.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (result == null) return false;
  var d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() == result[1] &&
    d.getMonth() + 1 == result[3] &&
    d.getDate() == result[4]
  );
};
//邮箱
export const email = (val) => {
  let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
  return reg.test(val);
};

//银行卡
export const bankCard = (val) => {
  console.log(val);

  const lastNum = +val.substr(val.length - 1, 1);
  const first15Num = val.substr(0, val.length - 1);
  const newArr = [];
  for (let i = first15Num.length - 1; i > -1; i -= 1) {
    newArr.push(first15Num.substr(i, 1));
  }
  const arrJiShu = [];
  const arrJiShu2 = [];
  const arrOuShu = [];
  for (let j = 0; j < newArr.length; j += 1) {
    if ((j + 1) % 2 === 1) {
      if (parseInt(newArr[j], 10) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j], 10) * 2);
      } else {
        arrJiShu2.push(parseInt(newArr[j], 10) * 2);
      }
    } else {
      arrOuShu.push(newArr[j]);
    }
  }

  const jishuChild1 = [];
  const jishuChild2 = [];
  for (let h = 0; h < arrJiShu2.length; h += 1) {
    jishuChild1.push(parseInt(arrJiShu2[h], 10) % 10);
    jishuChild2.push(parseInt(arrJiShu2[h], 10) / 10);
  }

  let sumJiShu = 0;
  let sumOuShu = 0;
  let sumJiShuChild1 = 0;
  let sumJiShuChild2 = 0;
  let sumTotal = 0;
  for (let m = 0; m < arrJiShu.length; m += 1) {
    sumJiShu += parseInt(arrJiShu[m], 10);
  }

  for (let n = 0; n < arrOuShu.length; n += 1) {
    sumOuShu += parseInt(arrOuShu[n], 10);
  }

  for (let p = 0; p < jishuChild1.length; p += 1) {
    sumJiShuChild1 += parseInt(jishuChild1[p], 10);
    sumJiShuChild2 += parseInt(jishuChild2[p], 10);
  }
  sumTotal =
    parseInt(sumJiShu, 10) +
    parseInt(sumOuShu, 10) +
    parseInt(sumJiShuChild1, 10) +
    parseInt(sumJiShuChild2, 10);
  const k =
    parseInt(sumTotal, 10) % 10 === 0 ? 10 : parseInt(sumTotal, 10) % 10;
  const luhn = 10 - k;
  if (lastNum === luhn) {
    return true;
  } else {
    return false;
  }
};
