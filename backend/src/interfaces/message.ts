interface Message {
  _id: string | undefined
  parentId: string | undefined,
  text: string,
  author: string
}

export {
  Message
}