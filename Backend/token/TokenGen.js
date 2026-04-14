import jwt from 'jsonwebtoken'

const tokenGen = async (id) => {
    console.log(id, "id")
    try {
        const jsonSecretKey= "123456"
        const token = await jwt.sign({ _id: id},jsonSecretKey)
        const decode = await jwt.verify(token, jsonSecretKey)
        console.log(decode, "decode")
        return {token,decode}
    } catch (error) {
        console.log(error)
    }
}
export default tokenGen