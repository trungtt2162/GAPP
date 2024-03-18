export function uploafFileBase64(event, setValue) {
  const file = event.target.files[0];
  const reader = new FileReader();
  let base64;
  reader.onload = function (e) {
    base64 = e.target.result;
    setValue(base64);
  };

  reader.readAsDataURL(file);
}
