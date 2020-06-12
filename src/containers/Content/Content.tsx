import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu, Error, Sidebar, Button, Loader } from '@components'
import { Stats, Normalization, Forecast } from '@containers'
import { GlobalStyles } from '@styles'
import { Tabs, ErrorState } from '@reducers/status'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { parseLibraryAction, getLibrariesAction, setCurrentLibraryAction, setCurrentTabAction } from '@actions'
import styled from 'styled-components'
import { LibrariesState } from '@reducers/library'
import { MdFingerprint, MdStorage } from 'react-icons/md'
import { isEmpty } from 'lodash'
import { AuthConnectionState } from '@reducers/auth'

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
`

interface ContentStateProps {
    libraries: LibrariesState;
    currentLibraryId: number | null;
    loadingLibrary: boolean;
    display: boolean;
    currentTab: Tabs;
    connection: AuthConnectionState | null;
    error: ErrorState | null;
}

interface ContentDispatchProps {
    getLibraries(): Promise<void>;
    parseLibrary(libraryId: number): Promise<void>;
    setCurrentLibrary(libraryId: number): Promise<void>;
    setCurrentTab (tab: Tabs): void;
}

type ContentProps = ContentDispatchProps & ContentStateProps

const getSiblings = (elem: Element): Element[] => {
    const siblings = []
    let sibling = elem.parentNode?.firstChild
    const skipMe = elem

    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType === 1 && sibling !== skipMe) { siblings.push(sibling as Element) }
    }

    return siblings
}

class Content extends React.Component<ContentProps, {}> {
    componentDidMount (): void {
        this.toggleOriginalPage(this.props.display)
        if (this.props.display && this.props.connection?.uri) {
            this.props.getLibraries()
        }
    }

    componentDidUpdate (prevProps: ContentProps): void {
        this.toggleOriginalPage(this.props.display)

        if (
            (!prevProps.display && this.props.display) ||
            (prevProps.connection?.uri !== this.props.connection?.uri)
        ) {
            this.props.getLibraries()
        }
    }

    toggleOriginalPage = (display: boolean): void => {
        const rootElement = document.querySelector('#tivan')

        if (!rootElement) {
            return
        }

        const siblings = getSiblings(rootElement)

        if (siblings.length > 0) {
            siblings.forEach((item: Element): void => {
                item.classList.toggle('hidden', display)
            })
        }
    }

    onChangeCurrentLibrary = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        const libraryId = parseInt((event.target as HTMLAnchorElement).dataset.id || '')

        if (!libraryId) {
            return
        }

        this.props.setCurrentLibrary(libraryId)
    }

    onScanLibrary = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        event.stopPropagation()
        const libraryId = parseInt((event.currentTarget as HTMLButtonElement).dataset.id || '')

        if (!libraryId) {
            return
        }

        this.props.parseLibrary(libraryId)
    }

    onChangeSection = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        const tab = (event.target as HTMLAnchorElement).dataset.value as Tabs

        if (!tab) {
            return
        }

        this.props.setCurrentTab(tab)
    }

    renderUnauthorized = (): React.ReactNode => (
        <Error title="Unauthorized" icon={MdFingerprint}>
            <p>
                To let <strong>Tivan</strong> display information about your media library
                you need to <strong>sign in to Plex</strong> through the extension first by clicking in the button
                below.
            </p>
            <p>
                We <strong>do not store</strong> your credentials, they are only used to issue
                an <strong>access token</strong> so we can display the needed information from your
                Plex Media Server.
            </p>
            <br/>
            <Button as="a" target="_blank" rel="noopener noreferrer" href={chrome.extension.getURL('options.html')}>
                SIGN IN TO PLEX
            </Button>
        </Error>
    )

    renderServerError = (): React.ReactNode => (
        <Error title="Unable to access your server" icon={MdStorage}>
            <p>
                Something wrong has happened accessing your <strong>Plex Media Server</strong>.
            </p>
            <p>
                Usually, the main reasons are:
            </p>
            <ul>
                <li>
                    The server or computer where you have your Plex Media Server
                    is <strong>down or inaccessible</strong>.
                </li>
                <li>
                    The connection to the server you choose in the <strong>settings page</strong> is not
                    reachable from where you are located.
                </li>
            </ul>
            <br/>
            <Button as="a" target="_blank" rel="noopener noreferrer" href={chrome.extension.getURL('options.html')}>
                CHANGE SETTINGS
            </Button>
        </Error>
    )

    renderPage = (): React.ReactNode => {
        const {
            currentTab,
            loadingLibrary,
            libraries,
            currentLibraryId
        } = this.props

        const hasData = !isEmpty(libraries[currentLibraryId || 0]?.stats)

        if (loadingLibrary && !hasData) {
            return <Loader/>
        } else {
            return (
                <>
                    {currentTab === Tabs.STATS && <Stats/>}
                    {currentTab === Tabs.NORMALIZATION && <Normalization/>}
                    {currentTab === Tabs.FORECAST && <Forecast/>}
                </>
            )
        }
    }

    render (): React.ReactNode {
        const {
            display,
            currentTab,
            error,
            loadingLibrary,
            libraries,
            currentLibraryId
        } = this.props

        if (!display) {
            return null
        }

        return (
            <>
                {!error && (
                    <>
                        <Sidebar
                            heading="Libraries"
                            actionLabel={loadingLibrary ? 'Scanning...' : 'Scan Library Files'}
                            items={libraries}
                            currentItemId={currentLibraryId}
                            loading={loadingLibrary}
                            onSelectItem={this.onChangeCurrentLibrary}
                            onTriggerAction={this.onScanLibrary}
                        />
                        <ContentWrapper>
                            <Menu
                                items={Object.values(Tabs)}
                                currentItem={currentTab}
                                onSelectItem={this.onChangeSection}
                            />
                            <Page>
                                {this.renderPage()}
                            </Page>
                        </ContentWrapper>
                    </>
                )}
                {error && error.code === 401 && this.renderUnauthorized()}
                {error && error.code === 500 && this.renderServerError()}
                <GlobalStyles />
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        libraries: state.library,
        currentLibraryId: state.status.currentLibrary,
        loadingLibrary: state.status.loading.library,
        display: state.status.display,
        currentTab: state.status.currentTab,
        connection: state.auth.connection,
        error: state.status.error
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): ContentDispatchProps => ({
    getLibraries: async (): Promise<void> => (
        await dispatch(getLibrariesAction())
    ),
    setCurrentLibrary: async (libraryId: number): Promise<void> => (
        await dispatch(setCurrentLibraryAction(libraryId))
    ),
    parseLibrary: async (libraryId: number): Promise<void> => (
        await dispatch(parseLibraryAction(libraryId))
    ),
    setCurrentTab: (tab: Tabs): void => {
        dispatch(setCurrentTabAction(tab))
    }
})

export default connect<ContentStateProps, ContentDispatchProps>(mapStateToProps, mapDispatchToProps)(Content)
