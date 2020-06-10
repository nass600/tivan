import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu, Error, Sidebar, Button, Loader } from '@components'
import { Stats, Normalization, Forecast } from '@containers'
import { GlobalStyles } from '@styles'
import { Tabs } from '@reducers/status'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { parseLibraryAction, getLibrariesAction, setCurrentLibraryAction, setCurrentTabAction } from '@actions'
import styled from 'styled-components'
import { LibrariesState } from '@reducers/library'
import { MdFingerprint } from 'react-icons/md'
import { isEmpty } from 'lodash'

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
    signedIn: boolean;
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
        if (this.props.display && this.props.signedIn) {
            this.props.getLibraries().catch((e: Error) => e)
        }
    }

    componentDidUpdate (prevProps: ContentProps): void {
        this.toggleOriginalPage(this.props.display)

        if ((!prevProps.display && this.props.display) || (!prevProps.signedIn && this.props.signedIn)) {
            this.props.getLibraries().catch((e: Error) => e)
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
                We <strong>do not store or send</strong> any user information or credentials, we only
                need to get an <strong>access token</strong> to the Plex Media Server you will choose in the
                Options page.
            </p>
            <br/>
            <Button as="a" target="_blank" rel="noopener noreferrer" href={chrome.extension.getURL('options.html')}>
                Sign in to Plex
            </Button>
        </Error>
    )

    renderPage = (currentTab: Tabs): React.ReactNode => (
        <>
            {currentTab === Tabs.STATS && <Stats/>}
            {currentTab === Tabs.NORMALIZATION && <Normalization/>}
            {currentTab === Tabs.FORECAST && <Forecast/>}
        </>
    )

    render (): React.ReactNode {
        const {
            display,
            currentTab,
            signedIn,
            loadingLibrary,
            libraries,
            currentLibraryId
        } = this.props

        if (!display) {
            return null
        }

        const hasData = !isEmpty(libraries[currentLibraryId || 0]?.stats)

        return (
            <>
                {signedIn && (
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
                                {hasData && this.renderPage(currentTab)}
                                {loadingLibrary && !hasData && <Loader/>}
                            </Page>
                        </ContentWrapper>
                    </>
                )}
                {!signedIn && this.renderUnauthorized()}
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
        signedIn: !!state.auth.connection
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
