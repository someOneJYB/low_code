
### 使用 zustand 进行状态管理
### 左侧作为组件看板（支持拖拽和点击到中心看板，保证组件对应 type 和数据传递到中心管理中，组件上 onDragStart 的时候传递信息到组件编辑信息中）
### 中间区域使用画布作为展示，onDrop 中增加 e 结束为止的方位判定是否组件是否在画布上，同时监听编辑组件信息使用渲染组件的方法，根据对应类型渲染组件
### 右侧支持编辑区域，支持组件的样式编辑，传递信息给画布，支持预览区域的编辑，点击的时候就可以确认可以编辑的组件属性，右侧的编辑支持当前选中的组件可以进行属性编辑
### 一些额外的编辑支持 rotate 放大、缩小
### 设计状态管理
```json
{
    title: "整体画板名称",
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      boxSizing: "border-box",
    },
    // 组件
    cmps: [],
  };
  // 每个组件对应的 json 结构，这些 json 在右侧的时候会读取属性支持编辑
   {
    value: "双击编辑标题",
    style: {
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
```
- 编辑信息
- 添加组件
- 删除组件
- 选中点击组件
- 

