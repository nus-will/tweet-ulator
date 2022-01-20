import React from 'react';
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// components
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import { MessagePost } from './components/messages/MessagePost';
import { MessageItem } from './components/messages/MessageItem';

import axios from 'axios';

import { useAppSelector } from './hooks';

function App() {
  const currentUser = useAppSelector(state => state.user.username);
  const isLogged = useAppSelector(state => state.user.isLogged);
  const [messages, setMessages] = React.useState([]);

  const getMessages = async () => {
    console.log('getMessages')
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/messages`)
      .then(function(response){
        console.log(response);
        setMessages(response.data.messages);
      })
      .catch(function(error){
        console.log("@error", error)
      })
  };

  const postCreateMessage = async (message: string) => {
    console.log('postCreateMessage')
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/messages/create-first-message`, {
      author: currentUser,
      text: message
    }).then(function(response){
      console.log(response);
      getMessages();
    }).catch(function(error){
      console.log("@error", error);
    })
  };

  const postReplyMessage = async (message: string, parentId: string) => {
    console.log('postReplyMessage')
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
      author: currentUser,
      text: message,
      parentId: parentId
    }).then(function(response){
      console.log(response);
      getMessages();
    }).catch(function(error){
      console.log("@error", error);
    })
  };

  React.useEffect(() => {
    getMessages();
  }, [])

  const renderMessages = () => {
    return (
      messages.map((message:any) => <MessageItem
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
        { messages && renderMessages() }
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
