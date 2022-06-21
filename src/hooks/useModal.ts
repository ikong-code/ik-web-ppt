import { useCallback, useState } from "react"

const useModal = (initVisible = false) => {
  const [visible, setVisible] = useState(initVisible)
  const [params, setParams] = useState({})
  const open = useCallback((params) => {
    setParams(params)
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setParams({})
  }, [])
  return {
    open,
    close,
    params,
    visible,
  }
}
export default useModal
