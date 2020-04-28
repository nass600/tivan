import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDisplay } from '@actions'

interface IAppDispatchProps {
    toggleDisplay(): void;
}

class Button extends Component<IAppDispatchProps> {
    handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        this.props.toggleDisplay()
    }

    render() {
        return (
            <a href="#" onClick={this.handleClick}>
                button
            </a>
        )
    }
}

const mapDispatchToProps: IAppDispatchProps = {
    toggleDisplay
}

export default connect<{}, IAppDispatchProps>(null, mapDispatchToProps)(Button)
