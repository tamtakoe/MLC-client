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

  telegramMainButton = window?.Telegram?.WebApp?.MainButton

  constructor() {
    this.element = document.getElementById('mainButton') as HTMLElement;
    this.element.innerHTML = `<button type="button" class="btn"></button>`
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
  }

  setText(text: string) {
    this.buttonElement.innerHTML = text
    this.text = text
  }

  show() {
    this.telegramMainButton.show()

    classList(this.element).remove('ng-hide')
    this.visible = true
  }

  hide() {
    this.telegramMainButton.hide()

    classList(this.element).add('ng-hide')
    this.visible = false
  }

  enable() {
    this.telegramMainButton.enable()

    this.buttonElement.removeAttribute('disabled')
    this.disabled = false
  }

  disable() {
    this.telegramMainButton.disable()

    this.buttonElement.setAttribute('disabled', 'true')
    this.disabled = true
  }

  showProgress(leaveActive?: boolean) {
    this.telegramMainButton.showProgress(leaveActive)

    classList(this.buttonElement).add(['progress-bar-striped', 'progress-bar-animated'])
    this.disable()
    this.progress = true
  }

  hideProgress() {
    this.telegramMainButton.hideProgress()

    classList(this.buttonElement).remove(['progress-bar-striped', 'progress-bar-animated'])
    this.enable()
    this.progress = false
  }

  onClick(handler?: () => void) {
    this.telegramMainButton.offClick(this.onClickHandler)
    this.telegramMainButton.onClick(handler)

    this.onClickHandler = handler;
  }

  offClick() {
    this.telegramMainButton.offClick(this.onClickHandler)
    this.onClickHandler = undefined;
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
  }
}
