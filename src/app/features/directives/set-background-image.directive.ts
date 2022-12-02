import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[setBackgroundImage]',
})
export class SetBackgroundImageDirective {
  _name: string = ''

  @Input() set name(value: string) {
    this._name = value

    if (!value) return

    const number = value.replace(/^\D+/g, '') || 0
    const path: string = '../../assets/images/avatars/'
    const name = this.name
      ?.replace(/[^a-zA-Z ]/g, '')
      .toLowerCase()
      .trim()
    const fullPath = `${path}${name}_${number}.png`

    this.imageExists(fullPath).then((response) => {
      const image = `url(${response})`
      const element = this.imageRef.nativeElement.querySelector('.cover')

      if (response) {
        element.style.backgroundImage = image
      } else {
        element.style.backgroundImage = null
      }
    })
  }

  get name() {
    return this._name
  }

  constructor(private imageRef: ElementRef) {}

  imageExists(src) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = function () {
        resolve(src)
      }
      img.onerror = function () {
        resolve(false)
      }

      img.src = src
    })
  }
}
