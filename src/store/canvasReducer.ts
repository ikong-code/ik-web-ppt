import { createSlice } from "@reduxjs/toolkit"

export const canvasReducer = createSlice({
  name: "canvas",
  initialState: {
    canvasPercentage: 90, // 画布可视区域百分比
    viewportRatio: 0.5625, // 可是区域比例，默认16:9
    canvasScale: 1, // 画布缩放比例（基于宽度1000px）
    handleElementId: "", // 正在操作的元素ID
    activeElementIdList: [], // 被选中的元素ID集合，包含 handleElementId
    activeGroupElementId: "", // 组合元素成员中，被选中可独立操作的元素ID
    editorAreaFocus: false, //  编辑区域聚焦
    thumbnailsFocus: false, // 左侧导航缩略图区域聚焦
    disableHotkeys: false, // 禁用快捷键
    showGridLines: false, // 显示网格线
    creatingElement: null, // 正在插入的元素信息，需要通过绘制插入的元素（文字、形状、线条）
    availableFonts: [], // 当前环境可用字体
    toolbarState: "slideDesign", // 右侧工具栏状态
    isScaling: false, // 正在进行元素缩放
  } as any,
  reducers: {
    setHandleElementId: (state, action) => {
      state.handleElementId = action.payload
    },
    setActiveElementIdList: (state, action) => {
      if (action.payload.length === 1) {
        state.handleElementId = action.payload[0]
      } else {
        state.handleElementId = ""
      }
      state.activeElementIdList = [...action.payload]
    },
    setActiveGroupElementId: (state, action) => {
      state.activeGroupElementId = action.payload
    },
    setGridLinesState: (state, action) => {
      state.showGridLines = action.payload
    },
    setCanvasPercentage: (state, action) => {
      state.canvasPercentage = action.payload
    },
    setCreatingElement: (state, action) => {
      state.creatingElement = action.payload
    },
    setToolbarState: (state, action) => {
      state.toolbarState = action.payload
    },
    setEditorareaFocus: (state, action) => {
      state.editorAreaFocus = action.payload
    },
    setScalingState: (state, action) => {
      state.isScaling = action.payload
    },
    setViewportRatio: (state, action) => {
      state.viewportRatio = action.payload
    },
    setCanvasScale: (state, action) => {
      state.canvasScale = action.payload
    },
    setDisableHotkeys: (state, action) => {
      state.disableHotkeys = action.payload
    },
    setThumbnailsFocus: (state, action) => {
      state.thumbnailsFocus = action.payload
    },
  },
})

export const {
  setHandleElementId,
  setActiveElementIdList,
  setActiveGroupElementId,
  setGridLinesState,
  setCanvasPercentage,
  setCreatingElement,
  setToolbarState,
  setEditorareaFocus,
  setScalingState,
  setViewportRatio,
  setCanvasScale,
  setDisableHotkeys,
  setThumbnailsFocus,
} = canvasReducer.actions

export default canvasReducer.reducer
