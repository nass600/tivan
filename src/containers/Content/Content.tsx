import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Page, Menu } from '@components'
import { Stats } from '@containers'
import { GlobalStyles } from '@styles'

interface ContentStateProps {
    display: boolean;
}

class Content extends React.Component<ContentStateProps, {}> {
    componentDidMount (): void {
        this.toggleOriginalPage(this.props.display)
    }

    componentDidUpdate (): void {
        this.toggleOriginalPage(this.props.display)
    }

    toggleOriginalPage = (display: boolean): void => {
        const originalPage = document.querySelector('#tivan')?.nextElementSibling

        if (originalPage) {
            originalPage.classList.toggle('hidden', display)
        }
    }

    render (): React.ReactNode {
        if (!this.props.display) {
            return null
        }

        return (
            <>
                <Menu/>
                <Page>
                    <Stats/>
                </Page>
                <GlobalStyles />
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Content)
