import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu, Unauthorized } from '@components'
import { Stats, Normalization, Forecast } from '@containers'
import { GlobalStyles } from '@styles'
import { Tabs } from '@reducers/status'

interface ContentStateProps {
    display: boolean;
    currentTab: Tabs;
    signedIn: boolean;
}

const getSiblings = (elem: Element): Element[] => {
    const siblings = []
    let sibling = elem.parentNode?.firstChild
    const skipMe = elem

    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType === 1 && sibling !== skipMe) { siblings.push(sibling as Element) }
    }

    return siblings
}

class Content extends React.Component<ContentStateProps, {}> {
    componentDidMount (): void {
        this.toggleOriginalPage(this.props.display)
    }

    componentDidUpdate (): void {
        this.toggleOriginalPage(this.props.display)
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

export default connect<ContentStateProps>(mapStateToProps)(Content)
