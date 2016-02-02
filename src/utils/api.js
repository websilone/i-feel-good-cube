/**
 *
 * @returns { Promise }
 */
const getTeams = () => {
    const url = `http://10.1.3.159:4567/cube/teams`
    return fetch(url)
        .then((res) => res.json())
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
}

export {
    getTeams,
    getTeam
}
