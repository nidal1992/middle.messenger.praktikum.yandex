export function range(start, end, step) {
  return generateRange(prepareData(start, end, step));
}

function generateRange({ start, step, length }) {
  const arr = [];

  for (let i = 0, item = start; i < length; i++, item += step) {
    arr.push(item);
  }

  return arr;
}

function prepareData(_start, _end, _step) {
  const start = _end === undefined ? 0 : _start;
  const end = _end === undefined ? _start : _end;
  const step =
    _step === undefined ?
      end < start ?
        -1
      : 1
    : _step;
  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);

  return { start, step, length };
}
