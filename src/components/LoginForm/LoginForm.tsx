import React from 'react'
import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { AxiosError } from 'axios'

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
    initialValues: Login = { username: '', password: '' }

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
            <div>
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={this.validationSchema}
                    onSubmit={this.onSubmit}
                >
                    {({ errors, touched }): React.ReactNode => {
                        const usernameGroupClass = classNames(
                            'form-group',
                            { invalid: errors.username && touched.username }
                        )
                        const passwordGroupClass = classNames(
                            'form-group',
                            { invalid: errors.password && touched.password }
                        )

                        return (
                            <Form>
                                <div className="alert alert-info">
                                    We do not store your credentials, they are only used to issue an access token
                                    so we can display the needed information from your Plex Media Server.
                                </div>
                                {this.state.error && (
                                    <p>{this.state.error}</p>
                                )}
                                <div className={usernameGroupClass}>
                                    <label htmlFor="username">
                                        Email or Username {errors.username && touched.username && (
                                            <>
                                                <span> — </span>
                                                <ErrorMessage
                                                    name="username"
                                                    component="span"
                                                    className="invalid-feedback"
                                                />
                                            </>
                                        )}
                                    </label>
                                    <Field name="username" type="text"/>
                                </div>
                                <div className={passwordGroupClass}>
                                    <label htmlFor="password">
                                        Password {errors.password && touched.password && (
                                            <>
                                                <span> — </span>
                                                <ErrorMessage
                                                    name="password"
                                                    component="span"
                                                    className="invalid-feedback"
                                                />
                                            </>
                                        )}
                                    </label>
                                    <Field name="password" type="password"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit">Submit</button>
                                </div>
                                <div className="hint">
                                    Need an account? Click on this <a href="https://plex.tv">link</a> to
                                    create an account in the Plex site.
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    }
}

export default LoginForm
