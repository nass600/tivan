import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'
import { LoginForm, OptionsForm } from '@components'
import { authenticateAction, removeAvailableConnectionsAction, setConnectionAction } from '@actions'

interface OptionsStateProps {
    display: boolean;
    connection: AuthConnectionState | null;
    availableConnections: AuthConnectionState[];
}

interface OptionsDispatchProps {
    authenticateAction: (username: string, password: string) => void;
    setConnectionAction: (connection: AuthConnectionState) => void;
    removeAvailableConnectionsAction: () => void;
}

type OptionsProps = OptionsStateProps & OptionsDispatchProps

class Options extends React.Component<OptionsProps, {}> {
    onSubmit = (username: string, password: string): void => {
        console.log('submitting in container', username, password)
        this.props.authenticateAction(username, password)
    }

    onSelectConnection = (connection: AuthConnectionState): void => {
        this.props.setConnectionAction(connection)
    }

    logout = (): void => {
        this.props.removeAvailableConnectionsAction()
    }

    renderLogin (): React.ReactNode {
        return (
            <LoginForm onSubmit={this.onSubmit}/>
        )
    }

    renderLogout (): React.ReactNode {
        const { availableConnections, connection } = this.props
        return (
            <>
                {connection && (
                    <OptionsForm
                        selectedConnection={connection}
                        connections={availableConnections}
                        onChange={this.onSelectConnection}
                    />
                )}
                <button type="button" onClick={this.logout}>Logout</button>
            </>
        )
    }

    render (): React.ReactNode {
        const { connection } = this.props

        return (
            <>
                <h1>options</h1>
                {!connection && this.renderLogin()}
                {connection && this.renderLogout()}
            </>
        )
    }
}

const mapStateToProps = (state: AppState): OptionsStateProps => {
    return {
        display: state.status.display,
        connection: state.auth.connection,
        availableConnections: state.auth.availableConnections
    }
}

const mapDispatchToProps: OptionsDispatchProps = {
    authenticateAction,
    setConnectionAction,
    removeAvailableConnectionsAction
}

export default connect<OptionsStateProps, OptionsDispatchProps>(mapStateToProps, mapDispatchToProps)(Options)
