import './layout.scss'

const hash = window.location.hash.replace('#', '')
const layout = `layout-${hash === '' ? 'default' : hash}`
document.body.classList.add(layout)
