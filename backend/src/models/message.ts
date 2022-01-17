import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId
    },
    text: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) : boolean => {
          return /^[\+|\-|\*|\/]\d+$/.test(value);
        },
        message: () => `The message needs to be in form of an operator and an integer. E.g: +10`
      }
    },
    author: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('messages', messageSchema);

export default MessageModel;