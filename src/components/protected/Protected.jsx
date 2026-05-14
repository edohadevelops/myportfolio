import React from 'react'
import { Navigate } from 'react-router-dom'
import * as routes from '../../routes/routes'

const Protected = ({Component}) => {
    const isAuthenticated = true
    if(isAuthenticated)
        return (
            <>
                <Component />
            </>
        )
    return (
        <Navigate to={routes.HOME} />
    )

}

export default Protected
