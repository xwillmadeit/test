import './modal.css'

const defaultOptions = {
  closeBtn: true,
  className: 'fade-in-down'
}

function transitionEnd() {
  var el = document.createElement('div')

  var transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  }

  for (var name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return transEndEventNames[name]
    }
  }

  return false
}

export default class Modal {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options }
    this.modal = null
    this.overlay = null
    this.transitionEnd = transitionEnd()
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

    // ie <= 9
    if (!this.transitionEnd) {
      this.modal.parentNode.removeChild(this.modal)
      this.overlay.parentNode.removeChild(this.overlay)
    } else {
      this.modal.addEventListener(this.transitionEnd, () => {
        this.modal.parentNode.removeChild(this.modal)
      })

      this.overlay.addEventListener(this.transitionEnd, () => {
        this.overlay.parentNode.removeChild(this.overlay)
      })
    }
  }
}
