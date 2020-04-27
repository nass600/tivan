import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
    render () {
        return (
            <>
                <h1>popup</h1>
                <p>{this.props.display ? 'activated' : 'disabled'}</p>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.status.display
    }
}

export default connect(mapStateToProps)(App)
