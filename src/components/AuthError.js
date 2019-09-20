import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

class AuthError extends Component {
    render(){
        return (
            <DocumentTitle title="Permission Error">
                <div>Permission Error</div>
            </DocumentTitle>
        )
    }
}

export default AuthError