export default class Errors {

  static generatePermissionError (res, text=`you dont have such permission`){
    return res.status(400).send(text);
  };

  static generateNotFoundError (res, text) {
    return res.status(404).send(`!${text} not foud`);
  };

  static generateRegistrationError (res, text) {
    return res.status(403).send(`!${text} failed`);
  };

  static generateLoginError (res, text) {
    return res.status(401).send(`!${text} failed`);
  };

  static generateUpdateError (res, text) {
    return res.status(403).send(`update !${text} failed`);
  };

  static generateDeleteError (res, text) {
    return res.status(404).send(`delete ${text} failed`);
  };

  static generateCreateError (res, text) {
    return res.status(403).send(`!create ${text} failed`);
  };

  static generateAddError (res, text) {
    return res.status(400).send(`add ${text} failed`);
  };

  static generateRefreshTokenError(res, text) {
    return res.status(401).send(`${text} failed`);
  }

};
