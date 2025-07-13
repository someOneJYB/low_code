import axios from "axios";
import {common, end, myAxios} from "./index";

// 查询, 没有设置登录权限
export function getCanvas(
  values: number, //id
  successCallback: Function,
  failedCallback?: Function
) {
  console.log(values, '0')
  axios.get(end + "/api/lowCode/edit/" + values, {headers: {token: localStorage.getItem("token") || ""}}).then((res) => {
    common(res, successCallback);
  });
}

// 保存
export function saveCanvas(
  values: {id?: number | null; content: string; type?: string; title?: string},
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios.post("/api/lowCode/save", values).then((res) => {
    common(res, successCallback);
  });
}

// 查询页面列表
export function getCanvasList(
  values: any,
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios
    .get(end + "/api/lowCode/list?pageSize=1000" + values)
    .then((res) => {
      common(res, successCallback, failedCallback);
    });
}

// 查询模板列表
export function getTemplateList(
  values: any,
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios
    .get(end + "/api/lowCode/list?pageSize=1000" + values)
    .then((res) => {
      common(res, successCallback, failedCallback);
    });
}

// 删除
export function deleteCanvas(
  values: {id: number},
  successCallback: Function,
  failedCallback?: Function
) {
  myAxios.get(end + `/api/lowCode/delete?id=${values.id}`).then((res) => {
    common(res, successCallback);
  });
}
