import InputColor from "src/lib/InputColor";
import Item from "src/lib/Item";
import { useState } from "react";
import { isImgComponent, isTextComponent } from "../../Left";
import styles from "./index.module.less";
import useEditStore, { selectedCmpSelector } from "src/store/editStore";
import { useCanvasFromEditStore } from "src/store/editStoreHooks";
import { ICmpWithKey } from "src/store/editStoreTypes";
import JsonEditor from "../../../../components/business/JSON";

export default function EditCmp() {
  const [useJson, setUseJson] = useState(false);
  const editStore = useEditStore();
  console.log(editStore, "store info");

  const selectedCmp = selectedCmpSelector(editStore) as ICmpWithKey;

  const { value, style, onClick = "" } = selectedCmp;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    editStore.updateSelectedCmpValue(newValue);
  };

  const handleStyleChange = (
    e: any,
    { name, value }: { name: string; value: string | number }
  ) => {
    const newStyle = { [name]: value };

    editStore.updateSelectedCmpStyle(newStyle);
  };

  const handleAttrChange = (
    e: any,
    { name, value }: { name: string; value: string }
  ) => {
    editStore.updateSelectedCmpAttr(name, value);
  };

  const handleAnimationChange = (e: any) => {
    const value = e.target.value;
    const newStyle = {
      animationName: value,
      animationIterationCount: style.animationIterationCount || 1,
      animationDuration: style.animationDuration || "1s",
      animationDelay: style.animationDelay || "0",
      animationPlayState: "running",
    };
    editStore.updateSelectedCmpStyle(newStyle);
  };

  const canvasData = useCanvasFromEditStore();
  const canvasWidth = canvasData.style.width;
  const selectCmpWidth = selectedCmp.style.width;
  console.log(selectedCmp, "selectedCmp", style, "属性");

  const handleSave = (json) => {
    console.log("保存的JSON数据:", json);
    alert("JSON数据已保存！");
  };

  const handleChange = (json) => {
    console.log("JSON数据变化:", json);
  };

  

  if (useJson) {
    console.log(selectedCmp, '0')
    return (
      <div className={styles.main}>
        <div className={styles.title}>
          组件属性
          <div
            style={{ float: "right", color: "blue", marginTop: -10 }}
            onClick={() => setUseJson(false)}
          >
            关闭json编辑
          </div>
        </div>
        <JsonEditor  initialJson={selectedCmp} 
            onSave={handleSave}
            onChange={handleChange} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        组件属性
        <div
          style={{ float: "right", color: "blue", marginTop: -10 }}
          onClick={() => setUseJson(true)}
        >
          json编辑
        </div>
      </div>

      {selectedCmp.type === isImgComponent && (
        <Item label="描述: ">
          <input
            type="text"
            className={styles.itemRight}
            value={value}
            onChange={handleValueChange}
          />
        </Item>
      )}

      {style.position && (
        <Item label="定位: ">
          <select
            className={styles.itemRight}
            value={style.position}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "position",
                value: e.target.value,
              });
            }}
          >
            <option value="absolute">absolute</option>
            <option value="static">static</option>
            <option value="fixed">fixed</option>
            <option value="relative">relative</option>
          </select>
        </Item>
      )}
      {style.position && (
        <Item label="left: ">
          <input
            type="text"
            className={styles.itemRight}
            value={style.left || 0}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "left",
                value: e.target.value,
              });
            }}
          />
        </Item>
      )}
      {style.position && (
        <Item label="right: ">
          <input
            type="text"
            className={styles.itemRight}
            value={style.right || 0}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "right",
                value: e.target.value,
              });
            }}
          />
        </Item>
      )}
      {style.position && (
        <Item label="top: ">
          <input
            type="text"
            className={styles.itemRight}
            value={style.top || 0}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "top",
                value: e.target.value,
              });
            }}
          />
        </Item>
      )}
      {style.position && (
        <Item label="bottom: ">
          <input
            type="text"
            className={styles.itemRight}
            value={style.bottom || 0}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "bottom",
                value: e.target.value,
              });
            }}
          />
        </Item>
      )}

      {style.fontSize !== undefined && (
        <Item label="字体大小: ">
          <input
            type="number"
            className={styles.itemRight}
            value={style.fontSize}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "fontSize",
                value: parseInt(e.target.value) - 0,
              });
            }}
          />
        </Item>
      )}

      {style.fontWeight !== undefined && (
        <Item label="字体粗细: ">
          <select
            className={styles.itemRight}
            value={style.fontWeight}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "fontWeight",
                value: e.target.value,
              });
            }}
          >
            <option value="normal">normal</option>
            <option value="bold">bold</option>
            <option value="lighter">lighter</option>
          </select>
        </Item>
      )}

      {style.lineHeight !== undefined && (
        <Item label="行高: ">
          <input
            type="number"
            className={styles.itemRight}
            value={parseInt(style.lineHeight)}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "lineHeight",
                value: e.target.value + "px",
              });
            }}
          />
        </Item>
      )}

      {selectedCmp.type === isTextComponent && (
        <Item
          label="装饰线: "
          tips="如果设置完还是看不到装饰线，调整下行高试试~"
        >
          <select
            className={styles.itemRight}
            value={style.textDecoration || "none"}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "textDecoration",
                value: e.target.value,
              });
            }}
          >
            <option value="none">无</option>
            <option value="underline">下划线</option>
            <option value="overline">上划线</option>
            <option value="line-through">删除线</option>
          </select>
        </Item>
      )}

      {style.textAlign !== undefined && (
        <Item label="对齐: ">
          <select
            className={styles.itemRight}
            value={style.textAlign}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "textAlign",
                value: e.target.value,
              });
            }}
          >
            <option value="left">居左</option>
            <option value="center">居中</option>
            <option value="right">居右</option>
          </select>
        </Item>
      )}

      <Item label="对齐页面: ">
        <select
          className={styles.itemRight}
          onChange={(e) => {
            const align = e.target.value;
            let newStyle: _Style = {};
            switch (align) {
              case "left":
                newStyle.left = 0;
                break;
              case "right":
                newStyle.right = 0;
                break;

              case "x-center":
                newStyle.left = "center";
                break;
              case "top":
                newStyle.top = 0;
                break;
              case "bottom":
                newStyle.bottom = 0;
                break;

              case "y-center":
                newStyle.top = "center";
                break;
            }
            editStore.editAssemblyStyle(newStyle);
          }}
        >
          <option>选择对齐页面方式--</option>
          <option value="left">左对齐</option>
          <option value="right">右对齐</option>
          <option value="x-center">水平居中</option>
          <option value="top">上对齐</option>
          <option value="bottom">下对齐</option>
          <option value="y-center">垂直居中</option>
        </select>
      </Item>

      {style.transform !== undefined && (
        <Item label="旋转: ">
          <input
            className={styles.itemRight}
            type="number"
            value={style.transform}
            onChange={(e) =>
              handleStyleChange(e, {
                name: "transform",
                value: e.target.value,
              })
            }
          />
        </Item>
      )}

      {style.borderRadius !== undefined && (
        <Item label="圆角: ">
          <input
            className={styles.itemRight}
            type="text"
            value={style.borderRadius}
            onChange={(e) =>
              handleStyleChange(e, {
                name: "borderRadius",
                value: e.target.value,
              })
            }
          />
        </Item>
      )}

      <Item label="边框样式: ">
        <select
          className={styles.itemRight}
          value={style.borderStyle}
          onChange={(e) => {
            handleStyleChange(e, {
              name: "borderStyle",
              value: e.target.value,
            });
          }}
        >
          <option value="none">none</option>
          <option value="dashed">dashed</option>
          <option value="dotted">dotted</option>
          <option value="double">double</option>
          <option value="groove">groove</option>
          <option value="hidden">hidden</option>
          <option value="solid">solid</option>
        </select>
      </Item>

      <Item label="边框宽度: ">
        <input
          className={styles.itemRight}
          type="number"
          value={style.borderWidth}
          onChange={(e) =>
            handleStyleChange(e, {
              name: "borderWidth",
              value: parseInt(e.target.value) - 0,
            })
          }
        />
      </Item>

      <Item label="边框颜色: ">
        <InputColor
          className={styles.itemRight}
          color={style.borderColor || "#ffffff00"}
          onChangeComplete={(e: any) =>
            handleStyleChange(null, {
              name: "borderColor",
              value: `rgba(${Object.values(e.rgb).join(",")})`,
            })
          }
        />
      </Item>

      {style.color !== undefined && (
        <Item label="字体颜色: ">
          <InputColor
            className={styles.itemRight}
            color={style.color}
            onChangeComplete={(e) =>
              handleStyleChange(null, {
                name: "color",
                value: `rgba(${Object.values(e.rgb).join(",")})`,
              })
            }
          />
        </Item>
      )}

      {style.backgroundColor !== undefined && (
        <Item label="背景颜色: ">
          <InputColor
            className={styles.itemRight}
            color={style.backgroundColor}
            onChangeComplete={(e) => {
              handleStyleChange(null, {
                name: "backgroundColor",
                value: `rgba(${Object.values(e.rgb).join(",")})`,
              });
            }}
          />
        </Item>
      )}

      <Item label="点击跳转: ">
        <input
          className={styles.itemRight}
          type="text"
          value={onClick}
          onChange={(e) =>
            handleAttrChange(e, {
              name: "onClick",
              value: e.target.value,
            })
          }
        />
      </Item>
      <Item label="动画效果: ">
        <select
          className={styles.itemRight}
          value={style.animationName}
          onChange={(e) => {
            handleAnimationChange(e);
          }}
        >
          <option value="">无动画</option>
          <option value="zoomOut">缩放飞出</option>
          <option value="zoomIn">缩放飞入</option>
          <option value="flyOutBottom">底部飞出</option>
          <option value="flyOutTop">顶部飞出</option>
          <option value="flyOutRight">右侧飞出</option>
          <option value="flyOutLeft">左侧飞出</option>
          <option value="flyInBottom">底部飞入</option>
        </select>
      </Item>
      {style.animationName !== undefined && (
        <Item label="动画持续时长: ">
          <input
            type="number"
            className={styles.itemRight}
            color={style.backgroundColor}
            value={parseInt(style.animationDuration + "", 10)}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "animationDuration",
                value: `${e.target.value}s`,
              });
            }}
          />
        </Item>
      )}
      {style.animationName !== undefined && (
        <Item label="动画循环次数: ">
          <input
            type="number"
            className={styles.itemRight}
            color={style.backgroundColor}
            value={style.animationIterationCount}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "animationIterationCount",
                value: Number.isNaN(e.target.value) ? 0 : +e.target.value,
              });
            }}
          />
        </Item>
      )}
      {style.animationName !== undefined && (
        <Item label="动画延迟时间: ">
          <input
            type="number"
            className={styles.itemRight}
            color={style.backgroundColor}
            value={parseInt(style.animationDelay + "")}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "animationDelay",
                value:
                  (Number.isNaN(e.target.value) ? 0 : e.target.value) + "s",
              });
            }}
          />
        </Item>
      )}
    </div>
  );
}
