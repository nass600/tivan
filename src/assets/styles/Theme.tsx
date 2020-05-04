import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { Field, FieldConfig } from 'formik'
import React from 'react'
import ReactSelect from 'react-select'

interface InputProps extends FieldConfig<string> {
    invalid: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,react/prop-types
const FilteredPropsInputField: React.FC<InputProps> = ({ invalid, ...props }): JSX.Element => {
    return <Field {...props} />
}

export const Box = styled.div`
    background-color: #fff;
    max-width: 650px;
    width: 100%;
    border-radius: 6px;
    padding: 40px 90px;
    color: #51595e;
    position: relative;
`

const avatarSize = 140

export const Avatar = styled.div`
    background-color: #27292b;
    border-radius: 50%;
    width: ${avatarSize}px;
    height: ${avatarSize}px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-top: -${avatarSize * 2 / 3}px;
    margin-left: -${avatarSize / 2}px;
    padding: 1.5rem;

    img {
        max-width: 100%;
    }
`

export const FormGroup = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin-top: 2rem;
`

export const FieldError = styled.div`
    display: inline-block;
    color: #f53;
`

export const FormError = styled(FieldError)`
    width: 100%;
    text-align: center;
    margin-top: 2rem;
`

export const Label = styled.label`
    order: 1;
    margin-bottom: 5px;
`

export const Select = styled(ReactSelect)`
    order: 3;
    width: 100%;
`

export const Input = styled(FilteredPropsInputField)<InputProps>`
    order: 3;
    width: 100%;
    padding: 5px 10px;
    height: 36px;
    border: 0;
    border-bottom: 1px solid #51595e;
    outline: none;

    &:focus {
        border-bottom: 1px solid #cc7b19;
    }
    ${({ invalid }): FlattenSimpleInterpolation | false => invalid && css`
        background-color: rgba(255, 85, 51, 0.3);
        border-bottom: 1px solid #f53;
    `}
`

export const Button = styled.button`
    width: 100%;
    border: 0;
    border-radius: 4px;
    padding: 0.5rem 1em;
    height: 50px;
    background-color: #e5a00d;
    color: #fff;
    text-transform: none;

    &:hover {
        opacity: 0.9;
    }
`

export const CancelButton = styled(Button)`
    background-color: #dd4b39;
`

export const Title = styled.h1`
    font-size: 2em;
    line-height: 1.2em;
    padding-bottom: 10px;
    margin-top: 20px;
    text-align: center;
    color: #282a2d;
    font-family: Open Sans Bold, Helvetica, sans-serif;
`

export const Hint = styled.div`
    text-align: center;
    margin-top: 3rem;
    font-size: 90%;
    font-family: Open Sans Regular, Helvetica, sans-serif;
`
