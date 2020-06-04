import React from 'react'
import { Page, Title } from '@components'
import { IconContext } from 'react-icons'
import { MdFingerprint } from 'react-icons/md'
import styled from 'styled-components'
import { variables } from '@styles'

const ErrorPage = styled(Page)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const ErrorContainer = styled.div`
    max-width: 600px;
    padding: ${variables.spacing.xxl};
    text-align: center;
`

const ErrorIcon = styled.div`
    display: inline-flex;
    padding: ${variables.spacing.l};
    font-size: 60px;
    line-height: 0;
    text-align: center;
    background-color: ${variables.colors.blackA30};
    border-radius: 50%;
`

const ErrorTitle = styled(Title)`
    margin-bottom: ${variables.spacing.xl};
    color: ${variables.colors.white};
`

const Strong = styled.strong`
    color: ${variables.colors.white};
`

interface UnauthorizedProps {
    loginUrl: string;
}

class Unauthorized extends React.Component<UnauthorizedProps> {
    render (): React.ReactNode {
        const { loginUrl } = this.props

        return (
            <ErrorPage>
                <ErrorContainer>
                    <ErrorIcon>
                        <IconContext.Provider value={{ style: { width: '5rem', height: '5rem' } }}>
                            <MdFingerprint/>
                        </IconContext.Provider>
                    </ErrorIcon>
                    <ErrorTitle>Thanks for using Tivan</ErrorTitle>
                    <p>
                        To let Tivan display information about your library you need to log into Plex
                        first by clicking in this <a target="_blank" rel="noopener noreferrer" href={loginUrl}>link</a>.
                    </p>
                    <br/>
                    <p>
                        We <Strong>do not store or send</Strong> any user information or credentials, we only
                        need to get an <Strong>access token</Strong> to the Plex Media Server you will choose in the
                        Options page.
                    </p>
                </ErrorContainer>
            </ErrorPage>
        )
    }
}

export default Unauthorized
