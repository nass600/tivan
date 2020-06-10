import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { Error } from '@components'
import { MdInsertChart } from 'react-icons/md'

interface ContentStateProps {
    connection?: string;
}

class Forecast extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        return (
            <>
                <Error title="Coming soon" icon={MdInsertChart}>
                    <p>
                        This section will be entirely dedicated to your <strong>hard disk drives</strong>.
                    </p>
                    <p>
                        We will process the information about the usage of your library
                        so we can <strong>help you planning out how to scale it</strong> and notify you
                        when will you <strong>run out of space</strong> or <strong>how
                        much extra capacity</strong> you should buy.
                    </p>
                </Error>
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
