import React from 'react';
const EditorContext = React.createContext({config: {}});

export const Provider = EditorContext.Provider;
export default EditorContext;