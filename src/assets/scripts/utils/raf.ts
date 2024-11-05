/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
const requestAnimationFrame = window.requestAnimationFrame || setTimeout;

// eslint-disable-next-line func-names
const rAF = (function () {
  const firstFns: Array<() => void> = [];
  const secondFns: Array<() => void> = [];
  let running: boolean;
  let waiting: boolean;
  let fns = firstFns;

  const run = function () {
    const runFns = fns;

    fns = firstFns.length ? secondFns : firstFns;

    running = true;
    waiting = false;

    while (runFns.length) {
      runFns.shift()();
    }

    running = false;
  };

  const rafBatch = function (fn: () => void, queue?: boolean) {
    if (running && !queue) {
      fn.apply(this, arguments);
    } else {
      fns.push(fn);

      if (!waiting) {
        waiting = true;
        (document.hidden ? setTimeout : requestAnimationFrame)(run);
      }
    }
  };

  // eslint-disable-next-line no-underscore-dangle
  rafBatch._lsFlush = run;

  return rafBatch;
}());

export default function raf(fn: () => void, simple: boolean) {
  return simple
    ? function () {
      rAF(fn);
    }
    : function () {
      const that = this as object;
      const args = arguments;

      rAF(() => {
        fn.apply(that, args);
      });
    };
}
