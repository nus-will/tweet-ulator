import { Message } from "../../../interfaces";
import MessageModel from "../../../models/message";

export default async (message: Message) : Promise<Message> => {
  const model = new MessageModel(message);
  await model.save({ validateBeforeSave: false });
  return model;
}