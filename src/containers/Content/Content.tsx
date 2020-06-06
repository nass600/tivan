import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu, Unauthorized } from '@components'
import { Stats, Normalization, Forecast, Sidebar } from '@containers'
import { GlobalStyles } from '@styles'
import { Tabs } from '@reducers/status'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { parseLibraryAction, getLibrariesAction, setCurrentLibraryAction } from '@actions'
import styled from 'styled-components'

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
`

interface ContentStateProps {
    display: boolean;
    currentTab: Tabs;
    signedIn: boolean;
}

interface ContentDispatchProps {
    getLibraries(): void;
    parseLibrary(libraryId: number): void;
    setCurrentLibrary(libraryId: number): void;
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
            // this.props.parseLibrary()
            this.props.getLibraries()
        }
    }

    componentDidUpdate (prevProps: ContentProps): void {
        this.toggleOriginalPage(this.props.display)

        if ((!prevProps.display && this.props.display) || (!prevProps.signedIn && this.props.signedIn)) {
            // this.props.parseLibrary()
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

    render (): React.ReactNode {
        const { display, currentTab, signedIn } = this.props

        if (!display) {
            return null
        }

        return (
            <>
                {signedIn && (
                    <>
                        <Sidebar
                            onChangeCurrentLibrary={this.onChangeCurrentLibrary}
                            onScanLibrary={this.onScanLibrary}
                        />
                        <ContentWrapper>
                            <Menu/>
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
    )
})

export default connect<ContentStateProps, ContentDispatchProps>(mapStateToProps, mapDispatchToProps)(Content)
