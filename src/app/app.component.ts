import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;
  title = 'app';

  constructor(private http: HttpClient) {
    this.connectSocket();
  }
  connectSocket() {
     // To connect with the socket
    const socketUrl = 'http://my_ip:5000';
    this.socket = io(socketUrl);

    this.socket.on('connect', () => {
      // To get emmited data from server
      this.callAPI().subscribe((data) => {
        console.log('data from promise', data);
      }, (err) => {
        console.log('Error is in promise', err);
      });
    });

    // To get the emitted data from the server side
    this.socket.on('SocketFromNode', (data) => {
      console.log('Get data is', data);
      // To emit the data fro client side to server
      this.socket.emit('DataSuccessful');
    });

    this.socket.on('disconnect',  () => {
    });
  }

  callAPI() {
    return this.http.get('http://my_ip:5000/api/testSocket', { observe: 'response' })
    .pipe(map((res) => res.body));
  }
}
