const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ChatSchema = new Schema({
    chat: String,
});

const ChatModel = model('Chat', ChatSchema);

module.exports = ChatModel;