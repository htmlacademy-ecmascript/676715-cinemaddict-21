function getArrayElementsInRow(array) {
  let x;
  if (array.length > 1) {
    x = array.join(', ');
  } else {
    x = array;
  }
  return x;
}

export {getArrayElementsInRow};
