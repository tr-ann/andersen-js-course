// eslint-disable-next-line import/prefer-default-export
/* export function drag(event: DragEvent) {
  //event.dataTransfer.setData('id', `crafting:${event.target.id}`);
  //event.dataTransfer.setData('name', event.target.value);

  console.log(event);
} */

// eslint-disable-next-line import/prefer-default-export
export function drag(event) {
  console.log(event.dataTransfer);

  event.dataTransfer.setData('id', `crafting:${event.target.id}`);
  console.log(event.dataTransfer.getData('id'));
  event.dataTransfer.setData('name', event.target.value);
}
