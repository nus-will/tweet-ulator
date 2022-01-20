import { Message } from "../../../interfaces";
import MessageModel from "../../../models/message";

export default async (message: Message) : Promise<Message> => {
  const model = new MessageModel(message);
  if (model.parentId) {
    await model.save();
  } else {
    if (/^\d+$/.test(model.text)) {
      await model.save({ validateBeforeSave: false });
    }
  }
  return model;
}