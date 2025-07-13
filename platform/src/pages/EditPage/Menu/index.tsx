import classNames from "classnames";
import useEditStore, {nearByCmpsSelector} from "src/store/editStore";
import styles from "./index.module.less";
import {useAssemblyFromEditStore} from "src/store/editStoreHooks";
import {isGraphComponent, isImgComponent, isTextComponent} from "../Left";
import {useState} from "react";
import {ICmpWithKey} from "src/store/editStoreTypes";
import {pick} from "lodash";

export default function Menu({style}: any) {
  const [toggle, setToggle] = useState(false);
  const editStore = useEditStore();

  const copy = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    editStore.addAssemblyCmp();
  };

  const del = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    editStore.deleteCmps();
  };

  const addCmpZIndex = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    editStore.addCmpZIndex();
  };

  const subCmpZIndex = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    editStore.subCmpZIndex();
  };

  const topZIndex = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    editStore.topZIndex();
  };

  const bottomZIndex = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    editStore.bottomZIndex();
  };
  const assembly = useAssemblyFromEditStore();

  const assemblySize = assembly.size;
  if (assemblySize === 0) {
    return null;
  }

  const cmps = nearByCmpsSelector(editStore);

  return (
    <div className={classNames(styles.main)}>
      <ul className={classNames(styles.menu)} style={style}>
        <li onClick={copy}>复制组件</li>
        <li onClick={del}>删除组件</li>
        {assemblySize === 1 && (
          <>
            <li onClick={addCmpZIndex}>上移一层</li>
            <li onClick={subCmpZIndex}>下移一层</li>
            <li onClick={topZIndex}>置顶</li>
            <li onClick={bottomZIndex}>置底</li>
            <li
              onClick={(e) => {
                setToggle(!toggle);
              }}>
              {toggle ? "隐藏" : "显示"}图层
            </li>
          </>
        )}
      </ul>

      {toggle && (
        <ul className={styles.nearByCmps}>
          {cmps.map((item, index) => (
            <Item key={item.key} cmp={item} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
}

interface ItemProps {
  cmp: ICmpWithKey;
  index: number;
}
function Item(props: ItemProps) {
  const {cmp, index} = props;
  const {type, value} = cmp;

  const editStore = useEditStore();

  let left, right;

  switch (type) {
    case isImgComponent:
      left = <img className={styles.left} src={value} alt="" />;
      right = "图片";
      break;

    case isGraphComponent:
      left = (
        <span
          className={styles.left}
          style={pick(cmp.style, [
            "backgroundColor",
            "borderWidth",
            "borderStyle",
            "borderColor",
            "borderRadius",
          ])}></span>
      );
      right = "图形";
      break;

    // case isTextComponent:
    default:
      left = (
        <span
          className={classNames(styles.left, "iconfont icon-wenben")}></span>
      );
      right = value;
      break;
  }

  return (
    <li onClick={() => editStore.setCmpsSelected(index)}>
      {left}
      <span className={styles.txt}>{right}</span>
    </li>
  );
}
