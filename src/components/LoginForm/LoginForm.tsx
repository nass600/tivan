import React from 'react'
import { Formik, Form, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import { AxiosError } from 'axios'
import { FieldError, FieldLabel, FieldInput, FormGroup, Alert, AlertType, Button, Link } from '@components'
import styled from 'styled-components'

const StyledForm = styled(Form)`
    & > * + * {
        margin-top: 2rem;
    }
`

export interface Login {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (username: string, password: string) => Promise<void>;
}

const initialState = {
    error: ''
}

type State = Readonly<typeof initialState>;

class LoginForm extends React.Component<LoginFormProps, {}> {
    state: State = initialState
    initialValues: Login = {
        username: '',
        password: ''
    }

    onSubmit = (values: FormikValues): void => {
        this.props.onSubmit(values.username, values.password).catch((e: AxiosError): void => {
            this.setState({
                error: e.response?.status === 401 ? 'The username or password is incorrect' : 'Something wrong happened'
            })
        })
    }

    validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Email address is required'),
        password: Yup.string()
            .min(2, 'Password must be at least 2 characters')
            .required('Password is required')
    })

    render (): React.ReactNode {
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.onSubmit}
            >
                {({ errors, touched }): React.ReactNode => {
                    return (
                        <StyledForm>
                            <p>
                                To let <strong>Tivan</strong> display information about your media library you
                                need to <strong>sign in to Plex</strong> through the browser extension first by
                                entering your Plex credentials in the below form.
                            </p>
                            <Alert type={AlertType.INFO}>
                                <p>
                                    We <strong>do not store</strong> your credentials, they are only used to
                                    issue an <strong>access token</strong> so we can display the needed
                                    information from your Plex Media Server.
                                </p>
                            </Alert>
                            {this.state.error && (
                                <Alert type={AlertType.ERROR}><p>{this.state.error}</p></Alert>
                            )}
                            <FormGroup>
                                <FieldLabel htmlFor="username">
                                    Email or Username {errors.username && touched.username && (
                                        <FieldError>
                                            <span> — </span>
                                            <ErrorMessage name="username" component="span"/>
                                        </FieldError>
                                    )}
                                </FieldLabel>
                                <FieldInput
                                    name="username"
                                    type="text"
                                    invalid={(errors.username && touched.username) as boolean}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FieldLabel htmlFor="password">
                                    Password {errors.password && touched.password && (
                                        <FieldError>
                                            <span> — </span>
                                            <ErrorMessage name="password" component="span"/>
                                        </FieldError>
                                    )}
                                </FieldLabel>
                                <FieldInput
                                    name="password"
                                    type="password"
                                    invalid={(errors.password && touched.password) as boolean}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button block type="submit">Sign in</Button>
                            </FormGroup>
                            <p>
                                Need an account? Click on this <Link href="https://plex.tv">link</Link> to
                                create an account in the Plex site.
                            </p>
                        </StyledForm>
                    )
                }}
            </Formik>
        )
    }
}

export default LoginForm
