import React, { Component } from 'react'
import { connect } from 'react-redux'

class Error extends Component {
    render () {
        return (
            <div>
                An unknown error occured. Please try again.
            </div>
        )
  }
}

export default connect()(Error)
