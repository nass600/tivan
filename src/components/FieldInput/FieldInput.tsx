import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { Field, FieldConfig } from 'formik'
import { variables } from '@styles'

interface InputProps extends FieldConfig<string> {
    invalid: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,react/prop-types
const FilteredPropsInputField: React.FC<InputProps> = ({ invalid, ...props }): JSX.Element => {
    return <Field {...props} />
}

export const FieldInput = styled(FilteredPropsInputField)<InputProps>`
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
        background-color: ${variables.colors.red20};
        border-bottom: 1px solid ${variables.colors.red60};
    `}
`
