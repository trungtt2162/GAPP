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

export function getQuery() {
  const queryString = window.location.search.slice(1);
  const params = {};

  if (queryString) {
    const paramPairs = queryString.split('&');

    paramPairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      const decodedKey = decodeURIComponent(key);
      const decodedValue = value ? decodeURIComponent(value) : true;

      if (decodedKey.endsWith('[]')) {
        const paramName = decodedKey.slice(0, -2);
        if (!params[paramName]) {
          params[paramName] = [];
        }
        params[paramName].push(decodedValue);
      } else {
        params[decodedKey] = decodedValue;
      }
    });
  }

  return params;
}