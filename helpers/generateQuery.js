export default class GenerateQuery {

  //user search by age,
  static generateUserQuery (req) {
    let query = {
      limit: req.query.limit,
      offset: req.query.offset
    }
    if (!req.query.limit || !req.query.offset) {
      query.limit = 10;
      query.offset = 0;
    };
    if (req.query.age && req.query.from && req.query.to) {
      let from = `${new Date().getFullYear()-req.query.to}-${new Date().getMonth()+1}-${new Date().getDate()}`;
      let to = `${new Date().getFullYear()-req.query.from}-${new Date().getMonth()+1}-${new Date().getDate()}`;
      query.search = {deletedAt: null, birthday: {$gte: from, $lte: to}};
    } else {
      query.search = {deletedAt: null};
    };
    return query;
  };

  //search by title
  static generateBenefitQuery (req) {
    let query = {
      limit: req.query.limit,
      offset: req.query.offset
    }
    if (!req.query.limit || !req.query.offset) {
      query.limit = 10;
      query.offset = 0;
    };
    if (req.query.title) {
      query.search = {title: req.query.title}
    } else {
      query.search = {};
    }
    return query;
  };

  // search by created_at
  static generateBenefitHistoryQuery (req) {
    let query = {
      limit: req.query.limit,
      offset: req.query.offset
    };

    if (!req.query.limit || !req.query.offset) {
      query.limit = 10;
      query.offset = 0;
    };

    if (req.query.created && req.query.from && req.query.to) {
      query.search = {created_at: {$gte: req.query.from, $lte: req.query.to}};
    } else {
      query.search = {};
    };
    return query;
  };

  static generateCandidateQuery (req) {
    let query = {
      limit: req.query.limit,
      offset: req.query.offset
    };

    if (!req.query.limit || !req.query.offset) {
      query.limit = 10;
      query.offset = 0;
    };

    if (req.query.selected == 'true') {
      query.search = {selected: req.query.selected}
    } else {
      query.search = {};
    }
    return query;
  };

  static generatePositionQuery (req) {
    let query = {
      limit: req.query.limit,
      offset: req.query.offset
    };

    if (!req.query.limit || !req.query.offset) {
      query.limit = 10;
      query.offset = 0;
    };

    if (req.query.title) {
      query.search = {title: req.query.title}
    }

    if (req.query.deadline && req.query.from && req.query.to) {
      query.search = {deadline: {$gte: req.query.from, $lte: req.query.to}};
    }

    if (!query.search) {
      query.search = {};
    }
    return query;
  };

  static generateTicketQuery (req) {
    let query = {
      limit: req.query.limit,
      offset: req.query.offset
    };

    if (!req.query.limit || !req.query.offset) {
      query.limit = 10;
      query.offset = 0;
    };

    if (req.query.confirmed) {
      query.search = {confirmed: true};
    }

    if (!query.search) {
      query.search = {};
    }
    return query;
  };

};
