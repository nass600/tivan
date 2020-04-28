import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IAppState } from '@reducers'

interface IAppStateProps {
    display: boolean;
}

class App extends Component<IAppStateProps> {
    render() {
        if (!this.props.display) {
            return null
        }

        return (
            <h1>This is the main app</h1>
        )
    }
}

const mapStateToProps = (state: IAppState): IAppStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<IAppStateProps>(mapStateToProps)(App)
