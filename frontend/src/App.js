import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ChatBot from 'react-simple-chatbot';

function handleRequest(chat_input){

    axios.post("https://secret-chamber-49228.herokuapp.com/process_chat", {'message': chat_input})
        .then(res => {
            console.log(res.data)
            return String(res.data)
        })

}

const steps = [{
                    id: '1',
                        message: 'Hello World',
                    trigger: '2',
                },
                {
                    id: '2',
                    user: true,
                    trigger: '3',
                },
                {
                    id: '3',
                    message: ({ previousValue, steps }) => handleRequest(previousValue),
                    trigger: '2'
                }]

class App extends Component {
  render() {
    return (
      <div>
        <ChatBot steps={steps} hideHeader={true} width={100}/>
      </div>
    );
  }
}

export default App;
