import { Injectable } from "@angular/core";

interface ButtonParams {
  visible?: boolean,
  onClick?: () => void
}

@Injectable()
export class BackButton {
  visible: boolean = false;
  onClickHandler?: () => void = () => {}

  telegramBackButton = window?.Telegram?.WebApp?.MainButton

  constructor() {}

  show() {
    if (this.telegramBackButton) {
      this.telegramBackButton.show()
    }

    this.visible = true
  }

  hide() {
    if (this.telegramBackButton) {
      this.telegramBackButton.hide()
    }

    this.visible = false
  }

  onClick(handler?: () => void) {
    if (this.telegramBackButton) {
      this.telegramBackButton.offClick(this.onClickHandler)
      this.telegramBackButton.onClick(handler)
    }

    this.onClickHandler = handler;
  }

  offClick() {
    if (this.telegramBackButton) {
      this.telegramBackButton.offClick(this.onClickHandler)
    }

    this.onClickHandler = undefined;
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
  }
}
