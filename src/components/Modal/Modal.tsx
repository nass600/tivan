import styled from 'styled-components'
import { variables } from '@styles'

export const Modal = styled.div`
    position: relative;
    width: 100%;
    max-width: 650px;
    padding: ${variables.spacing.xl};
    color: ${variables.colors.gray40};
    background-color: ${variables.colors.white};
    border-radius: ${variables.borderRadius.m};

    p {
        text-align: center;
    }

    strong {
        color: ${variables.colors.gray80};
    }
`
