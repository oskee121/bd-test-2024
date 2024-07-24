export default function getDateString() {
  return new Date().toJSON().split(/[T\.]/).slice(0, 2).join(' ');
}
