import React from 'react'
import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'

export interface Login {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}

class LoginForm extends React.Component<LoginFormProps, {}> {
    initialValues: Login = { username: '', password: '' }

    onSubmit = (values: FormikValues): void => {
        this.props.onSubmit(values.username, values.password)
    }

    validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username or Email is required'),
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
                    {({ errors, touched }): React.ReactNode => (
                        <Form>
                            <div className="form-group col-5">
                                <label htmlFor="username">Username or Password</label>
                                <Field
                                    name="username"
                                    type="text"
                                    className={
                                        'form-control' + (errors.username && touched.username ? ' is-invalid' : '')
                                    }
                                />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={
                                        'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                                    }
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <button type="submit">Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default LoginForm
