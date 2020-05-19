import React from 'react'
import { Page, Well, Title } from '@components'
import { IconContext } from 'react-icons'
import { GiStopSign } from 'react-icons/gi'
import styled from 'styled-components'
import { variables } from '@styles'

const ErrorPage = styled(Page)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const ErrorWell = styled(Well)`
    max-width: 600px;
    padding: ${variables.spacing.xxl};
    text-align: center;
`

const ErrorTitle = styled(Title)`
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
                <ErrorWell>
                    <IconContext.Provider value={{ style: { width: '5rem', height: '5rem' } }}>
                        <GiStopSign/>
                    </IconContext.Provider>
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
                </ErrorWell>
            </ErrorPage>
        )
    }
}

export default Unauthorized
