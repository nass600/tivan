import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu, Unauthorized } from '@components'
import { Stats, Normalization, Forecast } from '@containers'
import { GlobalStyles } from '@styles'
import { Tabs } from '@reducers/status'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { parseLibraryAction } from '@actions'

interface ContentStateProps {
    display: boolean;
    currentTab: Tabs;
    signedIn: boolean;
}

interface ContentDispatchProps {
    parseLibrary(): void;
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
            this.props.parseLibrary()
        }
    }

    componentDidUpdate (prevProps: ContentProps): void {
        this.toggleOriginalPage(this.props.display)

        if ((!prevProps.display && this.props.display) || (!prevProps.signedIn && this.props.signedIn)) {
            this.props.parseLibrary()
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

    render (): React.ReactNode {
        const { display, currentTab, signedIn } = this.props

        if (!display) {
            return null
        }

        return (
            <>
                {signedIn && (
                    <>
                        <Menu/>
                        <Page>
                            {currentTab === Tabs.STATS && <Stats/>}
                            {currentTab === Tabs.NORMALIZATION && <Normalization/>}
                            {currentTab === Tabs.FORECAST && <Forecast/>}
                        </Page>
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
    parseLibrary: async (): Promise<void> => (
        await dispatch(parseLibraryAction())
    )
})

export default connect<ContentStateProps, ContentDispatchProps>(mapStateToProps, mapDispatchToProps)(Content)
