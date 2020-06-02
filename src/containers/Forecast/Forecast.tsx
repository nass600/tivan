import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Title, Section, Row, Column } from '@components'

interface ContentStateProps {
    connection?: string;
}

class Forecast extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        const { connection } = this.props

        return (
            <>
                <Title>{connection} - Forecast</Title>
                <Section>
                    <Row>
                        <Column>
                            <p>
                                We are still working on this section. Hopefully we will bring
                                forecast-related information about the usage of your library
                                so you can plan out the amount of space you need in your Plex
                                Media Server or how many HDD you should buy and when
                            </p>
                        </Column>
                    </Row>
                </Section>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        connection: state.auth.connection?.name
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Forecast)
