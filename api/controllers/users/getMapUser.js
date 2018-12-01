const getMapUser = users => {
  return new Promise((resolve, reject) => {
    const result = {
      count: users.length,
      users: users.map(u => {
        return u.toProfileJSON();
      })
    };
    resolve(result);
  });
};

module.exports = getMapUser;
