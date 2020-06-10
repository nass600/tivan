import React from 'react'
import { Title } from '@components'
import { IconContext, IconType } from 'react-icons'
import styled from 'styled-components'
import { variables } from '@styles'

const ErrorContainer = styled.div`
    max-width: 600px;
    margin: 20rem auto;
    padding: ${variables.spacing.xxl};
    text-align: center;
`

const ErrorIcon = styled.div`
    display: inline-flex;
    padding: ${variables.spacing.l};
    font-size: 60px;
    line-height: 0;
    text-align: center;
    background-color: ${variables.colors.blackA30};
    border-radius: 50%;
`

const ErrorTitle = styled(Title)`
    ${variables.font.h3}
    justify-content: center;
    margin-bottom: ${variables.spacing.xl};
    color: ${variables.colors.white};
`

interface ErrorProps {
    icon: IconType;
    title: string;
}

class Error extends React.Component<ErrorProps> {
    render (): React.ReactNode {
        const { title, children } = this.props
        const Icon = this.props.icon

        return (
            <ErrorContainer>
                {Icon && (
                    <ErrorIcon>
                        <IconContext.Provider value={{ style: { width: '5rem', height: '5rem' } }}>
                            {<Icon/>}
                        </IconContext.Provider>
                    </ErrorIcon>
                )}
                {title && <ErrorTitle>{title}</ErrorTitle>}
                {children && children}
            </ErrorContainer>
        )
    }
}

export default Error
