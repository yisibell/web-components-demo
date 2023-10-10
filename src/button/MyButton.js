;(function () {
  const template = document.createElement('template')

  template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 40px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`

  class Button extends HTMLElement {
    constructor() {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this.$container = this._shadowRoot.querySelector('.container')
      this.$button = this._shadowRoot.querySelector('button')

      this.$button.addEventListener('click', (e) => {
        this.dispatchEvent(
          new CustomEvent('onClick', {
            detail: 'Hello from within the Custom Element',
          })
        )
      })

      console.log('Shadow DOM:', this._shadowRoot)
    }

    get label() {
      return this.getAttribute('label')
    }

    set label(value) {
      this.setAttribute('label', value)
    }

    // 定义需要监视的属性
    static get observedAttributes() {
      return ['label']
    }

    // 属性发生变化时触发回调函数
    attributeChangedCallback(name, oldVal, newVal) {
      this.render()
    }

    connectedCallback() {
      if (this.hasAttribute('as-atom')) {
        this.$container.style.padding = '0px'
      }
    }

    render() {
      this.$button.innerHTML = this.label
    }
  }

  window.customElements.define('my-button', Button)
})()
