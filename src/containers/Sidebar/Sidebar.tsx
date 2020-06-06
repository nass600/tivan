import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentLibraryAction } from '@actions'
import { AppState } from '@reducers'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { variables, customScrollbar } from '@styles'
import { Tooltip, TooltipContainer } from '@components'
import { LibrariesState } from '@reducers/library'
import { IconContext } from 'react-icons'
import { MdRefresh } from 'react-icons/md'

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

const SidebarAction = styled.button`
    display: none;
    margin: 0;
    padding: 0;
    color: ${variables.colors.whiteA30};
    background: transparent;
    border: 0;
    outline: none;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${variables.colors.white};
    }
`

const SidebarItem = styled.a<{active?: boolean}>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${variables.spacing.m} ${variables.spacing.m} ${variables.spacing.m} ${variables.spacing.xxl};
    color: inherit;
    border-top-right-radius: ${variables.borderRadius.s};
    border-bottom-right-radius: ${variables.borderRadius.s};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    ${({ active }): FlattenSimpleInterpolation | undefined | false => {
        if (active) {
            return css`
                color: ${variables.colors.orange60};
                cursor: default;

                ${SidebarAction} {
                    display: flex;
                }

                &::before {
                    position: absolute;
                    left: ${variables.spacing.l};
                    width: ${variables.spacing.l};
                    height: ${variables.spacing.l};
                    text-align: center;
                    content: '•';
                }
            `
        } else {
            return css`
                &:hover {
                    color: ${variables.colors.white};
                    background-color: ${variables.colors.whiteA08};
                }
            `
        }
    }}
`

interface SidebarDispatchProps {
    setCurrentLibrary(libraryId: number): void;
}

interface SidebarStateProps {
    libraries: LibrariesState;
    currentLibrary: number | null;
}

interface SidebarProps {
    onChangeCurrentLibrary: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onScanLibrary: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type SidebarType = SidebarProps & SidebarDispatchProps & SidebarStateProps

class Sidebar extends Component<SidebarType> {
    render (): React.ReactNode {
        const { libraries, currentLibrary, onScanLibrary, onChangeCurrentLibrary } = this.props
        const items = Object.keys(libraries)
        const label = 'Scan Library Files'

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
                                    onClick={onChangeCurrentLibrary}
                                >
                                    {libraries[parseInt(libraryId)].title}
                                    <SidebarAction onClick={onScanLibrary} data-id={libraryId}>
                                        <TooltipContainer aria-label={label} data-tip={label}>
                                            <IconContext.Provider
                                                value={{ style: { width: '1.3em', height: '1.3em' } }}
                                            >
                                                <MdRefresh/>
                                            </IconContext.Provider>
                                        </TooltipContainer>
                                    </SidebarAction>
                                    <Tooltip place="bottom" type="dark" effect="solid"/>
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
