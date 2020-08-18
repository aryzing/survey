const createStyle = (css: string): HTMLStyleElement => {
  const style = document.createElement("style");
  style.textContent = css;

  return style;
};

export default createStyle;
