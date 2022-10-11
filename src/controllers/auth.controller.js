import STATUS_CODE from "../enums/statusCode.enum.js"


async function createUser(req, res) {

    try {
        
    } catch (error) {
        console.error(error)
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

async function loginUser(req, res) {

    try {
        
    } catch (error) {
        console.error(error)
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

export {createUser, loginUser}