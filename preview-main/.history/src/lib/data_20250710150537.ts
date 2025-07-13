export async function getData(id: string) {
    try {
        const res = await fetch(`http://localhost:8089/lowCode/view/${id}`)
        return res.json()
    } catch (err) {
        throw new Error('页面出错请重试')
    }
}