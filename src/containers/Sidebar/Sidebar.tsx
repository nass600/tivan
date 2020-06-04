import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentLibraryAction } from '@actions'
import { AppState } from '@reducers'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { variables, customScrollbar } from '@styles'
import { LibrariesState } from '@reducers/library'

const SidebarWrapper = styled.div`
    ${customScrollbar}
    display: flex;
    flex: 0 0 240px;
    flex-direction: column;
    width: 240px;
    height: 100%;
    padding-right: ${variables.spacing.s};
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${variables.colors.blackA15};
`

const SidebarHeading = styled.div`
    ${variables.font.h3}
    align-content: center;
    min-width: 0;
    max-width: 100%;
    height: 50px;
    padding-left: ${variables.spacing.l};
    overflow: hidden;
    color: ${variables.colors.whiteA30};
    line-height: 50px;
    white-space: nowrap;
    text-transform: uppercase;
    text-overflow: ellipsis;
`

const SidebarItems = styled.div`
    margin-bottom: ${variables.spacing.xl};
`

const SidebarItem = styled.a<{active?: boolean}>`
    position: relative;
    display: flex;
    padding: ${variables.spacing.m} ${variables.spacing.m} ${variables.spacing.m} ${variables.spacing.xxl};
    color: inherit;
    border-top-right-radius: ${variables.borderRadius.s};
    border-bottom-right-radius: ${variables.borderRadius.s};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${variables.colors.white};
        background-color: ${variables.colors.whiteA08};
    }

    ${({ active }): FlattenSimpleInterpolation | undefined | false => active && css`
        color: ${variables.colors.orange60};

        &::before {
            position: absolute;
            left: ${variables.spacing.l};
            width: ${variables.spacing.l};
            height: ${variables.spacing.l};
            text-align: center;
            content: '•';
        }
    `}
`

interface SidebarDispatchProps {
    setCurrentLibrary(libraryId: number): void;
}

interface SidebarStateProps {
    libraries: LibrariesState;
    currentLibrary: number | null;
}

type SidebarProps = SidebarDispatchProps & SidebarStateProps

class Sidebar extends Component<SidebarProps> {
    onChange = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        const libraryId = parseInt((event.target as HTMLAnchorElement).dataset.id || '')

        if (!libraryId) {
            return
        }

        this.props.setCurrentLibrary(libraryId)
    }

    render (): React.ReactNode {
        const { libraries, currentLibrary } = this.props
        const items = Object.keys(libraries)

        return (
            <SidebarWrapper>
                <div>
                    <SidebarHeading>Libraries</SidebarHeading>
                    {items.length > 0 && (
                        <SidebarItems>
                            {items.map((libraryId: string, index: number): React.ReactNode => (
                                <SidebarItem
                                    key={index}
                                    data-id={libraryId}
                                    active={parseInt(libraryId) === currentLibrary}
                                    onClick={this.onChange}
                                >
                                    {libraries[parseInt(libraryId)].title}
                                </SidebarItem>
                            ))}
                        </SidebarItems>
                    )}
                </div>
            </SidebarWrapper>
        )
    }
}

const mapStateToProps = (state: AppState): SidebarStateProps => {
    return {
        libraries: state.library,
        currentLibrary: state.status.currentLibrary
    }
}

const mapDispatchToProps: SidebarDispatchProps = {
    setCurrentLibrary: setCurrentLibraryAction
}

export default connect<SidebarStateProps, SidebarDispatchProps>(mapStateToProps, mapDispatchToProps)(Sidebar)
