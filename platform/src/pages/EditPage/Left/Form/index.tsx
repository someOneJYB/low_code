import { defaultComponentStyle, isSubmitBtn, isInput, isForm } from "src/utils/const";
import { Button, Input } from "antd";
import leftSideStyles from "../leftSide.module.less";
import {isGraphComponent, isTextComponent} from "../index";
import useEditStore from "src/store/editStore";
import {ICmp} from "src/store/editStoreTypes";

const defaultStyle = {
  ...defaultComponentStyle,
  width: 120,
  height: 120,
  borderColor: "blue",
  backgroundColor: "blue",
};
const settings = [
  {
    type: isForm,
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
    children: [
      {
        type: 'text',
        value: '用户名',
           style: {
      ...defaultStyle,
      borderWidth: 1,
             borderStyle: "solid",
      borderColor: '#ccc',
      backgroundColor: "transparent",
    },
      },
      {
    type: isInput,
    formKey: '',
    formItenName: 'submit',
    value: '提交',
    desc: '提交按钮',
    style: {
      ...defaultStyle,
      width: 150,
      height: 20,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
    onClick: {
      url: 'https://www.baidu.com',
      afterSuccess: 'pop',
      popMsg: '操作成功'
    }
  },
    ]
  },
  {
    type: isSubmitBtn,
    formKey: '',
    formItenName: 'submit',
    value: '提交',
    desc: '提交按钮',
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
    onClick: {
      url: 'https://www.baidu.com',
      afterSuccess: 'pop',
      popMsg: '操作成功'
    }
  },
  {
    type: isInput,
    formKey: '',
    formItenName: 'submit',
    value: '提交',
    desc: '提交按钮',
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
    onClick: {
      url: 'https://www.baidu.com',
      afterSuccess: 'pop',
      popMsg: '操作成功'
    }
  },
];

export default function Form() {
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
              borderStyle: item.style.borderStyle,
              borderColor: item.style.borderColor,
            }}
            onClick={() => addCmp({...item, type: isGraphComponent})}
            draggable="true"
            onDragStart={(e) =>
              onDragStart(e, {...item, type: isGraphComponent})
            }>
            {item.type === isInput ? <Input /> : <Button type="primary">{ item.desc}</Button>}
            </li>
        ))}
      </ul>
    </div>
  );
}
