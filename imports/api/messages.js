import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find();
  });
  Meteor.publish('all_users', function getUsers(){
    return Meteor.users.find({});
  });
}

Meteor.methods({
  'messages.insert'(text, recipient) {
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      text,
      createdAt: new Date(),
      author: {
        id: this.userId,
        username: Meteor.users.findOne(this.userId).username,
      },
      recipient: recipient,
    });
  },
});
