import React from 'react'
import { connect } from 'react-redux'
import { IAppState } from '@reducers'

interface IPopupStateProps {
    display: boolean;
}

class Popup extends React.Component<IPopupStateProps, {}> {
    render() {
        return (
            <>
                <h1>popup</h1>
                <p>{this.props.display ? 'activated' : 'disabled'}</p>
            </>
        )
    }
}

const mapStateToProps = (state: IAppState): IPopupStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<IPopupStateProps>(mapStateToProps)(Popup)
