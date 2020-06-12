import React from 'react'
import { Formik, Form, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import { AuthConnectionState } from '@reducers/auth'
import { Theme } from 'react-select'
import { variables } from '@styles'
import { FormGroup, FieldLabel, FieldSelect, FieldError, Button } from '@components'

export interface Connection {
    connection: SelectOption;
}

interface SelectOption {
    label: string;
    value: string;
    data: AuthConnectionState;
}

interface ConnectionSelectorProps {
    selectedConnection: AuthConnectionState;
    connections: AuthConnectionState[];
    onSubmit: (connection: AuthConnectionState) => void;
}

const initialState = {
    initialValues: {}
}

type State = Readonly<typeof initialState>;

class SettingsForm extends React.Component<ConnectionSelectorProps, State> {
    state: State = initialState

    componentDidMount (): void {
        this.setState({ initialValues: { connection: this.transformOption(this.props.selectedConnection) } })
    }

    onSubmit = (values: FormikValues): void => {
        this.props.onSubmit(values.connection.data)
    }

    transformOption = (option: AuthConnectionState): SelectOption => ({
        label: `${option.name} (${option.uri})`,
        value: option.uri,
        data: option
    })

    validationSchema = Yup.object().shape({
        connection: Yup.string().required('Connection is required')
    })

    render (): React.ReactNode {
        const { connections } = this.props

        return (
            <Formik
                initialValues={this.state.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue }): React.ReactNode => (
                    <Form>
                        <FormGroup>
                            <FieldLabel htmlFor="connection">
                                Choose a connection to your Plex Media
                                Server {errors.connection && touched.connection && (
                                    <FieldError>
                                        <span> — </span>
                                        <ErrorMessage name="connection" component="span"/>
                                    </FieldError>
                                )}
                            </FieldLabel>
                            <FieldSelect
                                name="connection"
                                value={values.connection}
                                options={connections.map(this.transformOption)}
                                onChange={(value: SelectOption): void => setFieldValue('connection', value)}
                                theme={(theme: Theme): Theme => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary50: variables.colors.orange60,
                                        primary25: variables.colors.orange20,
                                        primary: variables.colors.orange60
                                    },
                                    spacing: {
                                        ...theme.spacing,
                                        controlHeight: 50
                                    }
                                })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button block type="submit">Save</Button>
                        </FormGroup>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default SettingsForm
