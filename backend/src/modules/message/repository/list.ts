import { Message } from "../../../interfaces";
import MessageModel from "../../../models/message";

export default async () : Promise<Message[]> => {
  // No pagination in this demo due to limited time
  return await MessageModel.aggregate([
    {$match: {parentId: undefined}},
    {$graphLookup: {
      from: 'messages',
      startWith: "$_id",
      connectFromField: '_id',
      connectToField: 'parentId',
      as: 'children'
    }}
  ])
}