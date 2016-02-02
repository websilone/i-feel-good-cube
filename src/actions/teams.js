// import Immutable from 'immutable'
import { getTeams, getTeam } from 'utils/api'
import { GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS, GET_TEAMS_FAILURE } from 'constants/teams'
import { GET_TEAM_REQUEST, GET_TEAM_SUCCESS } from 'constants/team'

/**
 * Checks if the list of teams has already been fetched
 * @param state Immutable map
 * @returns { boolean }
 */
const shouldLoadTeams = state => !state.get('haveBeenLoaded', false)

/**
 * Looks for the given hero ID in the heroes Immutable state
 * @param heroes Immutable map
 * @param id ID of the hero to display
 * @returns { Map | undefined }
 */
/* const getHeroFromId = (heroes, id) => {
    const hero = heroes.get('heroes', Immutable.List()).find(hero => {
        return hero.get('id') === Number(id)
    }, undefined)

    return hero
} */

/**
 * Redux action creator
 * if heroes list have never been fetched,
 * 1. dispatch a GET_TEAMSREQUEST action
 * 2. calls the API getHeroes() function
 * 3. then dispatch a GET_TEAMSSUCCESS action with the json
 * @returns {Function}
 */
const loadTeams = () => {
    return (dispatch, getState) => {
        if (shouldLoadTeams(getState().teams)) {
            dispatch({ type: GET_TEAMS_REQUEST })

            getTeams().then(json => {
                setTimeout(() => {
                    dispatch({
                        type: GET_TEAMS_SUCCESS,
                        teams: json
                    })
                }, 1000)
            })
            .catch(err => {
                dispatch({
                    type: GET_TEAMS_FAILURE,
                    error: err
                })
            })
        }
    }
}

/**
 * Redux action creator
 * if hero data exist (from global list),
 * dispatch a GET_TEAM_SUCCESS action with the hero data
 * else
 * 1. dispatch a GET_TEAM_REQUEST action
 * 2. calls the API getHero() function
 * 3. then dispatch a GET_TEAM_SUCCESS action with the json
 * @param id
 * @returns {Function}
 */
const loadTeam = (id, loader) => {
    return (dispatch, getState) => {
        loader && dispatch({ type: GET_TEAM_REQUEST });

        getTeam(id)
            .then(json => {
                dispatch({
                    type: GET_TEAM_SUCCESS,
                    team: json
                })
            })
    }
}

export {
    loadTeams,
    loadTeam
}
