const channel = async (payload) => {
  try {
    let url = payload.url
    let cmd = payload.cmd
    let target = url + '/proxy.html'
    let el = window.document.querySelector('[src="' + target + '"]')
    let proxy = await new Promise((resolve, reject) => {
      if (el === null) {
        el = window.document.createElement('iframe', {})
        el.src = target
        el.style.width = '0px'
        el.style.height = '0px'
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        el.style.border = 'None'
        el.style.top = '-9999px'
        el.style.visibility = 'hidden'
        el.addEventListener('load', () => {
          resolve(el)
        })
        window.document.body.appendChild(el)
      } else {
        resolve(el)
      }
    })
    proxy.contentWindow.postMessage({cmd}, url)
  } catch (e) {
    // do nothing
  }
}

export default channel
