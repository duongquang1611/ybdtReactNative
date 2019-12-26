const sortTwoDate = (date1, date2) => {
    return Date.parse(date2) - Date.parse(date1);
};

export { sortTwoDate };
