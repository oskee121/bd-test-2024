export function sortTodo(todoList) {
  return todoList.sort((a, b) => (a.order < b.order ? -1 : 1));
}
export function findItemIndexById(todoList, value) {
  return todoList.map(({ id }) => id).indexOf(value);
}

export function patchOrderNumber(todoList, startNumber, [fromIndex, toIndex]) {
  for (
    let index = fromIndex;
    index < todoList.length && index <= toIndex;
    index++
  ) {
    todoList[index].order = startNumber++;
  }
  return todoList;
}
