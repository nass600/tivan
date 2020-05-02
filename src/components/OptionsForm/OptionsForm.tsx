import React from 'react'
import { Formik, Form, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import { AuthConnectionState } from '@reducers/auth'
import Select from 'react-select'

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
    onChange: (connection: AuthConnectionState) => void;
}

const initialState = {
    initialValues: {}
}

type State = Readonly<typeof initialState>;

class OptionsForm extends React.Component<ConnectionSelectorProps, State> {
    state: State = initialState

    componentDidMount (): void {
        this.setState({ initialValues: { connection: this.transformOption(this.props.selectedConnection) } })
    }

    onSubmit = (values: FormikValues): void => {
        this.props.onChange(values.connection.data)
    }

    transformOption = (option: AuthConnectionState): SelectOption => ({
        label: `${option.name} (${option.uri})`,
        value: option.uri,
        data: option
    })

    validationSchema = Yup.object().shape({
        connection: Yup.string()
            .required('Connection is required')
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
                {({ values, submitForm, setFieldValue }): React.ReactNode => (
                    <Form>
                        <div className="form-group col-5">
                            <label htmlFor="connection">Choose a connection</label>
                            <Select
                                name="connection"
                                value={values.connection}
                                options={connections.map(this.transformOption)}
                                onChange={(value: SelectOption): void => {
                                    setFieldValue('connection', value)
                                    submitForm()
                                }}
                            />
                            <ErrorMessage name="connection" component="div" className="invalid-feedback" />
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default OptionsForm
