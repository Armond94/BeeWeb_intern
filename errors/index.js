let permission = `!you dont have such permission`;
let notFound = `not found`;

class Errors {
  constructor (TYPES) {
    this.TYPES = {
      // USER_NOT_FOUND: `!User not found`,
      // PERMISSION: `!you dont have such permission`,
      REGISTERED_EMAIL: `!email is already registered`,
      REGISTERATION_FAILD: `!registration failed`,
      AUTHENTIFICATION_FAILED: `!authentification failed`,
      PASSWORD_INCORECT: `!password incorect`,
      USER_DOESNT_UPDATED: `!user doesnt updated`,
      POSITION_NOT_FOUND: `!position not found`,
      CANDIDATE_NOT_FOUND: `!candidate not found`,
      CANDIDATE_DOESNT_CREATED: `!candidate doesnt created`,
      CANDIDATE_ID_DOESNT_SAVED: `CANDIDATE_ID_DOESNT_SAVED`,
      CANDIDATE_DOESNT_UPDATED: `!candidate doesnt updated`,
      CANDIDATE_DOESNT_DELETED: `!candidate doesnt deleted`,
      BENEFIT_NOT_FOUND: `!benefit not found`,
      BENEFIT_DOESNT_UPDATED: `!benefot doesnt updated`,
      BENEFIT_DOESNT_DELETED: `!benefit doesnt deleted`,
      TICKET_NOT_FOUND: `!ticket not found`,
      TICKET_DOESNT_UPDATED: `!ticket doesnt updated`,
      TICKET_DOESNT_DELETED: `!ticket doesnt deleted`
    };
  };

  getError (message) {
    return new Error(message);
  }

  static generatePermissionError (res, text=`you dont have such permission`){
    return res.status(409).send(text);
  };

  static generateNotFoundError (res, text) {
    return res.status(404).send(`!${text} not foud`);
  };

  static generateRegisteredEmailError (res, text) {
    if (!text) {
      return res.status(400).send(`!authentification faild`);
    }
    return res.status(400).send(`!email is already registered`);
  };


}

module.exports = Errors;
