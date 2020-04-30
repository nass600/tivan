import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'

interface OptionsStateProps {
    display: boolean;
}

class Options extends React.Component<OptionsStateProps, {}> {
    render (): React.ReactNode {
        return (
            <>
                <h1>options</h1>
                <p>{this.props.display ? 'activated' : 'disabled'}</p>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): OptionsStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<OptionsStateProps>(mapStateToProps)(Options)
