export default class GenerateQuery {

  //search user by age, email or firstName,
  static generateUserQuery (req) {
    let query = { deletedAt: null };
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;

    if (req.query.age && req.query.from && req.query.to) {
      let from = `${new Date().getFullYear()-req.query.to}-${new Date().getMonth()+1}-${new Date().getDate()}`;
      let to = `${new Date().getFullYear()-req.query.from}-${new Date().getMonth()+1}-${new Date().getDate()}`;
      query.birthday = {$gte: from, $lte: to};
    }

    if (req.query.firstName) {
      query.firstName = req.query.firstName;
    }

    if (req.query.email) {
      query.email = req.query.email;
    }
    return { query, limit, offset };
  }

  //search by title
  static generateBenefitQuery (req) {
    let query = {
      limit: req.query.limit || DEFAULT_LIMIT ,
      offset: req.query.offset || DEFAULT_OFFSET,
      search: {deletedAt: null}
    }

    if (req.query.title) {
      query.search = {title: req.query.title, deletedAt: null}
    }
    return query;
  }

  // search by created_at
  static generateBenefitHistoryQuery (req) {
    let query = {
      limit: req.query.limit || DEFAULT_LIMIT,
      offset: req.query.offset || DEFAULT_OFFSET,
      search: {deletedAt: null}
    };

    if (req.query.created && req.query.from && req.query.to) {
      query.search = {deletedAt: null, created_at: {$gte: req.query.from, $lte: req.query.to}};
    }
    return query;
  }

  static generateCandidateQuery (req) {
    let query = {
      limit: req.query.limit || DEFAULT_LIMIT,
      offset: req.query.offset || DEFAULT_OFFSET,
      search: {deletedAt: null}
    };

    if (req.query.selected == 'true') {
      query.search = {deletedAt: null, selected: req.query.selected}
    }
    return query;
  }

  static generatePositionQuery (req) {
    let query = {
      limit: req.query.limit || DEFAULT_LIMIT,
      offset: req.query.offset || DEFAULT_OFFSET,
      search: {deletedAt: null}
    };

    if (req.query.title) {
      query.search = {deletedAt: null, title: req.query.title}
    }

    if (req.query.deadline && req.query.from && req.query.to) {
      query.search = {deletedAt: null, deadline: {$gte: req.query.from, $lte: req.query.to}};
    }
    return query;
  }

  static generateTicketQuery (req) {
    let query = {
      limit: req.query.limit || DEFAULT_LIMIT,
      offset: req.query.offset || DEFAULT_OFFSET,
      search: {deletedAt: null}
    };

    if (req.query.confirmed) {
      query.search = {deletedAt: null, confirmed: true};
    }
    return query;
  }

  static generateBenefitHistoriesQuery (req) {
    let query = {
      limit: req.query.limit || DEFAULT_LIMIT,
      offset: req.query.offset || DEFAULT_OFFSET,
      search: {deletedAt: null}
    };
    return query;
  }

};
