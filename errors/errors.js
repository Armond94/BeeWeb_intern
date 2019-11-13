class Errors {
  constructor (TYPES) {
    this.TYPES = {
      USER_NOT_FOUND: `!User not found`,
      PERMISSION: `!you dont have such permission`,
      REGISTERED_EMAIL: `!email is already registered`,
      AUTHENTIFICATION_FAILED: `!authentification failed`,
      PASSWORD_INCORECT: `!password incorect`,
      USER_DESNT_UPDATED: `!user doesnt updated`,
      POSITION_NOT_FOUND: `!position not found`,
      CANDIDATE_NOT_FOUND: `!candidate not found`,
      CANDIDATE_DOESNT_CREATED: `!candidate doesnt created`,
      CANDIDATE_ID_DOESNT_SAVED: `CANDIDATE_ID_DOESNT_SAVED`,
      CANDIDATE_DOESNT_UPDATED: `!candidate doesnt updated`,
      CANDIDATE_DOESNT_DELETED: `!candidate doesnt deleted`,
      BENEFIT_NOT_FOUND: `!benefit not found`,
      BENEFIT_DOESNT_UPDATED: `!benefot doesnt updated`,
      BENEFIT_DOESNT_DELETED: `!benefit doesnt deleted`
    };
  };

  getError (message) {
    return new Error(message);
  }
}

module.exports = Errors;
