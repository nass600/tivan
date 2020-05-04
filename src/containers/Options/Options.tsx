import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'
import { LoginForm, OptionsForm } from '@components'
import { authenticateAction, removeAvailableConnectionsAction, setConnectionAction } from '@actions'
import { Normalize } from 'styled-normalize'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Avatar, Box, Title, OptionsGlobalStyles, CancelButton, FormGroup } from '@styles'
import logo from '@assets/img/logo.png'

interface OptionsStateProps {
    display: boolean;
    connection: AuthConnectionState | null;
    availableConnections: AuthConnectionState[];
}

interface OptionsDispatchProps {
    authenticate: (username: string, password: string) => Promise<void>;
    setConnection: (connection: AuthConnectionState) => void;
    removeAvailableConnections: () => void;
}

type OptionsProps = OptionsStateProps & OptionsDispatchProps

class Options extends React.Component<OptionsProps, {}> {
    onSubmit = (username: string, password: string): Promise<void> => {
        return this.props.authenticate(username, password)
    }

    onSelectConnection = (connection: AuthConnectionState): void => {
        console.log('about to dispatch', connection)
        this.props.setConnection(connection)
    }

    logout = (): void => {
        this.props.removeAvailableConnections()
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
                <Title>Tivan Options</Title>
                {connection && (
                    <OptionsForm
                        selectedConnection={connection}
                        connections={availableConnections}
                        onChange={this.onSelectConnection}
                    />
                )}
                <FormGroup>
                    <CancelButton type="button" onClick={this.logout}>Sign Out</CancelButton>
                </FormGroup>
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
                    <Avatar>
                        <img src={logo} alt="Tivan"/>
                    </Avatar>
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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): OptionsDispatchProps => ({
    authenticate: async (username: string, password: string): Promise<void> => (
        await dispatch(authenticateAction(username, password))
    ),
    setConnection: (connection: AuthConnectionState): void => {
        dispatch(setConnectionAction(connection))
    },
    removeAvailableConnections: (): void => {
        dispatch(removeAvailableConnectionsAction())
    }
})

export default connect<OptionsStateProps, OptionsDispatchProps>(mapStateToProps, mapDispatchToProps)(Options)
