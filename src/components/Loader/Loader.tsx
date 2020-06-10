import React from 'react'
import { variables, rotateAnimation } from '@styles'
import styled, { FlattenSimpleInterpolation, css } from 'styled-components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const loaderSize = '2.5rem'

const LoaderContainer = styled.div<{inline: boolean}>`
    display: inline-flex;

    ${({ inline }): FlattenSimpleInterpolation | undefined | false => !inline && css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30rem;
    height: 10rem;
    `}
    svg {
        width: ${loaderSize};
        height: ${loaderSize};
        animation: ${rotateAnimation} infinite 1s linear;
        fill: ${variables.colors.orange80};
    }
`

interface LoaderProps {
    inline: boolean;
}

class Loader extends React.Component<LoaderProps> {
    static defaultProps = {
        inline: false
    }

    render (): React.ReactNode {
        const { inline } = this.props

        return (
            <LoaderContainer inline={inline}>
                <AiOutlineLoading3Quarters/>
            </LoaderContainer>
        )
    }
}

export default Loader
