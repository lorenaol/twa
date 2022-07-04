import { Component, OnInit } from '@angular/core';
import {ChannelService, ChatClientService, StreamI18nService, StreamChatModule} from "stream-chat-angular";
import {StreamChat} from "stream-chat";
import {UserService} from "@app/services/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  constructor(  private chatService: ChatClientService,
                private channelService: ChannelService,
                private streamChat : StreamChatModule,
                private streamI18nService: StreamI18nService,
  private userService: UserService) {
    const apiKey = 'nhqjmqmqgjp8';
    const userId = 'floral-bush-5';
    const userId2 = 'floral-bush-6';
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZmxvcmFsLWJ1c2gtNSJ9.Xj5S9CSBD1D0R09Gxjx6clVoAhakO2GPeUYv-x9xqOk';
    // this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();

  }


  async ngOnInit(): Promise<void> {
    // this.userService.getUsersByEmail(JSON.parse(localStorage.getItem("user")!).userName).subscribe((data:any)=>{
    //   let user = data.body;
      const client = StreamChat.getInstance("v3yqafmr9u5h");
      client.connectUser(
        {
          id: 'anna',
          name: 'anamaria@gmail.com',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        "",
      );
    this.chatService.init('v3yqafmr9u5h', 'anna', '');
    // })
    // const chatClient = StreamChat.getInstance("nhqjmqmqgjp8",{
    //   timeout: 6000,
    // })
    // await chatClient.connectUser(
    //   {
    //     id: 'john',
    //     name: 'John Doe',
    //     image: 'https://getstream.io/random_svg/?name=John',
    //   },
    //   'bG9yZW5hb2xlc2N1MTdAZ21haWwuY29tOmxvcmVuYQ==',
    // );
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    const channel2 = this.chatService.chatClient.channel('messaging', 'altceva', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'altceva',
    });
    await channel2.create();
    this.channelService.init({
      type: 'messaging',
      id: {$eq: 'altceva'},
    });

    // this.channelService.
    // this.channelService.loadMoreChannels()

  }

}
