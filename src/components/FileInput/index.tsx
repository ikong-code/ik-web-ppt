import { ReactNode, useRef, ChangeEventHandler } from "react"
import { message } from "antd"

interface IProps {
  accept?: string
  children: ReactNode | string | null
  onChange: (e: any) => void
}

const FileInput = ({ accept, children, onChange }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!inputRef.current) return
    inputRef.current.value = ""
    inputRef.current.click()
  }

  const handleChange = (e: any) => {
    const files = (e.target as HTMLInputElement).files

    if (files && files[0]) {
      const isImage =
        [
          "png",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "webp",
          "psd",
          "svg",
          "tiff",
        ].indexOf(files[0]?.type?.split("/")?.[1]?.toLowerCase()) !== -1
      if (!isImage) {
        message.error("请上传图片文件")
      } else {
        onChange(files)
      }
    }
  }

  return (
    <div className="file-input" onClick={handleClick}>
      {children}
      <input
        style={{ display: "none" }}
        type="file"
        name="upload"
        ref={inputRef}
        accept={accept}
        onChange={handleChange}
      />
    </div>
  )
}

export default FileInput
