import React from 'react'
import { variables } from '@styles'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { IconType } from 'react-icons'
import { MdInfo, MdError, MdWarning } from 'react-icons/md'

export const enum AlertType {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}

const AlertContainer = styled.div<{type: AlertType}>`
    display: flex;
    border-radius: ${variables.borderRadius.s};

    ${({ type }): FlattenSimpleInterpolation | undefined | false => type === AlertType.INFO && css`
        background-color: ${variables.colors.blue20};
    `}

    ${({ type }): FlattenSimpleInterpolation | undefined | false => type === AlertType.WARNING && css`
        background-color: ${variables.colors.yellow20};
    `}

    ${({ type }): FlattenSimpleInterpolation | undefined | false => type === AlertType.ERROR && css`
        background-color: ${variables.colors.red20};
    `}
`

const iconSize = '1.6rem'

const IconContainer = styled.div<{type: AlertType}>`
    display: flex;
    align-items: center;
    padding: ${variables.spacing.s} ${variables.spacing.m};

    svg {
        width: ${iconSize};
        height: ${iconSize};

        ${({ type }): FlattenSimpleInterpolation | undefined | false => type === AlertType.INFO && css`
            fill: ${variables.colors.blue60};
        `}

        ${({ type }): FlattenSimpleInterpolation | undefined | false => type === AlertType.WARNING && css`
            fill: ${variables.colors.yellow60};
        `}

        ${({ type }): FlattenSimpleInterpolation | undefined | false => type === AlertType.ERROR && css`
            fill: ${variables.colors.red60};
        `}
    }
`

const AlertMessage = styled.div`
    display: flex;
    align-items: center;
    padding: ${variables.spacing.s};
    padding-left: 0;

    p {
        margin-block-start: 0;
        margin-block-end: 0;
        text-align: left;
    }
`

interface AlertProps {
    type: AlertType;
}

class Alert extends React.Component<AlertProps> {
    static defaultProps = {
        type: AlertType.INFO
    }

    getIcon = (type: AlertType): IconType => {
        switch (type) {
            case AlertType.ERROR:
                return MdError
            case AlertType.WARNING:
                return MdWarning
            default:
                return MdInfo
        }
    }

    render (): React.ReactNode {
        const { type, children } = this.props
        const Icon = this.getIcon(type)

        return (
            <AlertContainer type={type}>
                <IconContainer type={type}>
                    <Icon/>
                </IconContainer>
                <AlertMessage>
                    {children}
                </AlertMessage>
            </AlertContainer>
        )
    }
}

export default Alert
