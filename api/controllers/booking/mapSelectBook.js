const mapSelectBook = book => {
  return new Promise(async (resolve, reject) => {
    const dict = {};
    const keys = [];

    book.map(m => {
      if (dict[m.tourID]) {
        dict[m.tourID].push({
          userID: m.userID,
          userName: m.userName,
          amountBooking: m.amountBooking,
          bookingDate: m.bookingDate
        });
      } else {
        keys.push({
          keys: m.tourID,
          name: m.tourName
        });
        dict[m.tourID] = [];
        dict[m.tourID].push({
          userID: m.userID,
          userName: m.userName,
          amountBooking: m.amountBooking,
          bookingDate: m.bookingDate
        });
      }
    });

    const result = {
      count: book.length,
      tours: keys.map(k => {
        return {
          tour: k.name,
          tour: k.keys,
          bookings: dict[k.keys]
        };
      })
    };
    resolve(result);
  });
};

module.exports = mapSelectBook;
