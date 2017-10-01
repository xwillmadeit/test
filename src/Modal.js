const defaultOptions = {
  closeBtn: true,
  className: 'fade-in-down'
}

export default class Modal {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options }
    this.modal = null
    this.overlay = null
  }

  bindEvents() {
    this.overlay.addEventListener('click', this.close.bind(this))
  }

  createModal() {
    const domFrag = document.createDocumentFragment()

    this.modal = document.createElement('div')
    this.modal.className += ` hlj-modal ${this.options.className}`

    this.overlay = document.createElement('div')
    this.overlay.className += ' hlj-overlay'

    domFrag.appendChild(this.modal)
    domFrag.appendChild(this.overlay)

    document.body.appendChild(domFrag)
  }

  open() {
    this.createModal()
    this.bindEvents()

    window.getComputedStyle(this.modal).height
    this.modal.className += ' modal-open'
    this.overlay.className += ' modal-open'
  }

  close() {
    this.modal.className = this.modal.className.replace(' modal-open', '')
    this.overlay.className = this.overlay.className.replace(' modal-open', '')

    this.modal.addEventListener('transitionend', () => {
      this.modal.parentNode.removeChild(this.modal)
    })

    this.overlay.addEventListener('transitionend', () => {
      this.overlay.parentNode.removeChild(this.overlay)
    })
  }
}
