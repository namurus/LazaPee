function stringToId(value) {
  return value.toLowerCase().split(' ').join('-');
}

export { stringToId };
