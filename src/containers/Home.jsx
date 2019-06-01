import React from 'react';
import logo from '../logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility'
import { Tabs, Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'
import  withContext  from '../WithContent'
import { withRouter } from 'react-router-dom'
const tabsText = [LIST_VIEW, CHART_VIEW ]
const categoies = {
  "1": {
    id: '1',
    name: '旅游',
    type: 'outcome',
    iconName: 'ios-plane'
    },
  "2": {
    id: '2',
    name: '理财',
    type: 'income',
    iconName: 'ios-yen'
    },
}
const items = [
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2019-05-27',
    cid: 1
  },
  {
    id: 2,
    title: '去云南旅游',
    price: 400,
    date: '2019-05-26',
    cid: 2
  },
]
const newItem = {
  id: 3,
  title: '去云南旅游',
  price: 200,
  date: '2019-05-10',
  cid: 1
}
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0]
    }
  }
  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    })
  }
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    })
  }
  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`)
  }
  creteItem = () => {
    this.props.history.push('/create')
  }
  deleteItem = (item) => {
    this.props.actions.deleteItem(item)
  }
  render () {
    const {items, currentDate, tabView } = this.state
    const { data } = this.props
    console.log(data)
    let totalIncome = 0
    let totalOutcome = 0 
    const itemWithCategory = items.map( item => { 
      item.category = categoies[item.cid]
      return item
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })
    itemWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })
    return (
      <React.Fragment>
        <header className="App-header">
        <div className="row mb-5">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month} 
              onChange={this.changeDate}
            />
          </div>
          <div className="col">
            <TotalPrice
              income={totalIncome}
              outcome={totalOutcome}
            />
          </div>
        </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChang={this.changeView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color="#007bff"
                icon="ios-paper"
              />
              列表模式
            </Tab>
          <Tab>
            <Ionicon
              className="rounded-circle mr-2"
              fontSize="25px"
              color="#007bff"
              icon="ios-pie"
            />
            图标模式
          </Tab>
        </Tabs>
          {/* <ViewTab
            activeTab={tabView}
            onTabChange={this.changeView}
          /> */}
          <CreateBtn
            onClick={this.creteItem}
          />
          {
            tabView === LIST_VIEW &&
            <PriceList
              items={itemWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          }
          {
            tabView === CHART_VIEW &&
            <h1>chart</h1>
          }
        </div>
      </React.Fragment>
        )
  }
}

export default withRouter(withContext(Home))