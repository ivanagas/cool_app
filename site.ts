// site.ts

const style = `
  .button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: black;
    font-weight: normal;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-align: left;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 32px;
    border: none;
    cursor: pointer;
    z-index: 999999;
  }
`

export function inject({ config, posthog }) {

  const shadow = createShadow(style)
  let buttonElement: HTMLButtonElement

  function sendMessage(): void {
    console.log(config.message)
    posthog.capture('message', { content: config.message }) // new
  }

  buttonElement = Object.assign(document.createElement('button'), {
    className: 'button',
    innerText: '👍',
    onclick: sendMessage,
  })
  shadow.appendChild(buttonElement)
}

function createShadow(style?: string): ShadowRoot {
  const div = document.createElement('div')
  const shadow = div.attachShadow({ mode: 'open' })
  if (style) {
    const styleElement = Object.assign(document.createElement('style'), {
      innerText: style,
    })
    shadow.appendChild(styleElement)
  }
  document.body.appendChild(div)
  return shadow
}