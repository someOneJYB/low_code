// 用位运算来表示
export const isSubmitBtn = 0b010000
export const isInput = 0b100000
export const isForm = isSubmitBtn | isInput

export const defaultComponentStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: 80,
  height: 80,
  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff00",
  transform: 0, //"rotate(0deg)"
};
