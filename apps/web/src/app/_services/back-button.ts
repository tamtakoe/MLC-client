import { Injectable } from "@angular/core";

interface ButtonParams {
  visible?: boolean,
  onClick?: () => void
}

//Class list
function classList(element: HTMLElement) {
  function updateClass(removedClasses: string[] = [], addedClasses: string[] = []) {
    let elementClassNames = element.className;

    removedClasses.forEach(removedClass => {
      elementClassNames = elementClassNames.replace(removedClass, '')
    })

    addedClasses.forEach(addedClass => {
      elementClassNames = elementClassNames + ' ' + addedClass
    })

    elementClassNames.replace(/\s+/,' ');

    return elementClassNames;
  }

  return {
    add: function (addedClasses: string | string[]) {
      addedClasses = Array.isArray(addedClasses) ? addedClasses : [addedClasses]
      element.className = updateClass(addedClasses, addedClasses);
    },
    remove: function (removedClasses: string | string[]) {
      removedClasses = Array.isArray(removedClasses) ? removedClasses : [removedClasses]
      element.className = updateClass(removedClasses);
    }
  };
}

@Injectable()
export class BackButton {
  visible: boolean = false;
  onClickHandler?: () => void = () => {}

  element: HTMLElement

  telegramBackButton = window?.Telegram?.WebApp?.BackButton
  isTelegramApp =  window?.Telegram?.WebApp?.initData && !!this.telegramBackButton

  constructor() {
    this.element = document.getElementById('backButton') as HTMLElement;

    if (!this.isTelegramApp) {
      this.element.onclick = () => {
        if (this.onClickHandler) {
          this.onClickHandler();
        }
      };
    }
  }

  show() {
    if (this.isTelegramApp) {
      this.telegramBackButton.show()
    } else {
      classList(this.element).remove('ng-hide')
    }

    this.visible = true
    return this;
  }

  hide() {
    if (this.isTelegramApp) {
      this.telegramBackButton.hide()
    } else {
      classList(this.element).add('ng-hide')
    }

    this.visible = false
    return this;
  }

  onClick(handler?: () => void) {
    if (this.isTelegramApp) {
      this.telegramBackButton.offClick(this.onClickHandler)
      this.telegramBackButton.onClick(handler)
    }

    this.onClickHandler = handler;
    return this;
  }

  offClick() {
    if (this.isTelegramApp) {
      this.telegramBackButton.offClick(this.onClickHandler)
    }

    this.onClickHandler = undefined;
    return this;
  }

  setParams(params: ButtonParams) {
    if (params.visible !== undefined) {
      params.visible
          ? this.show()
          : this.hide()
    }

    if (params.onClick !== undefined) {
      params.onClick
          ? this.onClick(params.onClick)
          : this.offClick()
    }
    return this;
  }
}
