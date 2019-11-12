class Errors {
  constructor (TYPES) {
    this.TYPES = {
      USER_NOT_FOUND: `!User not found`,
      PERMISSION: `!you dont have such permission`,
      REGISTERED_EMAIL: `!email is already registered`,
      AUTHENTIFICATION_FAILED: `!authentification failed`,
      PASSWORD_INCORECT: `!password incorect`
    };
  };

  getError (message) {
    return new Error(message);
  }
}

export default Errors;
