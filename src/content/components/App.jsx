import React, { Component } from 'react'
import { connect } from 'react-redux'

console.log('testing yeah')

class App extends Component {
    render () {
        if (!this.props.display) {
            return null
        }

        return (
            <h1>This is the main app</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.status.display
    }
}

// const mapDispatchToProps = {
//     parsePage,
//     clearErrors
// }

export default connect(mapStateToProps, null)(App)
