// import React from 'react'
// import { Redirect, Switch, Route } from 'react-router-dom'
// import { Layout } from 'antd'

// import memoryUtils from '../../utils/memoryUtils'
// import LeftNav from '../../components/left-nav'
// import Header from '../../components/header/header'
// import Home from '../home'
// import Category from '../category'
// import Product from '../product'
// import Role from '../role'
// import User from '../user'
// import Bar from '../charts/bar'
// import Line from '../charts/line'
// import Pie from '../charts/pie'


// const {  Footer, Sider, Content } = Layout;

// export default class Admin extends React.Component{
//     render(){
//         const  user = memoryUtils.user
//         //如果内存没有user，当前没有登录
//         if(!user || !user._id){
//             return <Redirect to='/login'/>
//         }

//         return(
//             <Layout style={{height: '100%'}}>
//                 <Sider>
//                     <LeftNav/>
//                 </Sider>
//                 <Layout>
//                     <Header>Header
//                     </Header>
//                     <Content style={{backgroundColor: 'white'}, {margin: '15px'}}>
//                         <Switch>
//                             <Route path='/home' component={Home}/>
//                             <Route path='/category' component={Category}/>
//                             <Route path='/product' component={Product}/>
//                             <Route path='/role' component={Role}/>
//                             <Route path='/user' component={User}/>
//                             <Route path='/charts/bar' component={Bar}/>
//                             <Route path='/charts/line' component={Line}/>
//                             <Route path='/charts/pie' component={Pie}/>
//                             <Redirect to='/home' />
//                         </Switch>
//                     </Content>
//                     <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>当前版本：</Footer>
//                 </Layout>
//             </Layout>
//         )
        
//     }
// }