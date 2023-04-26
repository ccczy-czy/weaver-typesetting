const onresize = (dom_elem, callback) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(dom_elem);
};

const cols = document.querySelectorAll('.col');
cols.forEach((item) => {
  const oldHeight = parseFloat(getComputedStyle(item).height);

  onresize(item, () => {
    const [colNum, rowNum] = item.className.split(" ").slice(1);

    const newHeight = parseFloat(getComputedStyle(item).height);
    const direction = oldHeight - newHeight < 0 ? 1 : -1;

    const oldLineHeight = parseFloat(getComputedStyle(item).lineHeight);
    let newLineHeight = (oldLineHeight + direction * 0.012 * oldLineHeight) < 1.94 ? 1.92 : (oldLineHeight + direction * 0.012 * oldLineHeight);
    newLineHeight = newLineHeight > 23.04 ? 23.04 : newLineHeight;

    item.style.lineHeight = newLineHeight + 'px';

    document.querySelectorAll('.' + colNum).forEach((box) => {
      box.style.width = item.style.width;
      box.style.lineHeight = newLineHeight + 'px';
    });

    document.querySelectorAll('.' + rowNum).forEach((box) => {
      box.style.height = item.style.height;
      box.style.lineHeight = newLineHeight + 'px';
    });
  });

  item.addEventListener('input', () => {
    item.style.height = 'auto';
    item.style.height = item.scrollHeight + 'px';
  });
});
