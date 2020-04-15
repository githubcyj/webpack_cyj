import React from 'react';
import {Button} from 'antd'

class App extends React.Component {
    render() {
        return <div>
            <h1 className="hello">Hello React & Webpack!</h1>
            <Button type='primary'>Button</Button>
        </div>
    }
}

export default App;