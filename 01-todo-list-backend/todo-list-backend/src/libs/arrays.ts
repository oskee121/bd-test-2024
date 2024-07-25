export function sortTodo(array) {
  return array.sort((a, b) => (a.order < b.order ? -1 : 1));
}
export function findItemIndexById(array, value) {
  return array.map(({ id }) => id).indexOf(value);
}

export function patchOrderNumber(array, startNumber, [fromIndex, toIndex]) {
  for (
    let index = fromIndex;
    index < array.length && index <= toIndex;
    index++
  ) {
    array[index].order = startNumber++;
  }
  return array;
}
