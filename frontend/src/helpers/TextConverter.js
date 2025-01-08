function stringToId(value) {
  const words = value.toLowerCase().split(' ');
  const expession = /[^a-zA-Z0-9]/g;
  return words
    .map((word) => {
      return word.replace(expession, '');
    })
    .join('-');
}

export { stringToId };
