const mapSelectBook = book => {
  return new Promise(async (resolve, reject) => {
    const dict = {};
    const keys = [];

    book.map(m => {
      if (dict[m.tourID]) {
        dict[m.tourID].push({
          id: m._id,
          userID: m.userID,
          userName: m.userName,
          amountBooking: m.amountBooking,
          bookingDate: m.bookingDate,
          GET: "/api/tours/booking/" + m._id
        });
      } else {
        keys.push({
          keys: m.tourID,
          name: m.tourName
        });
        dict[m.tourID] = [];
        dict[m.tourID].push({
          id: m._id,
          userID: m.userID,
          userName: m.userName,
          amountBooking: m.amountBooking,
          bookingDate: m.bookingDate,
          GET: "/api/tours/booking/" + m._id
        });
      }
    });

    const result = {
      count: book.length,
      tours: keys.map(k => {
        return {
          tour: k.name,
          tourId: k.keys,
          bookings: dict[k.keys]
        };
      })
    };
    resolve(result);
  });
};

module.exports = mapSelectBook;
