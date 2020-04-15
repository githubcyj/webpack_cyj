/**
 * 入口
 */
require('../public/css/reset.css')
 import React from 'react'
 import ReactDOM from 'react-dom'
//  import 'antd/dist/antd.css'

// import storageUtils from './utils/storageUtils'
// import memoryUtils from './utils/memoryUtils'
import APP from'./App'

//读取local保存user，保存到内存中
// const user = storageUtils.getUser()
// memoryUtils.user = user

 //将APP组件标签渲染到index页面的div上
 ReactDOM.render(<APP/>, document.getElementById('root'))