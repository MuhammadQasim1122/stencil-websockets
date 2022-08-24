import { Component, h } from '@stencil/core';
import {w3cwebsocket as W3CWebSocket} from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

@Component({
  tag: 'app-chat',
  styleUrl: 'app-chat.css',
  shadow: true,
})

export class AppChat {

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
        type: "message",
        msg: value
    }));
  }

  componentWillLoad(){
    client.onopen = () => {
      console.log('Websocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer);
    }
  }
  render() {
    return (
    <div>
      <button onClick={() => this.onButtonClicked("Hello!")}>Click Me</button>
    </div>
    );
  }

}
