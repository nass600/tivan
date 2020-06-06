import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu, Unauthorized, Sidebar } from '@components'
import { Stats, Normalization, Forecast } from '@containers'
import { GlobalStyles } from '@styles'
import { Tabs } from '@reducers/status'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { parseLibraryAction, getLibrariesAction, setCurrentLibraryAction, setCurrentTabAction } from '@actions'
import styled from 'styled-components'
import { LibrariesState } from '@reducers/library'

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
    getLibraries(): void;
    parseLibrary(libraryId: number): void;
    setCurrentLibrary(libraryId: number): void;
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
            this.props.getLibraries()
        }
    }

    componentDidUpdate (prevProps: ContentProps): void {
        this.toggleOriginalPage(this.props.display)

        if ((!prevProps.display && this.props.display) || (!prevProps.signedIn && this.props.signedIn)) {
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
                                {currentTab === Tabs.STATS && <Stats/>}
                                {currentTab === Tabs.NORMALIZATION && <Normalization/>}
                                {currentTab === Tabs.FORECAST && <Forecast/>}
                            </Page>
                        </ContentWrapper>
                    </>
                )}
                {!signedIn && <Unauthorized loginUrl={chrome.extension.getURL('options.html')}/>}
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
