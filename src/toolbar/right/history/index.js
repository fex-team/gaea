const React = require('react')
const historyAction = require('../../../actions/history-action')
const historyStore = require('../../../stores/history-store')
const _ = require('lodash')
const classnames = require('classnames')
require('./index.scss')

const History = React.createClass({
    getInitialState: function () {
        return {
            historys: [],
            current: 0
        }
    },

    componentDidMount: function () {
        historyStore.addChangeListener(this.onHistoryChange)
    },

    componentWillUnmount: function () {
        historyStore.removeChangeListener(this.onHistoryChange)
    },

    onHistoryChange: function () {
        this.setState({
            historys: historyStore.get(),
            current: 0
        })
    },

    revertHistory: function (history, index, event) {
        if (index === this.state.current)return
        historyAction.revertHistory(this.state.current, index)
        this.setState({
            current: index
        })
    },

    render: function () {
        let newHistorys = _.cloneDeep(this.state.historys)
        let historyList = newHistorys.reverse().map((item, index)=> {
            let classname = classnames({
                'history-box': true,
                'active': index === this.state.current
            })

            return (
                <div className={classname}
                     onClick={this.revertHistory.bind(this,item,index)}
                     key={index}>
                    <i className="fa fa-history"
                       style={{marginRight:5}}></i>
                    {item.operateName}
                </div>
            )
        })

        return (
            <div>
                {historyList}
            </div>
        )
    }
})


module.exports = History