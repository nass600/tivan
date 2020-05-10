import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { Field, FieldConfig } from 'formik'
import React from 'react'
import ReactSelect from 'react-select'
import { variables } from '@styles'

interface InputProps extends FieldConfig<string> {
    invalid: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,react/prop-types
const FilteredPropsInputField: React.FC<InputProps> = ({ invalid, ...props }): JSX.Element => {
    return <Field {...props} />
}

export const Box = styled.div`
    position: relative;
    width: 100%;
    max-width: 650px;
    padding: ${variables.spacing.xl};
    color: ${variables.colors.gray40};
    background-color: ${variables.colors.white};
    border-radius: ${variables.borderRadius.m};
`

const avatarSize = 140

export const Avatar = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: ${avatarSize}px;
    height: ${avatarSize}px;
    margin-top: -${avatarSize * 2 / 3}px;
    margin-left: -${avatarSize / 2}px;
    padding: ${variables.spacing.m};
    background-color: ${variables.colors.gray80};
    border-radius: 50%;

    img {
        max-width: 100%;
    }
`

export const FormGroup = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin-top: ${variables.spacing.l};
`

export const FieldError = styled.div`
    ${variables.fontFamily.regular}
    display: inline-block;
    color: ${variables.colors.red60};
`

export const FormError = styled(FieldError)`
    width: 100%;
    margin-top: ${variables.spacing.l};
    text-align: center;
`

export const Label = styled.label`
    ${variables.fontFamily.semiBold}
    order: 1;
    margin-bottom: ${variables.spacing.s};
`

export const Select = styled(ReactSelect)`
    order: 3;
    width: 100%;

    &,
    & * {
        cursor: pointer;
    }
`

export const Input = styled(FilteredPropsInputField)<InputProps>`
    order: 3;
    width: 100%;
    height: 36px;
    padding: ${variables.spacing.s};
    border: 0;
    border-bottom: 1px solid ${variables.colors.gray40};
    outline: none;

    &:focus {
        border-bottom: 1px solid ${variables.colors.orange60};
    }

    ${({ invalid }): FlattenSimpleInterpolation | false => invalid && css`
        background-color: ${variables.colors.red40};
        border-bottom: 1px solid ${variables.colors.red60};
    `}
`

export const Button = styled.button`
    width: 100%;
    height: 50px;
    padding: ${variables.spacing.s};
    color: ${variables.colors.white};
    text-transform: none;
    background-color: ${variables.colors.orange60};
    border: 0;
    border-radius: ${variables.borderRadius.s};
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 0.9;
    }
`

export const CancelButton = styled(Button)`
    background-color: ${variables.colors.red60};
`

export const Title = styled.h1`
    ${variables.font.h1}
    margin-top: ${variables.spacing.m};
    padding-bottom: ${variables.spacing.m};
    color: ${variables.colors.gray80};
    line-height: 1.2em;
    text-align: center;
`

export const Hint = styled.div`
    margin-top: ${variables.spacing.l};
    text-align: center;
    ${variables.font.small}
`

export const AlertInfo = styled.p`
    margin-top: ${variables.spacing.l};
`
