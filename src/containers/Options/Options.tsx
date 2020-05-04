import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'
import { LoginForm, OptionsForm } from '@components'
import { authenticateAction, removeAvailableConnectionsAction, setConnectionAction } from '@actions'
import { Normalize } from 'styled-normalize'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Box, Title, OptionsGlobalStyles } from '@styles'

interface OptionsStateProps {
    display: boolean;
    connection: AuthConnectionState | null;
    availableConnections: AuthConnectionState[];
}

interface OptionsDispatchProps {
    authenticate: (username: string, password: string) => Promise<void>;
    setConnectionAction: (connection: AuthConnectionState) => void;
    removeAvailableConnectionsAction: () => void;
}

type OptionsProps = OptionsStateProps & OptionsDispatchProps

class Options extends React.Component<OptionsProps, {}> {
    onSubmit = (username: string, password: string): Promise<void> => {
        return this.props.authenticate(username, password)
    }

    onSelectConnection = (connection: AuthConnectionState): void => {
        this.props.setConnectionAction(connection)
    }

    logout = (): void => {
        this.props.removeAvailableConnectionsAction()
    }

    renderLogin (): React.ReactNode {
        return (
            <>
                <Title>Sign in to Plex</Title>
                <LoginForm onSubmit={this.onSubmit}/>
            </>
        )
    }

    renderLogout (): React.ReactNode {
        const { availableConnections, connection } = this.props
        return (
            <>
                <Title>Options</Title>
                {connection && (
                    <OptionsForm
                        selectedConnection={connection}
                        connections={availableConnections}
                        onChange={this.onSelectConnection}
                    />
                )}
                <button type="button" onClick={this.logout}>Sign Out</button>
            </>
        )
    }

    render (): React.ReactNode {
        const { connection } = this.props

        return (
            <>
                <Normalize/>
                <OptionsGlobalStyles/>
                <Box>
                    {!connection && this.renderLogin()}
                    {connection && this.renderLogout()}
                </Box>
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

// const mapDispatchToProps: OptionsDispatchProps = {
//     authenticateAction,
//     setConnectionAction,
//     removeAvailableConnectionsAction
// }

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): OptionsDispatchProps => ({
    authenticate: async (username: string, password: string): Promise<void> => (
        await dispatch(authenticateAction(username, password))
    ),
    setConnectionAction,
    removeAvailableConnectionsAction
})

export default connect<OptionsStateProps, OptionsDispatchProps>(mapStateToProps, mapDispatchToProps)(Options)
