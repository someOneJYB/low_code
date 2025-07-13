// src/components/LeadForm/LeadForm.jsx
import { defaultComponentStyle } from "src/utils/const";
import leftSideStyles from "../leftSide.module.less";
import { isCardComponent } from "../index";
import useEditStore from "src/store/editStore";
import { ICmp } from "src/store/editStoreTypes";
import React, { useState } from "react";
import styles from "./index.module.css";
import Card1 from '../../../../components/Card'

const defaultStyle = {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 10,
  alignItems: 'center',
  height: 97,
  boxSizing: "border-box",
  width: 300,
  display: "flex",
};

const cardData = {
  productName: "蓝医保·长期医疗险",
  tags: ["保证续保20年", "开放70周岁可投", "震撼升级"],
  price: "12.78",
  unit: "起/月",
  link: "https://www.baidu.com",
  url: 'https://h-h5api.cpiccdn.com/h5-api/image/v1/6ec698e6708144c6b1ef5f566a40c51a.png'
};

const settings = [
  {
    value: "",
    style: {
      ...defaultStyle,
    },
    ...cardData,
  },
];

export default function Card() {
  const editStore = useEditStore();
  const addCmp = (_cmp: ICmp) => {
    editStore.addCmp(_cmp);
  };

  const onDragStart = (e: any, _cmp: any) => {
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp));
  };

  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item, index) => (
          <li
            key={"item" + index}
            className={leftSideStyles.item}
            style={{
              width: item.style.width,
              height: item.style.height,
              backgroundColor: item.style.backgroundColor,
              position: "relative",
            }}
            onClick={() => addCmp({ ...item, type: isCardComponent })}
            draggable="true"
            onDragStart={(e) =>
              onDragStart(e, { ...item, type: isCardComponent })
            }
          >
            <Card1 {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
