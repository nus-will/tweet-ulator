import * as React from 'react';
import { mathIt } from '../../utils/mathHelper';

type Props = {
  currentUser: string;
  currentMessage: any;
  parentMessage: any;
  onReplyMessage: (message: string, parentId: string) => void;
};

export const MessageItem: React.FC<Props> = props => {
  const [replyMessage, setReplyMessage] = React.useState('');
  const { currentUser, currentMessage, parentMessage, onReplyMessage } = props;
  const isHasChildren = currentMessage?.children?.length > 0;
  const isHasParent = parentMessage !== null;

  let childrenMessages = isHasChildren && currentMessage.children;
  childrenMessages = childrenMessages && childrenMessages.sort(function(a: any,b: any): any{
    return (Date.parse(a.createdAt) - Date.parse(b.createdAt));
  });

  const lastChildrentMessage = parentMessage?.children[parentMessage?.children?.length - 1]
  const canReplyIfLastChild = (lastChildrentMessage && lastChildrentMessage._id === currentMessage._id)
  const canReply = currentUser && currentUser !== currentMessage.author
    && (isHasChildren ? canReplyIfLastChild : (isHasParent ? canReplyIfLastChild : true))

  const allMaths = parentMessage?.children?.map((message: any) => message.text);
  const childIndex = parentMessage?.children?.findIndex((message: any) => message._id === currentMessage._id);
  const allMathsForChild = allMaths?.slice(0, childIndex + 1)

  let messageResult = parseFloat(parentMessage?.text);
  allMathsForChild?.forEach((operatorNumber: string) => {
    messageResult = mathIt(operatorNumber[0], messageResult.toString(), operatorNumber.substring(1))
  })

  const handleSubmitReply = () => {
    onReplyMessage(replyMessage, currentMessage._id);
  };

  return (
    <div className='mb-3'>
      <div className={`card ${isHasParent ? 'ms-5' : ''}`}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              Author: { currentMessage.author }
            </div>
            <div className="flex-grow-1 ms-3 text-center">
              Message: { currentMessage.text }
            </div>
            <div className="flex-grow-1 ms-3">
              {!isNaN(messageResult) ? `Result: ${messageResult}` : ''}
            </div>
            { canReply && (
              <>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal${currentMessage._id}`}>
                  Reply
                </button>

                <div className="modal fade" id={`modal${currentMessage._id}`} tabIndex={-1} aria-labelledby={`modal${currentMessage._id}-lable`} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`modal${currentMessage._id}-lable`}>Reply message: {currentMessage.text}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <input type="text" className="form-control" id="inlineFormInputGroupMessage" placeholder="Operator and number (eg: +10)" onChange={(e) => setReplyMessage(e.target.value)}/>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => {handleSubmitReply()}}>Post</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) }
          </div>
        </div>
      </div>

      {
        isHasChildren && childrenMessages.map((message:any) => <MessageItem
          currentUser={currentUser}
          currentMessage={message}
          parentMessage={currentMessage}
          onReplyMessage={
            onReplyMessage
          }
        />)
      }
    </div>
  );
};