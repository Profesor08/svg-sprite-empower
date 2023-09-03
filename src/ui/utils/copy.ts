export const copy = (text: string) => {
  const area = document.createElement("textarea");

  document.body.appendChild(area);

  area.value = text;

  area.focus();

  area.select();

  document.execCommand("copy");

  document.body.removeChild(area);
};
