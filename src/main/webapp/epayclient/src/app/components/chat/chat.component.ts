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
    // const apiKey = 'dz5f4d5kzrue';
    // const userId = 'polished-surf-7';
    // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicG9saXNoZWQtc3VyZi03IiwiZXhwIjoxNjU3MTMyODAzfQ.lfiZBFgdd2AuUI9-PRKMTw0759ah0sZxTp69zc2VnAU';
    // this.chatService.init(apiKey, userId, userToken);
    // this.streamI18nService.setTranslation();
    const apiKey = 'v3yqafmr9u5h';
    const userId = 'dark-dust-4';
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGFyay1kdXN0LTQifQ.LGqnUJeQ0FpiUSXJ2VBtXnEAk9J_Y9buqeppPg3uK-k';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    await channel.create();
    // this.chatService.chatClient.upsertUser({
    //   id: 'hebvricnver',
    // })
    // this.chatService.chatClient.upsertUser({
    //   id: 'polishgT-surf-7',
    // })
    // await channel.addMembers(['hebvricnver'])
    // await channel.addMembers(['polishgT-surf-7'])

    // await this.chatService.chatClient.disconnectUser();
    // await this.chatService.chatClient.disconnectUser();
    const updateResponse = await this.chatService.chatClient.upsertUsers([
      { id: 'userID1', role: 'admin', book: 'dune'},
      { id: 'userID2', role: 'user', book: '1984'},
      { id: 'userID3', role: 'admin', book: 'Fahrenheit 451'}
    ]);
    await channel.addMembers(['userID1', 'userID2']);
      const channel2 = this.chatService.chatClient.channel('messaging', 'altceva', {
        // add as many custom fields as you'd like
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
        name: 'altceva',
      });
      await channel2.create();
    // this.chatService.chatClient.channel('messaging', 'altceva',{
    //   source: "user",
    //   source_detail:{ user_id: 'userID1' },
    //   channel_detail:{ topic: "Plants and Animals", rating: "pg" }
    // })
    this.channelService.init({
      type: 'messaging',
      // id: { $eq: 'talking-about-angular' },
    });


    // await this.chatService.chatClient.disconnectUser();
    //   await this.chatService.chatClient.updateAppSettings({
    //     disable_auth_checks: false,
    //   });
    // await this.chatService.chatClient.connectUser({id:'anna'}, "dshbc");
    // await channel.watch()
    // await this.chatService.chatClient.connectUser('userID1', "jdfnvds")
    // await this.chatService.chatClient.connectAnonymousUser();





  }

  // async ngOnInit(): Promise<void> {
  //   // this.userService.getUsersByEmail(JSON.parse(localStorage.getItem("user")!).userName).subscribe((data:any)=>{
  //   //   let user = data.body;
  //   //   const client = StreamChat.getInstance("v3yqafmr9u5h");
  //   //   client.connectUser(
  //   //     {
  //   //       id: 'jlahey',
  //   //       name: 'Jim Lahey',
  //   //       image: 'https://i.imgur.com/fR9Jz14.png',
  //   //     },
  //   //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2hyaWxsLWdyYXNzLTMifQ.wUGDUVRjK0sFwBOqf9fb4z36HT7O7gqrolMCK3iZrm4",
  //   //   );
  //   // })
  //   // const chatClient = StreamChat.getInstance("nhqjmqmqgjp8",{
  //   //   timeout: 6000,
  //   // })
  //   // await chatClient.connectUser(
  //   //   {
  //   //     id: 'john',
  //   //     name: 'John Doe',
  //   //     image: 'https://getstream.io/random_svg/?name=John',
  //   //   },
  //   //   'bG9yZW5hb2xlc2N1MTdAZ21haWwuY29tOmxvcmVuYQ==',
  //   // );
  //   // const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
  //   //   // add as many custom fields as you'd like
  //   //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  //   //   name: 'Talking about Angular',
  //   // });
  //   // const channel2 = this.chatService.chatClient.channel('messaging', 'altceva', {
  //   //   // add as many custom fields as you'd like
  //   //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  //   //   name: 'altceva',
  //   // });
  //   // await channel2.create();
  //   // this.channelService.init({
  //   //   type: 'messaging',
  //   //   // id: {$eq: 'altceva'},
  //   // });
  //
  //
  //
  //   //*************
  //   // const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
  //   //   // add as many custom fields as you'd like
  //   //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  //   //   name: 'Talking about Angular',
  //   // });
  //   //
  //   // await channel.create().then();
  //   // this.chatService.chatClient.upsertUser({
  //   //   id: 'hebvricnver',
  //   // })
  //   // this.chatService.chatClient.upsertUser({
  //   //   id: 'polishgT-surf-7',
  //   // })
  //   // // await this.chatService.chatClient.updateAppSettings({
  //   // //   disable_auth_checks: false,
  //   // // });
  //   // await channel.addMembers(['hebvricnver'])
  //   // await channel.addMembers(['polishgT-surf-7'])
  //   // this.channelService.init({
  //   //   type: 'messaging',
  //   //   id: { $eq: 'talking-about-angular' },
  //   // });
  //
  //   // await this.chatService.chatClient.disconnectUser();
  //   // this.chatService.chatClient.connectUser({id:'bdfsx'}, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicG9saXNoZ1Qtc3VyZi03IiwiZXhwIjoxNjU3MTMyODAzfQ.lfiZBFgdd2AuUI9-PRKMTw0759ah0sZxTp69zc2VnAU")
  //
  //
  //   //*********************************************
  //   // this.channelService.
  //   // this.channelService.loadMoreChannels()
  //
  // }

}
