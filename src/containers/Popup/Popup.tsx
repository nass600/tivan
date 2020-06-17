import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { variables } from '@styles'
import { MdSettings } from 'react-icons/md'
import { Button, Title, SectionTitle } from '@components'
import config from '../../../package.json'
import Logo from '@assets/img/logo.svg'
import PlexLogo from '@assets/img/plex-logo.svg'

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 10px;
    }

    & * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        color: ${variables.colors.white};
        font-size: 14px;
        ${variables.fontFamily.regular}
        line-height: 1.5;
        background-color: ${variables.colors.gray60};
    }

    a {
        text-decoration: none;
    }
`

const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 22rem;
    height: 100%;

    ${Button} + ${Button} {
        margin-left: ${variables.spacing.l};
    }
`
const avatarSize = 80

const PopupTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${variables.spacing.l};
    background-color: ${variables.colors.gray80};

    svg {
        width: ${avatarSize}px;
        height: ${avatarSize}px;
    }
`

const PopupBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: ${variables.spacing.l};
`

const PopupTitle = styled(Title)`
    margin-top: 0;
`

const PopupSubtitle = styled(SectionTitle)`
    color: ${variables.colors.whiteA45};
    text-transform: none;
`

const PlexIcon = styled(PlexLogo)`
    width: 1em;
    height: 1em;
`

class Popup extends React.Component<{}, {}> {
    render (): React.ReactNode {
        return (
            <>
                <GlobalStyles/>
                <PopupContainer>
                    <PopupTop>
                        <Logo/>
                    </PopupTop>
                    <PopupBody>
                        <PopupTitle>Tivan</PopupTitle>
                        <PopupSubtitle>v{config.version}</PopupSubtitle>
                        <div>
                            <Button
                                as="a"
                                title="Open Plex Media Server"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="app.plex.tv/desktop"
                            >
                                <PlexIcon/>
                            </Button>
                            <Button
                                as="a"
                                title="Open Settings"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={chrome.extension.getURL('options.html')}
                            >
                                <MdSettings/>
                            </Button>
                        </div>
                    </PopupBody>
                </PopupContainer>
            </>
        )
    }
}

export default Popup
