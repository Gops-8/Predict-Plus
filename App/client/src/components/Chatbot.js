import React,{Component} from 'react';
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';

class Chatbot extends Component {
    
   
    handleNewUserMessage =  (newMessage) => {
      console.log(`New message incomig! ${newMessage}`);
      const obj = {"messager":newMessage};
      console.log(obj.messager);
       fetch('/chatbot',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify
        (obj)
    }).then(function(response){return response.json();}).then(function(data) {
        console.log(data);
        addResponseMessage(data.error);
    })
    
      
    }
   
    render() {
      return (
        <div className="Chatbot">
          <Chat
            handleNewUserMessage={this.handleNewUserMessage}
            title="Predict Plus bot"
          />
        </div>
      );
    }
  }
   
  export default Chatbot;