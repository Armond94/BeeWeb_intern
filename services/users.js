const bcrypt = require('bcryptjs');

class UserServices {
  constructor (models) {
    this.models = models;
  };

  async getUser (_id) {
    let user = await this.models.users.findOne({_id});

    if (!user) {
      throw new Error('user not found');
    }

    return user;
  };

  // all users that have benefits
  async usersBenefits () {
    let users_id = await this.models.benefitsHystory.distinct('user_id');
    let users = await this.models.users.find({_id: {$in: users_id}});
    if (!users || users.length === 0) {
      throw new Error('!users not found');
    }
    return users;
  }

  async createUser (firstName, lastName, email, role, birthday, phoneNumber, password) {
    let user = await this.models.users.findOne({email});
    if (user) {
      throw new Error('email is already registered');
    }

    let newUser = new this.models.users({firstName, lastName, email, role, birthday, phoneNumber, password});

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        return newUser.save();
      })
    })
  };

  changeUser (obj, _id) {
    const user = this.models.users.findOneAndUpdate(_id, obj, {new: true});
    if (!user) {
      throw new Error('!user doesnt updated')
    }
    return user;
  };

  async deleteUser(_id) {
    const benefits = await this.models.benefits.updateMany({}, {$pull: {users: _id}}, {new: true});
    const user = await this.models.users.findOneAndDelete({_id});
      if (!user) {
        throw new Error('!user not found');
      }
      return user;
  }
};

module.exports = UserServices;
