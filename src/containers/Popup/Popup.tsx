import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'

interface PopupStateProps {
    display: boolean;
}

class Popup extends React.Component<PopupStateProps, {}> {
    render (): React.ReactNode {
        return (
            <>
                <h1>popup</h1>
                <p>{this.props.display ? 'activated' : 'disabled'}</p>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): PopupStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<PopupStateProps>(mapStateToProps)(Popup)
