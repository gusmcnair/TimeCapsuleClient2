let apiCall = 'https://timecapsule0220.herokuapp.com/api/capsules'
let AUTH_TOKEN = 'bd990ba4-228b-11ea-978f-2e728ce88125'

const ApiService = {

    getCapsules() {
        return fetch(`${apiCall}?auth=${AUTH_TOKEN}`)
        .then(capsules => {
            (!capsules.ok)
                ? capsules.json().then(e => Promise.reject(e))
                : capsules.json()
        })
    },

    getCapsulesById(id) {
        return fetch(`${apiCall}/${id}?auth=${AUTH_TOKEN}`)
            .then(capsule => {
                (!capsule.ok)
                    ? capsule.json().then(e => Promise.reject(e))
                    : capsule.json()
            })
    },

    deleteCapsules(id) {
        return fetch(`${apiCall}/${id}?auth=${AUTH_TOKEN}`, {
            method: 'DELETE'
        })
            .then(res => {
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    },

    postCapsules(newCapsule) {
        return fetch(`${apiCall}?auth=${AUTH_TOKEN}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCapsule)
        })
            .then(capsule => {
                (!capsule.ok)
                    ? capsule.json().then(e => Promise.reject(e))
                    : capsule.json()
            })
    }


}

export default ApiService