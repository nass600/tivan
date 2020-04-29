import React from 'react'
import { connect } from 'react-redux'
import { IAppState } from '@reducers'
import { Root, Page } from '@components'

interface IContentStateProps {
    display: boolean;
}

class Content extends React.Component<IContentStateProps, {}> {
    componentDidMount() {
        this.toggleOriginalPage(this.props.display);
    }

    componentDidUpdate() {
        this.toggleOriginalPage(this.props.display);
    }

    toggleOriginalPage = (display: boolean): void => {
        let originalPage = document.querySelector('#tivan')?.nextElementSibling;

        if (originalPage) {
            originalPage.classList.toggle('hidden', display)
        }
    }

    render() {
        if (!this.props.display) {
            return null
        }

        return (
            <Page>
                <h1>Content</h1>
                <Root />
            </Page>
        )
    }
}

const mapStateToProps = (state: IAppState): IContentStateProps => {
    return {
        display: state.status.display
    }
}

export default connect<IContentStateProps>(mapStateToProps)(Content)
