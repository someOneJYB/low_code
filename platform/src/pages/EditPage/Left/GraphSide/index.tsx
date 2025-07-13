import {defaultComponentStyle} from "src/utils/const";
import leftSideStyles from "../leftSide.module.less";
import {isGraphComponent} from "../index";
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
    value: "",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
  },
  {
    value: "",
    style: defaultStyle,
  },
];

export default function GraphSide() {
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
            
            </li>
        ))}
      </ul>
    </div>
  );
}
