import classNames from "classnames";
import {memo, useState, useEffect} from "react";

import styles from "./index.module.less";
import TextSide from "./TextSide";
import ImgSide from "./ImgSide";
import TplSide from "./TplSide";
import GraphSide from "./GraphSide";
import Form from './Form';
import LeadForm from "./LeadForm";
import Card from './ProductCard';

export const isTplSide = 4;
export const isTextComponent = 1;
export const isImgComponent = 2;
export const isGraphComponent = 3;
export const isFormComponent = 5;
export const isLeadFormComponent = 6;
export const isCardComponent = 7;

const Left = memo(() => {
  const [showSide, setShowSide] = useState(0);

  const _setShowSide = (which: number) => {
    if (showSide === which) {
      setShowSide(0);
    } else {
      setShowSide(which);
    }
  };

  useEffect(() => {
    document.getElementById("center")?.addEventListener("click", () => {
      setShowSide(0);
    });
  }, []);

  console.log("left render"); //sy-log

  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li
          className={classNames(
            styles.cmp,
            showSide === isTplSide ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTplSide)}>
          <i
            className={classNames(
              "iconfont icon-mobankuangjia-xianxing",
              styles.cmpIcon
            )}
          />
          <span className={styles.cmpText}>模板</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isTextComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTextComponent)}>
          <i className={classNames("iconfont icon-wenben", styles.cmpIcon)} />
          <span className={styles.cmpText}>文本</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isImgComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isImgComponent)}>
          <i className={classNames("iconfont icon-tupian", styles.cmpIcon)} />
          <span className={styles.cmpText}>图片</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isGraphComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isGraphComponent)}>
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          />
          <span className={styles.cmpText}>图形</span>
        </li>
                <li
          className={classNames(
            styles.cmp,
            showSide === isFormComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isFormComponent)}>
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          />
          <span className={styles.cmpText}>表单</span>
        </li>
                 <li
          className={classNames(
            styles.cmp,
            showSide === isLeadFormComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isLeadFormComponent)}>
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          />
          <span className={styles.cmpText}>留资页</span>
        </li>
              <li
          className={classNames(
            styles.cmp,
            showSide === isCardComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isCardComponent)}>
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          />
          <span className={styles.cmpText}>卡片</span>
        </li>
      </ul>

      {showSide === isTextComponent && <TextSide />}
      {showSide === isImgComponent && <ImgSide />}
      {showSide === isTplSide && <TplSide />}
      {showSide === isGraphComponent && <GraphSide />}
      {showSide === isFormComponent && <Form />}
      {showSide === isLeadFormComponent && <LeadForm/>}
      {showSide === isCardComponent && <Card />}
    </div>
  );
});

export default Left;
