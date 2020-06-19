import React, { Component } from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { variables, customScrollbar, rotateAnimation } from '@styles'
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
    ${variables.font.h5}
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

const SidebarAction = styled.button<{loading?: number}>`
    display: none;
    margin: 0;
    padding: 0;
    color: ${variables.colors.whiteA30};
    background: transparent;
    border: 0;
    outline: none;
    transition: all 0.2s ease-in-out;

    ${({ loading }): FlattenSimpleInterpolation | undefined | false => !loading && css`
        &:hover {
            color: ${variables.colors.white};
        }
    `}

    ${({ loading }): FlattenSimpleInterpolation | undefined | false => (loading === 1) && css`
        color: ${variables.colors.orange60};
        cursor: default;
        user-select: none;

        svg {
            animation: ${rotateAnimation} infinite 1s linear;
        }
    `}
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

interface SidebarProps {
    heading: string;
    items: LibrariesState;
    currentItemId: number | null;
    loading: boolean;
    onSelectItem: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    actionLabel: string;
    onTriggerAction: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

class Sidebar extends Component<SidebarProps> {
    static defaultProps = {
        loading: false
    }

    render (): React.ReactNode {
        const {
            heading,
            items,
            currentItemId,
            onTriggerAction,
            actionLabel,
            onSelectItem,
            loading
        } = this.props
        const itemKeys = Object.keys(items)

        return (
            <SidebarWrapper>
                <div>
                    <SidebarHeading>{heading}</SidebarHeading>
                    {itemKeys.length > 0 && (
                        <SidebarItems>
                            {itemKeys.map((id: string, index: number): React.ReactNode => (
                                <SidebarItem
                                    key={index}
                                    data-id={id}
                                    active={parseInt(id) === currentItemId}
                                    onClick={onSelectItem}
                                >
                                    {items[parseInt(id)].title}
                                    <SidebarAction onClick={onTriggerAction} data-id={id} loading={loading ? 1 : 0}>
                                        <TooltipContainer
                                            aria-label={actionLabel}
                                            data-tip={actionLabel}
                                            data-for="sidebar-action"
                                        >
                                            <IconContext.Provider value={{ style: { width: '2rem', height: '2rem' } }}>
                                                <MdRefresh/>
                                            </IconContext.Provider>
                                        </TooltipContainer>
                                    </SidebarAction>
                                    <Tooltip id="sidebar-action" place="bottom" type="dark" effect="solid"/>
                                </SidebarItem>
                            ))}
                        </SidebarItems>
                    )}
                </div>
            </SidebarWrapper>
        )
    }
}

export default Sidebar
