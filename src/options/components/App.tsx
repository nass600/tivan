import React from 'react'
import { connect } from 'react-redux'
import { IAppState } from '@reducers'

interface IAppStateProps {
    display: boolean;
}

class App extends React.Component<IAppStateProps, {}> {
    render() {
        return (
            <>
                <h1>options</h1>
                <p>{this.props.display ? 'activated' : 'disabled'}</p>
            </>
        )
    }
}

const mapStateToProps = (state: IAppState): IAppStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<IAppStateProps>(mapStateToProps)(App)
