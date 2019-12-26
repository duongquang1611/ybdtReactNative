export const getMonday = date => {
  date = new Date(date);
  var day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

export const addDate = (date, add) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + add);
};

export const checkTimeCanBook = (propsDate, hour, minute) => {
  let date = new Date();
  let convertDate = new Date(propsDate);
  if (
    new Date(convertDate.getFullYear(), convertDate.getMonth(), convertDate.getDate(), 0, 0, 0) >
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  ) {
    return false;
  } else if (date.getHours() > hour) {
    return true;
  } else if (date.getHours() == hour && date.getMinutes() > minute + 30) {
    return true;
  }
  return false;
};
