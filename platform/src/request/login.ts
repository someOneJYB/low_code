import axios from "axios";
import {common, end} from "./index";

export function login(
  values: {username: string; password: string},
  successCallback: Function,
  failedCallback?: Function
) {
  axios.post(end + "/api/login", values).then((res) => {
    // 缓存 sessionId
    common(
      res,
      (res1: any) => {
        console.log(res1, 'res')
        localStorage.setItem('token', res1.token);
        // docCookies.setItem("sessionId", res.data.result.sessionId);
        // docCookies.setItem("name", res.data.result.username);
        successCallback();
      },
      failedCallback
    );
  });
}
