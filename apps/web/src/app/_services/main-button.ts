import { Injectable } from "@angular/core";

type ButtonType = 'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'|'link';
interface ButtonParams {
  type?: ButtonType,
  text?: string,
  disabled?: boolean,
  visible?: boolean,
  progress?: boolean,
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
export class MainButton {
  type: ButtonType = 'primary';
  text: string = 'CONTINUE';
  disabled: boolean = false;
  visible: boolean = false;
  progress: boolean = false;
  onClickHandler?: () => void = () => {}

  element: HTMLElement;
  buttonElement: HTMLElement;
  preloaderElement: HTMLElement;

  telegramMainButton = window?.Telegram?.WebApp?.MainButton
  isTelegramApp =  window?.Telegram?.WebApp?.initData && !!this.telegramMainButton

  constructor() {
    this.element = document.getElementById('mainButton') as HTMLElement;
    this.element.innerHTML = `<button type="button" class="btn"></button>
      <div class="app-mainButton-preloader ng-hide">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="50px" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid">
          <circle cx="20" cy="20" fill="none" stroke="#ffffff" stroke-width="2" r="10" stroke-dasharray="32.98672286269283 12.995574287564276">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 20 20;360 20 20" keyTimes="0;1"></animateTransform>
          </circle>
        </svg>
      </div>`

    this.preloaderElement = this.element.getElementsByTagName('div').item(0) as HTMLElement;
    this.buttonElement = this.element.getElementsByTagName('button').item(0) as HTMLElement;
    this.buttonElement.onclick = () => {
      if (this.onClickHandler) {
        this.onClickHandler();
      }
    };
  }

  setType(type: ButtonType) {
    this.telegramMainButton.color = "rgb(49, 181, 69)"

    classList(this.buttonElement).remove('btn-' + this.type)
    classList(this.buttonElement).add('btn-' + type)
    this.type = type
    return this;
  }

  setText(text: string) {
    this.telegramMainButton.setText(text)

    this.buttonElement.innerHTML = text
    this.text = text
    return this;
  }

  show() {
    this.telegramMainButton.show()

    classList(this.element).remove('ng-hide')
    this.visible = true
    return this;
  }

  hide() {
    this.telegramMainButton.hide()

    classList(this.element).add('ng-hide')
    this.visible = false
    return this;
  }

  enable() {
    this.telegramMainButton.enable()

    this.buttonElement.removeAttribute('disabled')
    this.disabled = false
    return this;
  }

  disable() {
    this.telegramMainButton.disable()

    this.buttonElement.setAttribute('disabled', 'true')
    this.disabled = true
    return this;
  }

  showProgress(leaveActive?: boolean) {
    this.telegramMainButton.showProgress(leaveActive)

    classList(this.preloaderElement).remove('ng-hide')
    this.disable()
    this.progress = true
    return this;
  }

  hideProgress() {
    this.telegramMainButton.hideProgress()

    classList(this.preloaderElement).add('ng-hide')
    this.enable()
    this.progress = false
    return this;
  }

  onClick(handler?: () => void) {
    this.telegramMainButton.offClick(this.onClickHandler)
    this.telegramMainButton.onClick(handler)

    this.onClickHandler = handler;
    return this;
  }

  offClick() {
    this.telegramMainButton.offClick(this.onClickHandler)
    this.onClickHandler = undefined;
    return this;
  }

  setParams(params: ButtonParams) {
    if (params.type !== undefined) {
      this.setType(params.type);
    }

    if (params.text !== undefined) {
      this.setText(params.text);
    }

    if (params.visible !== undefined) {
      params.visible
          ? this.show()
          : this.hide()
    }

    if (params.disabled !== undefined) {
      params.disabled
          ? this.disable()
          : this.enable()
    }

    if (params.progress !== undefined) {
      params.progress
          ? this.showProgress()
          : this.hideProgress()
    }

    if (params.onClick !== undefined) {
      params.onClick
          ? this.onClick(params.onClick)
          : this.offClick()
    }
    return this;
  }
}
