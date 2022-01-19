export const mathIt = (operator: string, x: string, y: string) => {
  let res = 0;
  switch (operator) {
    case "+":
      res = parseFloat(x) + parseFloat(y);
      break;
    case "-":
      res = parseFloat(x) - parseFloat(y);
      break;
    case "*":
      res = parseFloat(x) * parseFloat(y);
      break;
    case "/":
      res = parseFloat(x) / parseFloat(y);
      break;
    default:
      break;
  }
  return res.toFixed(2);
};