let dispatcher = require('../dispatcher')
let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')
let historyStore = require('./history-store')

let CHANGE_EVENT = 'changeComponent'
let CHANGE_SELECT_CONTAINER_EVENT = 'changeSelectContainer'
let CHANGE_LEFT_TAB_EVENT = 'changeLeftTab'
let currentComponent = null
let previousComponent = null
let position

var EditStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    get: function () {
        return currentComponent
    },

    emitSelectContainer: function () {
        this.emit(CHANGE_SELECT_CONTAINER_EVENT)
    },

    addSelectContainerListener: function (callback) {
        this.on(CHANGE_SELECT_CONTAINER_EVENT, callback)
    },

    removeSelectContainerListener: function (callback) {
        this.removeListener(CHANGE_SELECT_CONTAINER_EVENT, callback)
    },

    emitLeftTabChange: function (tabName) {
        this.tabName = tabName
        this.emit(CHANGE_LEFT_TAB_EVENT)
    },

    addLeftTabChangeListener: function (callback) {
        this.on(CHANGE_LEFT_TAB_EVENT, callback)
    },

    removeLeftTabChangeListener: function (callback) {
        this.removeListener(CHANGE_LEFT_TAB_EVENT, callback)
    },

    getTabName: function () {
        return this.tabName
    }
})

EditStore.dispatchToken = dispatcher.register(function (action) {
    // 选择编辑组件
    switch (action.type) {
    case 'selectComponent':
        // 如果是同一个组件，不做处理
        if (action.component === currentComponent) {
            return
        }

        // 左侧tab选中编辑区
        EditStore.emitLeftTabChange('edit')

        previousComponent = currentComponent
        currentComponent = action.component

        // 如果上个组件存在，则取消选中状态
        if (previousComponent) {
            previousComponent.unSelected()
        }

        EditStore.emitChange()
        break
    case 'freshComponent':
        currentComponent = action.component
        EditStore.emitChange()
        break
    case 'updateComponent':
        if (historyStore.getCurrentIndex() !== 0) {
            // 如果当前历史不是最新，则删除之后的历史
            historyStore.removeAfterCurrent()
        }

        currentComponent.UpdateChildren(action.opts, action.historyInfo)
        break
    case 'removeCurrent':
        currentComponent.removeSelf(true)
        previousComponent = currentComponent = null
        break
    case 'selectContainer':
        EditStore.emitSelectContainer()
        break
    }
})

module.exports = EditStore