/**
 * @author dongtiancheng
 * @date 15/10/29.
 * @email dongtiancheng@baidu.com
 */
const _ = require('lodash')

function isValueEqual(value, oldValue) {
    return _.isEqual(value.childs, oldValue.childs) && _.isEqual(value.opts, oldValue.opts) && _.isEqual(value.mode, oldValue.mode)
}

var ReactComponentWithPureRenderMixin = {
    shouldComponentUpdate: function (nextProps, nextState) {
        console.log(this.state, nextState)
        return !isValueEqual(nextProps, this.props) || this.state !== nextState
    }
}

module.exports = ReactComponentWithPureRenderMixin