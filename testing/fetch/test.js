const getPost = () => {
    return fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(posts => JSON.stringify(posts))
        .then(post => console.log(post))
        .catch(err => console.log(err))
}