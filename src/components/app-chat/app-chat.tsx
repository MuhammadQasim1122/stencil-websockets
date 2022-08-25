import { Component, h, State } from '@stencil/core';
import {w3cwebsocket as W3CWebSocket} from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

@Component({
  tag: 'app-chat',
  styleUrl: 'app-chat.css',
  shadow: true,
})

export class AppChat {
  public sentMessage = '';
  @State() Auth = {
    userName: '',
    isLoggedIn: false,
    messages : []
  }

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
        type: "message",
        msg: value,
        user: this.Auth.userName
    }));
  }
  changeFormValue(controlName:string, value:any) {
    this.Auth = {
      ...this.Auth,
      [controlName]: value.value
    };
    this.sentMessage = value.value;
  }
  componentWillLoad(){
    client.onopen = () => {
      console.log('Websocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer);
      if(dataFromServer.type === "message"){
        this.Auth.messages = [
          ...this.Auth.messages,{
            msg : dataFromServer.msg,
            user: dataFromServer.user
          }]
        }
    }
  }
  changeLoginState(){
    this.Auth.isLoggedIn = true;
    console.log(this.Auth.isLoggedIn);
  }
  render() {
    return (
    <div>
    {this.Auth.isLoggedIn ?
      <div>
      <input onInput = {(e) => this.changeFormValue('messages',e.target)} id = "message" type='text'></input>
      <button onClick={() => this.onButtonClicked(this.sentMessage)}>Click Me</button>
      </div> 
       :
       <div>
        <input onInput = {(e) => this.changeFormValue('userName',e.target)} name = "userName" type='text'></input>
        <button onClick={() => this.changeLoginState()}>Login</button>
      </div>
      }
      </div>
    );
  }
}