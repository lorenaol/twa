import { Component, OnInit } from '@angular/core';
import {StreamChat} from "stream-chat";
import {ChannelService, ChatClientService, StreamChatModule, StreamI18nService} from "stream-chat-angular";

@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.css']
})
export class Chat2Component implements OnInit {

  constructor( private chatService: ChatClientService,
               private channelService: ChannelService,
               private streamChat : StreamChatModule,
               private streamI18nService: StreamI18nService) {
    const apiKey = 'v3yqafmr9u5h';
    const userId = 'dark-dust-4';
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYW5uYSJ9.7FBzCpLARkxm8giQbmIRo6yIJjQ2DG68VQdZlFQdfqI';
    this.chatService.init(apiKey,  'anna', userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit(): Promise<void> {
    const channel = this.chatService.chatClient.channel('messaging', 'ana', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/800px-Facebook_Messenger_logo_2020.svg.png',
      name: 'ana',
    });
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      // id: { $eq: 'talking-about-angular' },
    });
    // const client = StreamChat.getInstance("v3yqafmr9u5h");
    // const channel = client.channel('messaging', 'talking-about-angular', {
    //   // add as many custom fields as you'd like
    //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
    //   name: 'Talking about Angular',
    // });
    // await channel.create();
    // await channel.connectAnonymousUser();

     // this.ChanelService.init('v3yqafmr9u5h', {id: 'anna'}, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYW5uYSJ9.7FBzCpLARkxm8giQbmIRo6yIJjQ2DG68VQdZlFQdfqI")
  }

}
