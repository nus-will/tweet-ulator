import React from 'react';
import axios from 'axios';
import lodash from 'lodash';
import { useAppSelector, useAppDispatch } from './hooks';
import { setMessages, addMessage } from './reducers/messagesSlice';

// bootstrap && css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

// components
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import { MessagePost } from './components/messages/MessagePost';
import { MessageItem } from './components/messages/MessageItem';

function App() {
  const currentUser = useAppSelector(state => state.user.username);
  const isLogged = useAppSelector(state => state.user.isLogged);
  const messages = useAppSelector(state => state.messages.data);
  const dispatch = useAppDispatch();
  const cloneMessages = lodash.cloneDeep(messages);

  const getMessages = async () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/messages`)
      .then((response) => {
        dispatch(setMessages(response.data.messages));
      })
      .catch((error) => {
        console.log("@error", error)
      })
  };

  const postCreateMessage = async (message: string) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
      author: currentUser,
      text: message
    }).then((response) => {
      dispatch(addMessage(response.data.message))
    }).catch((error) => {
      console.log("@error", error);
    })
  };

  const postReplyMessage = async (message: string, parentId: string) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
      author: currentUser,
      text: message,
      parentId: parentId
    }).then((response) => {
      getMessages();
    }).catch((error) => {
      console.log("@error", error);
    })
  };

  React.useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderMessages = () => {
    return (
      cloneMessages.map((message:any) => <MessageItem
        currentUser={currentUser}
        currentMessage={message}
        parentMessage={null}
        onReplyMessage={
          (message, parentId) => postReplyMessage(message, parentId)
        }
      />)
    )
  }

  return (
    <main>
      <div className="container py-4">
        <Header currentUser={currentUser} isLogged={isLogged}/>
        <h3 className="">Messages:</h3>
        { cloneMessages && renderMessages() }
        { isLogged &&
           <MessagePost onPostMessage={
             (postMessage) => postCreateMessage(postMessage)
           }/>
        }
        <Footer/>
      </div>
    </main>
  );
}

export default App;
