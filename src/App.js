import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import MonthPicker from './components/MonthPicker'
import { LIST_VIEW, CHART_VIEW } from './utility'
import Home from './containers/Home'
import Create from './containers/Create'
import { testCategories, testItems } from './testData'
import { flatterArr } from './utility'

export const AppContext = React.createContext()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatterArr(testItems),
      testCategories: flatterArr(testCategories)
    }
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
      }
    }
  }
  render () {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <ul>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/edit/10">Edit</Link>
            </ul>
            <div className="container pd-5">
              <Route path="/" exact component={Home}/>
              <Route path="/create" component={Create}/>
              <Route path="/edit/:id" component={Create}/>
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
