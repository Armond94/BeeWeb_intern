class Errors {

  // const TYPES = {
  //   USER_NOT_FOUND: `!User not found`,
  //   PERMISSION: `!you dont have such permission`
  // };

  constructor () { }

  getError (message) {
    return new Error(message);
  }
}

export default Errors ;
