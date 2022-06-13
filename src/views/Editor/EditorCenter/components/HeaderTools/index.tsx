import { Tooltip } from 'antd'

const HeaderTools = () => {
  return <div className="content-center__tools flex">
    <div className="tools-left flex">
      <Tooltip placement="top" title={'撤销'}>
        <div className="tools-item flex-center pointer">
          撤销
        </div>
      </Tooltip>
      <Tooltip placement="top" title={'重做'}>
        <div className="tools-item flex-center pointer">
          重做
        </div>
      </Tooltip>
    </div>
    <div className="tools-center flex">
    <Tooltip placement="top" title={'文字'}>
        <div className="tools-item flex-center pointer">
          文字
        </div>
      </Tooltip>
      <Tooltip placement="top" title={'图片'}>
        <div className="tools-item flex-center pointer">
          图片
        </div>
      </Tooltip>
      <Tooltip placement="top" title={'插入形状'}>
        <div className="tools-item flex-center pointer">
          插入形状
        </div>
      </Tooltip>
      <Tooltip placement="top" title={'插入线条'}>
        <div className="tools-item flex-center pointer">
          插入线条
        </div>
      </Tooltip>
      <Tooltip placement="top" title={'插入表格'}>
        <div className="tools-item flex-center pointer">
          插入表格
        </div>
      </Tooltip>
      <Tooltip placement="top" title={'插入音视频'}>
        <div className="tools-item flex-center pointer">
          插入音视频
        </div>
      </Tooltip>
    </div>
    <div className="tools-right flex">
      <div className="tools-item flex-center pointer">
        -
      </div>
      <div className="tools-item flex-center pointer">
        100%
      </div>
      <div className="tools-item flex-center pointer">
        +
      </div>
    </div>
  </div>
}

export default HeaderTools;