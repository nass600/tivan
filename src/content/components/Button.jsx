import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDisplay } from '@store/actions'

class Button extends Component {
    handleClick = event => {
        event.preventDefault()
        this.props.toggleDisplay()
    }

    render () {
        return (
            <a href="#" onClick={this.handleClick}>
                button
            </a>
        )
    }
}

const mapDispatchToProps = {
    toggleDisplay
}

export default connect(null, mapDispatchToProps)(Button)
