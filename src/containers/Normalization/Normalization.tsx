import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Title } from '@components'

interface ContentStateProps {
    connection?: string;
}

class Normalization extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        const { connection } = this.props

        return (
            <>
                <Title>{connection} - Normalization</Title>
                <p>Under construction</p>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        connection: state.auth.connection?.name
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Normalization)
