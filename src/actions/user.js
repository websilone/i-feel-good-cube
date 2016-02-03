import { getUser } from 'utils/api'
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from 'constants/user'

const loadUser = (id, loader) => {
    return (dispatch) => {
        loader && dispatch({ type: GET_USER_REQUEST });

        getUser(id)
            .then(json => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: json
                })
        })
    }
}

export {
    loadUser
}
