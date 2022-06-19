import { useMemo } from 'react'

const ViewportBackground = () => {

  const background = useMemo(() => {

  }, [])

  // const { backgroundStyle } = useSlideBackgroundStyle(background)

  return <div className="viewport-background" style={backgroundStyle}>

  </div>
}

export default ViewportBackground