import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          initDone: false
        }
    }
    componentDidMount() {
      setTimeout(() => {
        this.setState({
          initDone: true
        })
      }, 1000);
    }
    
    render() {
        // return (
        //     <div>
        //         {this.props.children}
        //     </div>
        // )
        return (
          <div>
            {
              this.state.initDone 
              ? this.props.children 
              : <div>加载中.....</div>
            }
          </div>
        )
    }
}

export default App
