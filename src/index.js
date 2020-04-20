/**
 * 入口
 */
require('../public/css/reset.css')
 import React from 'react'
 import ReactDOM from 'react-dom'
//  import 'antd/dist/antd.css'

import APP from'./App'

 //将APP组件标签渲染到index页面的div上
 ReactDOM.render(<APP/>, document.getElementById('root'))