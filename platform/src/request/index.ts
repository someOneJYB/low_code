import axios from "axios";
import docCookies from "../utils/cookies";
import useLoginStore from "src/store/loginStore";
export const end = ""; // 使用后端地址

export function common(
  res: any,
  successCallback: Function,
  failedCallback?: Function
) {
  console.log(res, '00000')
  if (res.status === 401) {
    failedCallback &&  failedCallback(401)
    return;
  }
  if (res.status === 200) {
    let code = res.data.code;
    if (code === 1) {
      successCallback(res.data.data);
    } else if (code === 401) {
      typeof failedCallback === "function"
        ? failedCallback()
        : alert("请先登录！");
    } //if (code === 500)
    else {
      typeof failedCallback === "function"
        ? failedCallback()
        : alert(res.data.msg || "信息有误，失败！");
    }
  } else if (res.status === 500) {
    typeof failedCallback === "function" ? failedCallback() : alert("失败！");
  }
}

function getHeaders(): {
  headers: {
    Authorization: string;
    token: string;
  };
} {
  return {headers: {token: localStorage.getItem("token") || ""}};
}

export const myAxios = {
  get: (url: string, values?: any) => axios.get(url, getHeaders()),
  post: (url: string, values: any) => axios.post(url, values, getHeaders()),
};
