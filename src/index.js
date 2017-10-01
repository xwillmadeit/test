import Modal from './Modal'
import './modal.css'

const btn = document.querySelector('.btn')
btn.addEventListener('click', () => {
  const modal = new Modal()
  modal.open()
})
