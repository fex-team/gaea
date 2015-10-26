const React = require('react')

const Text = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'BaseText',
            desc: '文字',
            opts: {
                text: {
                    value: 'Default Text',
                    edit: 'text',
                    desc: '文字内容'
                },
                style: {
                    value: {
                        margin: 0,
                        padding: 0,
                        color: '#333',
                        fontSize: 14,
                    },
                    edit: 'style'
                }
            }
        }
    },

    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            <div style={this.props.opts.style.value}>
                {this.props.opts.text.value}
            </div>
        )
    }
})


module.exports = Text