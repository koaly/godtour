const getStatus = (status) => {
    if (status === 2) {
        return "Admin"
    } else if (status === 1) {
        return "Tour Operation"
    } else {
        return "User"
    }
}
export default getStatus