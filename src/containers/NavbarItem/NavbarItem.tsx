import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDisplay } from '@actions'

interface INavbarItemDispatchProps {
    toggleDisplay(): void;
}

class NavbarItem extends Component<INavbarItemDispatchProps> {
    handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        this.props.toggleDisplay()
    }

    render() {
        return (
            <a href="#" onClick={this.handleClick}>
                NavbarItem
            </a>
        )
    }
}

const mapDispatchToProps: INavbarItemDispatchProps = {
    toggleDisplay
}

export default connect<{}, INavbarItemDispatchProps>(null, mapDispatchToProps)(NavbarItem)
