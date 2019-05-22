import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Category extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <h1>Category</h1>
    )
  }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
export default Category
// module.exports = Category