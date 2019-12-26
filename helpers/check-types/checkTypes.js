export default (checkTypes = {
  checkObject: value => {
    return value && typeof value === "object" && value.constructor === Object;
  }
});
