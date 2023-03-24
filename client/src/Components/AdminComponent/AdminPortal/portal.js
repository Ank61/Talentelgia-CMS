import React from "react";
import { Navigate } from "react-router-dom";
function Portal({ admin }) {

    if (admin == null) {
        return <Navigate to="/admin" replace={true} />
    }

    return (
        <div>
            Successfully reached
        </div>
    )
}
export default Portal;