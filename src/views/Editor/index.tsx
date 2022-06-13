import { useState } from 'react'
import EditorHeader from './EditorHeader'
import EditorLeft from './EditorLeft'
import EditorRight from './EditorRight'
import EditorCenter from './EditorCenter'
import './index.scss'

const Editor = () => {
  return <div className="ikppt-editor">
    <EditorHeader />
    <div className="ikppt-editor__content">
      <EditorLeft />
      <EditorCenter />
      <EditorRight />
    </div>
  </div>
}

export default Editor