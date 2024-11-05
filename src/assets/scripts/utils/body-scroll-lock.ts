let previousBodyOverflowSetting: string;

function disableBodyScroll(): void {
  const { body, documentElement } = document;
  const scrollBarGap = window.innerWidth - documentElement.clientWidth;

  if (scrollBarGap) {
    body.style.paddingRight = `${scrollBarGap}px`;
  }

  previousBodyOverflowSetting = body.style.overflow;
  body.style.overflow = 'hidden';
}

function enableBodyScroll(): void {
  const { body } = document;

  Object.assign(body.style, {
    paddingRight: '',
    overflow: previousBodyOverflowSetting,
  });

  previousBodyOverflowSetting = null;
}

export {
  disableBodyScroll,
  enableBodyScroll,
};
