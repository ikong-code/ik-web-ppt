import { shapeList, ShapePoolItem } from "@/config/shapes"

interface IProps {
  onSelect: (val: ShapePoolItem) => void
}

const ShapeList = ({ onSelect }: IProps) => {
  return (
    <div className="shape-pool">
      {shapeList.map((item) => (
        <div className="category" key={item.type}>
          <div className="category-name">{item.type}</div>
          <div className="shape-list">
            {item.children.map((shape, index) => (
              <div className="shape-item" key={index}>
                <div className="shape-content" onClick={() => onSelect(shape)}>
                  <svg overflow="visible" width="18" height="18">
                    <g
                      transform={`scale(${18 / shape.viewBox}, ${
                        18 / shape.viewBox
                      }) translate(0,0) matrix(1,0,0,1,0,0)`}
                    >
                      <path
                        className="shape-path"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="butt"
                        strokeMiterlimit="8"
                        strokeLinejoin="round"
                        fill="transparent"
                        stroke="#999"
                        strokeWidth="2"
                        d={shape.path}
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShapeList
