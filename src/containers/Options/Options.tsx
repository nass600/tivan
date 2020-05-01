import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { LoginForm } from '@components'
import { authenticate } from '@actions'

interface OptionsStateProps {
    display: boolean;
}

interface OptionsDispatchProps {
    authenticate: (username: string, password: string) => void;
}

type OptionsProps = OptionsStateProps & OptionsDispatchProps

class Options extends React.Component<OptionsProps, {}> {
    onSubmit = (username: string, password: string): void => {
        console.log('submitting in container', username, password)
        this.props.authenticate(username, password)
    }

    render (): React.ReactNode {
        return (
            <>
                <h1>options</h1>
                <LoginForm onSubmit={this.onSubmit}/>
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

const mapDispatchToProps: OptionsDispatchProps = {
    authenticate
}

export default connect<OptionsStateProps, OptionsDispatchProps>(mapStateToProps, mapDispatchToProps)(Options)
