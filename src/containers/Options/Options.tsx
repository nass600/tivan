import React from 'react'
import { connect } from 'react-redux'
import { IAppState } from '@reducers'

interface IOptionsStateProps {
    display: boolean;
}

class Options extends React.Component<IOptionsStateProps, {}> {
    render() {
        return (
            <>
                <h1>options</h1>
                <p>{this.props.display ? 'activated' : 'disabled'}</p>
            </>
        )
    }
}

const mapStateToProps = (state: IAppState): IOptionsStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<IOptionsStateProps>(mapStateToProps)(Options)
