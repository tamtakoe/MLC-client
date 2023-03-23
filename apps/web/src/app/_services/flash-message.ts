import { Injectable } from "@angular/core";

type ConsoleType = 'log'|'info'|'warn'|'error';
interface Message {
  type: ConsoleType,
  title: string,
  description: string,
  pin: boolean,
  delay: number,
  timeoutId?: any
}
//Class list
function classList(element: HTMLElement) {
  function updateClass(removedClass: string, addedClass?: string) {
    return (element.className.replace(removedClass, '') + ' ' + addedClass || '').replace(/\s+/,' ');
  }

  return {
    add: function (addedClass: string) {
      element.className = updateClass(addedClass, addedClass);
    },
    remove: function (removedClass: string) {
      element.className = updateClass(removedClass);
    }
  };
}

@Injectable()
export class FlashMessage {
  messages: Message[];
  element: HTMLElement;
  //Flash message
  constructor() {
    this.messages = [];
    this.element = document.getElementById('flashMessage') as HTMLElement;
  }

  addClass(className: string) {
    const element = this.element;

    ['ng-hide', 'error', 'warn', 'info'].forEach(function(className) {
      classList(element).remove(className);
    });

    if (className) {
      classList(element).add(className);
    }
  };

  add(type: ConsoleType, title: string, options: { description?: string; pin?: boolean; delay?: number; } = {}) {
    console[type] && console[type]('FlashMessage:', title, options.description);

    const messages = this.messages;
    const message: Message = {
      type: type,
      title: title,
      description: options.description || '',
      pin: !!options.pin,
      delay: options.delay || 7000
    };

    if (message.pin) {
      const messagesCount = messages.length;

      if (messagesCount) {
        if (message.title === messages[messagesCount - 1].title && message.description === messages[messagesCount - 1].description || messagesCount > 9) {
          return;
        }
      } else {
        this.show(message);
      }

      messages.push(message);

    } else {
      if (messages[0] && !messages[0].pin) {
        clearTimeout(messages[0].timeoutId);
        messages[0] = message;

      } else {
        messages.unshift(message);
      }

      this.show(message);
    }
  };

  show(message?: Message) {
    if (!message) {
      return;
    }

    const element = this.element;
    const close = this.close.bind(this);

    element.innerHTML = '';

    if (message.pin) {
      const closeElement = document.createElement('button');
      closeElement.innerHTML = '×';
      element.appendChild(closeElement);
      closeElement.onclick = close;
    } else {
      message.timeoutId = setTimeout(close, message.delay);
    }

    const textElement = document.createElement('div');
    textElement.innerHTML = '<p class="app-flashMessage-title">' + message.title + '</p>' + (message.description ? '<p class="app-flashMessage-description">' + message.description + '</p>' : '');

    element.appendChild(textElement);
    this.addClass(message.type);
  };

  close() {
    const messages = this.messages;
    const element = this.element;

    messages.shift();

    element.innerHTML = '';
    this.addClass('ng-hide');
    this.show(messages[0]);
  };

  error(title: string, options?: { details?: any; description?: any; pin?: any; delay?: any; }) {
    this.add('error', title, options);
  };

  warn(title: string, options?: { description?: any; pin?: any; delay?: any; }) {
    this.add('warn', title, options);
  };

  info(title: string, options?: { description?: any; pin?: any; delay?: any; }) {
    this.add('info', title, options);
  };

}

// //Flash message
// export function FlashMessage() {
//   this.messages = [];
//   this.element = document.getElementById('flashMessage');
// }
//
// FlashMessage.prototype.addClass = function(className) {
//   var element = this.element;
//
//   ['ng-hide', 'error', 'warn', 'info'].forEach(function(className) {
//     classList(element).remove(className);
//   });
//
//   if (className) {
//     classList(element).add(className);
//   }
// };
//
// FlashMessage.prototype.add = function(type, title, options) {
//   options = options || {};
//   console[type] && console[type]('FlashMessage:', title, options.description);
//
//   var messages = this.messages;
//   var message = {
//     type: type,
//     title: title,
//     description: options.description,
//     pin: options.pin,
//     delay: options.delay || 7000
//   };
//
//   if (message.pin) {
//     var messagesCount = messages.length;
//
//     if (messagesCount) {
//       if (message.title === messages[messagesCount - 1].title && message.description === messages[messagesCount - 1].description || messagesCount > 9) {
//         return;
//       }
//     } else {
//       this.show(message);
//     }
//
//     messages.push(message);
//
//   } else {
//     if (messages[0] && !messages[0].pin) {
//       clearTimeout(messages[0].timeoutId);
//       messages[0] = message;
//
//     } else {
//       messages.unshift(message);
//     }
//
//     this.show(message);
//   }
// };
//
// FlashMessage.prototype.show = function(message) {
//   if (!message) {
//     return;
//   }
//
//   var element = this.element;
//   var close = this.close.bind(this);
//
//   element.innerHTML = '';
//
//   if (message.pin) {
//     var closeElement = document.createElement('button');
//     closeElement.innerHTML = '×';
//     element.appendChild(closeElement);
//     closeElement.onclick = close;
//   } else {
//     message.timeoutId = setTimeout(close, message.delay);
//   }
//
//   var textElement = document.createElement('div');
//   textElement.innerHTML = '<p class="app-flashMessage-title">' + message.title + '</p>' + (message.description ? '<p class="app-flashMessage-description">' + message.description + '</p>' : '');
//
//   element.appendChild(textElement);
//   this.addClass(message.type);
// };
//
// FlashMessage.prototype.close = function() {
//   var messages = this.messages;
//   var element = this.element;
//
//   messages.shift();
//
//   element.innerHTML = '';
//   this.addClass('ng-hide');
//   this.show(messages[0]);
// };
//
// FlashMessage.prototype.error = function(title, options) {
//   this.add('error', title, options);
// };
//
// FlashMessage.prototype.warn = function(title, options) {
//   this.add('warn', title, options);
// };
//
// FlashMessage.prototype.info = function(title, options) {
//   this.add('info', title, options);
// };
