/* eslint-disable func-names */
import raf from './raf';

const { requestIdleCallback } = window;

export default function throttle(fn: () => void) {
  const gDelay = 125;
  const RIC_DEFAULT_TIMEOUT = 666;
  let running: boolean;
  let lastTime = 0;
  let rICTimeout = RIC_DEFAULT_TIMEOUT;

  const run = function () {
    running = false;
    lastTime = Date.now();
    fn();
  };

  const idleCallback = requestIdleCallback
    ? function () {
      requestIdleCallback(run, { timeout: rICTimeout });
      if (rICTimeout !== RIC_DEFAULT_TIMEOUT) {
        rICTimeout = RIC_DEFAULT_TIMEOUT;
      }
    }
    : raf(() => {
      setTimeout(run);
    }, true);

  return function (isPriority?: boolean) {
    let delay;

    if (isPriority) {
      rICTimeout = 44;
    }

    if (running) {
      return;
    }

    running = true;

    delay = gDelay - (Date.now() - lastTime);

    if (delay < 0) {
      delay = 0;
    }

    if (isPriority || (delay < 9 && requestIdleCallback)) {
      idleCallback();
    } else {
      setTimeout(idleCallback, delay);
    }
  };
}
