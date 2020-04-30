import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDisplay } from '@actions'

interface NavbarItemDispatchProps {
    toggleDisplay(): void;
}

class NavbarItem extends Component<NavbarItemDispatchProps> {
    handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        this.props.toggleDisplay()
    }

    render (): React.ReactNode {
        return (
            <a href="#" onClick={this.handleClick}>
                NavbarItem
            </a>
        )
    }
}

const mapDispatchToProps: NavbarItemDispatchProps = {
    toggleDisplay
}

export default connect<{}, NavbarItemDispatchProps>(null, mapDispatchToProps)(NavbarItem)
