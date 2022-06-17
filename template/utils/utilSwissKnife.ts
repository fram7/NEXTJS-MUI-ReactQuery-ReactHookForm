export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fileSize(size: number) {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function timeConvert(minutes: number) {
  var num = minutes;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  return `${rhours > 0 ? `${rhours} hora${rhours > 1 ? "s" : ""}` : ""} ${
    rminutes > 0 ? `${rminutes} minuto${rminutes > 1 ? "s" : ""}` : ""
  }`;
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
