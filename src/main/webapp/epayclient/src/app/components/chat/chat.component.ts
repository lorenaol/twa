import { Component, OnInit } from '@angular/core';
import {ChannelService, ChatClientService, StreamI18nService} from "stream-chat-angular";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(  private chatService: ChatClientService,
                private channelService: ChannelService,
                private streamI18nService: StreamI18nService) {
    const apiKey = 'nhqjmqmqgjp8';
    const userId = 'floral-bush-5';
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZmxvcmFsLWJ1c2gtNSJ9.Xj5S9CSBD1D0R09Gxjx6clVoAhakO2GPeUYv-x9xqOk';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation(); }

  async ngOnInit(): Promise<void> {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: {$eq: 'talking-about-angular'},
    });

  }

}
