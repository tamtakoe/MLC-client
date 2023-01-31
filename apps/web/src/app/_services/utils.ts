export function debounce(fn: Function, ms: number) {
  let timer: any = null;

  return function(...args: any) {
    return new Promise(resolve => {
      const onComplete = () => {
        // @ts-ignore
        resolve(fn.apply(this, args));
        timer = null;
      };

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(onComplete, ms);
    });
  };
}

export function throttle(func: Function, ms: number) {
  let isThrottled = false;
  let savedArgs: any;
  let savedThis: any;

  function wrapper() {
    if (isThrottled) { // (2)
      // eslint-disable-next-line prefer-rest-params
      savedArgs = arguments;
      // @ts-ignore
      savedThis = this;
      return;
    }

    // @ts-ignore
    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

// Decorators
export function Debounce(delay: number = 20): MethodDecorator {
  // @ts-ignore
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    const newFunc = debounce(oldFunc, delay);

    descriptor.value = function() {
      // @ts-ignore
      return newFunc.apply(this, arguments);
    }
  };
}

export function Throttle(delay: number = 20): MethodDecorator {
  // @ts-ignore
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    const newFunc = throttle(oldFunc, delay);

    descriptor.value = function() {
      // @ts-ignore
      return newFunc.apply(this, arguments);
    }
  }
}

export function textToBool(str: string): boolean | undefined {
 return str === 'true' || (str === 'false' ? false : undefined);
}
