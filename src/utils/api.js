/* import teams from '../dummies/teams'
import team from '../dummies/pepita' */

/**
 *
 * @returns { Promise }
 */
const getTeams = () => {
    const url = `http://10.1.3.159:4567/cube/teams`
    return fetch(url)
        .then((res) => res.json())

    // return Promise.resolve(teams)
}

/**
 *
 * @param id
 * @returns { Promise }
 */
const getTeam = id => {
    const url = `http://10.1.3.159:4567/cube/teams/${id}`
    return fetch(url)
        .then((res) => res.json())

    // return Promise.resolve(team)
}

const sendWizz = id => {
    return Promise.resolve()
}

export {
    getTeams,
    getTeam,
    sendWizz
}
