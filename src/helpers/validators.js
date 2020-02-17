const isValidImage = value => {
  if (!value) return true;
  if (typeof value !== "string") return false;

  const validExtensions = ["jpg", "jpeg", "svg", "png"];
  const extension = value.split(".").pop();

  return validExtensions.includes(extension);
};

const isValidUrl = value => {
  if (!value) return true;
  if (typeof value !== "string") return false;

  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const regex = new RegExp(expression);
  return value.match(regex) ? true : false;
};

const sameAs = (getValues, field) => value => {
  const password = getValues()[field];

  return password === value;
};

export default {
  isValidImage,
  sameAs,
  isValidUrl
};
