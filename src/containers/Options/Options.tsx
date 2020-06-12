import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'
import { LoginForm, SettingsForm, Title, FormGroup, CancelLink, Modal, Alert, AlertType } from '@components'
import {
    authenticateAction,
    removeAvailableConnectionsAction,
    setConnectionAction,
    cleanLibrariesAction,
    setErrorAction
} from '@actions'
import { Normalize } from 'styled-normalize'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { GlobalStyles, variables } from '@styles'
import logo from '@assets/img/logo.png'
import styled, { createGlobalStyle } from 'styled-components'
import { ErrorState } from '@reducers/status'
import { AxiosError } from 'axios'

const OptionsGlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        color: ${variables.colors.white};
        font-size: 14px;
        ${variables.fontFamily.regular}
        line-height: 1.5;
        background-color: ${variables.colors.gray60};
    }

    #tivan {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    hr {
        display: flex;
        width: 100%;
        border: 0;
        border-top: 1px solid ${variables.colors.gray20};
        margin-block-start: ${variables.spacing.m};
        margin-block-end: ${variables.spacing.m};
    }

    button {
        font-size: 1.2rem !important;
    }

    p {
        margin-block-start: 0;
        margin-block-end: 0;
    }

    form {
        margin-top: ${variables.spacing.l};
    }
`

const OptionsTitle = styled(Title)`
    ${variables.font.h3}
    justify-content: center;
    margin-top: ${variables.spacing.m};
    padding-bottom: ${variables.spacing.m};
    color: ${variables.colors.gray80};
`

const avatarSize = 140

const Avatar = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: ${avatarSize}px;
    height: ${avatarSize}px;
    margin-top: -${avatarSize * 2 / 3}px;
    margin-left: -${avatarSize / 2}px;
    padding: 1.5rem;
    background-color: ${variables.colors.gray80};
    border-radius: 50%;

    img {
        max-width: 100%;
    }
`

interface OptionsStateProps {
    display: boolean;
    connection: AuthConnectionState | null;
    availableConnections: AuthConnectionState[];
}

interface OptionsDispatchProps {
    authenticate: (username: string, password: string) => Promise<void>;
    setConnection: (connection: AuthConnectionState) => void;
    removeAvailableConnections: () => void;
    cleanLibraries: () => void;
    setError: (error: ErrorState | null) => void;
}

type OptionsProps = OptionsStateProps & OptionsDispatchProps

const initialState = {
    alert: null
}

type State = {
    alert: {
        type: AlertType;
        message: Element | string;
    } | null;
};

class Options extends React.Component<OptionsProps, State> {
    state: State = initialState

    onLogin = (username: string, password: string): void => {
        this.props.authenticate(username, password).then((): void => {
            this.setState({ alert: { type: AlertType.SUCCESS, message: 'You signed in successfully in Plex' } })
            setTimeout((): void => this.setState({ alert: null }), 3000)
        }).catch((e: AxiosError): void => {
            let message = 'Something wrong happened'

            if (e.response?.status === 401) {
                message = e.response?.data.error
            }

            this.setState({ alert: { type: AlertType.ERROR, message } })
            setTimeout((): void => this.setState({ alert: null }), 5000)
        })
    }

    onSaveSettings = (connection: AuthConnectionState): void => {
        this.props.setConnection(connection)
        this.props.setError(null)

        if (this.props.connection?.name !== connection.name) {
            this.props.cleanLibraries()
        }

        this.setState({ alert: { type: AlertType.SUCCESS, message: 'Settings saved' } })
        setTimeout((): void => this.setState({ alert: null }), 3000)
    }

    onLogout = (): void => {
        this.props.removeAvailableConnections()
    }

    renderLogin (): React.ReactNode {
        const { alert } = this.state

        return (
            <>
                <OptionsTitle as="h1">Sign in to Plex</OptionsTitle>
                {alert && <Alert type={alert.type}>{alert.message}</Alert>}
                <LoginForm onSubmit={this.onLogin}/>
            </>
        )
    }

    renderSettings (): React.ReactNode {
        const { availableConnections, connection } = this.props
        const { alert } = this.state

        return (
            <>
                <OptionsTitle as="h1">Tivan Settings</OptionsTitle>
                {alert && <Alert type={alert.type}>{alert.message}</Alert>}
                {connection && (
                    <SettingsForm
                        selectedConnection={connection}
                        connections={availableConnections}
                        onSubmit={this.onSaveSettings}
                    />
                )}
                <FormGroup>
                    <hr/>
                    <p>
                        If you don&apos;t want to keep using this browser extension you
                        can <CancelLink href="#" onClick={this.onLogout}>sign out of Plex</CancelLink>.
                    </p>
                </FormGroup>
            </>
        )
    }

    render (): React.ReactNode {
        const { connection } = this.props

        return (
            <>
                <Normalize/>
                <GlobalStyles/>
                <OptionsGlobalStyles/>
                <Modal>
                    <Avatar>
                        <img src={logo} alt="Tivan"/>
                    </Avatar>
                    {!connection && this.renderLogin()}
                    {connection && this.renderSettings()}
                </Modal>
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
    },
    cleanLibraries: (): void => {
        dispatch(cleanLibrariesAction())
    },
    setError: (error: ErrorState | null): void => {
        dispatch(setErrorAction(error))
    }
})

export default connect<OptionsStateProps, OptionsDispatchProps>(mapStateToProps, mapDispatchToProps)(Options)
