import getRandomId from './get-random-id';
import throttle from './throttle';

type CallbackData = {
  randomId: string,
  callback: (parameter?: number) => void,
};

type CallbacksCollection = Array<CallbackData>;

let timeoutCallbacks: CallbacksCollection = [];
let throttleCallbacks: CallbacksCollection = [];
let timeoutCallbacksLength: number;
let throttleCallbacksLength: number;
let inited: boolean;

const createEventListener = () => {
  const { innerWidth } = window;
  const windowOldWidth = [innerWidth, innerWidth];
  inited = true;
  let timer: NodeJS.Timeout;

  const isWidthChange = (arr: CallbacksCollection, index: number) => {
    const windowWidth = window.innerWidth;

    if (windowWidth !== windowOldWidth[index]) {
      windowOldWidth[index] = windowWidth;
      arr.forEach((item: CallbackData) => item.callback(windowWidth));
    }
  };

  const isWidthChangeThrottle = throttle(() => isWidthChange(throttleCallbacks, 0));

  const resizeHandler = () => {
    if (timeoutCallbacksLength) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => isWidthChange(timeoutCallbacks, 1), 100);
    }

    if (throttleCallbacksLength) {
      isWidthChangeThrottle();
    }
  };

  window.addEventListener('resize', resizeHandler);
  window.addEventListener('deviceorientation', resizeHandler);
};

const removeCallbackById = (inputArray: CallbacksCollection, randomId: string) => inputArray.filter((item) => item.randomId !== randomId);

export default function resizeCallback(callback: CallbackData['callback'], isThrottle?: boolean) {
  const randomId = getRandomId();

  const callbackData: CallbackData = {
    randomId,
    callback,
  };

  if (isThrottle) {
    throttleCallbacks.push(callbackData);
    throttleCallbacksLength = throttleCallbacks.length;
  } else {
    timeoutCallbacks.push(callbackData);
    timeoutCallbacksLength = timeoutCallbacks.length;
  }

  if (!inited) {
    createEventListener();
  }

  return {
    removeCallback: () => {
      if (isThrottle) {
        throttleCallbacks = removeCallbackById(throttleCallbacks, randomId);
        throttleCallbacksLength = throttleCallbacks.length;
      } else {
        timeoutCallbacks = removeCallbackById(timeoutCallbacks, randomId);
        timeoutCallbacksLength = timeoutCallbacks.length;
      }
    },
  };
}
