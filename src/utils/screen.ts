// 进入全屏
export const enterFullscreen = () => {
  const docElm = document.documentElement
  if (docElm && docElm.RequestFullScreen) {
    docElm.RequestFullScreen()
    //兼容Firefox
  } else if (docElm && docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
    //兼容Chrome, Safari and Opera等
  } else if (docElm && docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
    //兼容IE/Edge
  } else if (docElm && docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  }
}

// 退出全屏
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitExitFullScreen()
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen()
  }
}

// 判断是否全屏
export const isFullscreen = () => {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  )
}
document.mozFullScreen ||
  document.webkitIsFullScreen ||
  document.webkitFullScreen
