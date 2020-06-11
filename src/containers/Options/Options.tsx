import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'
import { LoginForm, OptionsForm, Title, FormGroup, CancelLink, Modal } from '@components'
import { authenticateAction, removeAvailableConnectionsAction, setConnectionAction } from '@actions'
import { Normalize } from 'styled-normalize'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { GlobalStyles, variables } from '@styles'
import logo from '@assets/img/logo.png'
import styled, { createGlobalStyle } from 'styled-components'

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
}

type OptionsProps = OptionsStateProps & OptionsDispatchProps

class Options extends React.Component<OptionsProps, {}> {
    onSubmit = (username: string, password: string): Promise<void> => {
        return this.props.authenticate(username, password)
    }

    onSelectConnection = (connection: AuthConnectionState): void => {
        this.props.setConnection(connection)
    }

    logout = (): void => {
        this.props.removeAvailableConnections()
    }

    renderLogin (): React.ReactNode {
        return (
            <>
                <OptionsTitle as="h1">Sign in to Plex</OptionsTitle>
                <LoginForm onSubmit={this.onSubmit}/>
            </>
        )
    }

    renderLogout (): React.ReactNode {
        const { availableConnections, connection } = this.props
        return (
            <>
                <OptionsTitle as="h1">Tivan Settings</OptionsTitle>
                {connection && (
                    <OptionsForm
                        selectedConnection={connection}
                        connections={availableConnections}
                        onChange={this.onSelectConnection}
                    />
                )}
                <FormGroup>
                    <hr/>
                    <p>
                        If you don&apos;t want to keep using this extension you
                        can <CancelLink href="#" onClick={this.logout}>sign out of Plex</CancelLink>.
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
                    {connection && this.renderLogout()}
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
    }
})

export default connect<OptionsStateProps, OptionsDispatchProps>(mapStateToProps, mapDispatchToProps)(Options)
