import ReactDOM from 'react-dom/client'
import WebPpt from './index'
import store from './store'
import { Provider } from 'react-redux'
import './index.scss'
import './globle.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <WebPpt />
  </Provider>
)
