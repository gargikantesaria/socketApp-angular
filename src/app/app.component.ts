import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;
  title = 'app';

  constructor() {
    this.connectSocket();
  }
  connectSocket() {
    console.log('inside the socket');
    const socketUrl = 'http://my_ip:5000';
    this.socket = io(socketUrl);
    console.log(this.socket);
    this.socket.on('connect', () => {
      console.log('socket connected!');
    });

    this.socket.on('SocketFromNode', (data) => {
      console.log('Get data is', data);
      this.socket.emit('DataSuccessful');
    });

    this.socket.on('disconnect',  () => {
    });
  }
}
