
---

**UI -> PlayerController -> Server's ChatManager Logic Control -> Valid Recipients -> Player's Local Chat Log -> UI Rebuild**

---

## Chat Manager
The Chat Manager is a server authoritative actor that handles incoming messages, chat rules, and math for the chat system. It is authoritative in the sense that it then relays whether or not a local player should "hear" chat messages *before* passing them to the client that should hear them.

It owns the **ChannelConfigs** which is a Map, **EChatChannel -> ST_ChannelConfig**. It defines: HeardRadius, Display Color, spectator and other flags, and has a placeholder for icons for potential future use.

| Channel      | HeardRadius(uu) | Color                 | Spectator Only? | Implemented |
| ------------ | --------------- | --------------------- | --------------- | ----------- |
| Whisper      | 150             | Purple<br>993DB5FF    | N               | Y           |
| Say          | 700             | Gray<br>B4B3E9FF      | N               | Y           |
| Yell         | 1750            | Off Red <br>F83B3FFF  | N               | Y           |
| PlayerEmote  | 700             | Gray<br>B4B3E9FF      | N               | Y           |
| LocalOOC     | 3500            | Cyan<br>50B1DCFF      | N               | Y           |
| GlobalOOC    | 0               | Dark Blue<br>4232E3FF | N               | Y           |
| Announcement | 0               | Admin Red<br>AC0718FF | N               | N           |
| DeadChat     | 0               | ?                     | Y               | N           |


It receives a **ST_ChatMessage** from the PlayerControllers and handles it according to chat rules that have been set up, mainly about audibility checks via distance and whether or not the defined channel type in the Struct is a global channel or not.

The eligible listener recipients are then given the processed chat message back via a **Client_RecieveChatMessage** cast to their PlayerConts.

The main function that processes this is the **ProcessChatMessage**(SpeakerController, ChatMessage).


---

## BP_PC_Player
The chat related aspects of the Player Controller mainly have to do with sending chats, controlling chat channel focus, and storing the local chat log of heard messages.

The **LocalChatLog** is an array of ST_ChatMessages that have been added to from the chat manager.

**Server_SendChatMessage**(MessageText, Channel) is a server RPC that builds the ST_ChatMessage struct based off of the widget input text owned by the PlayerCont. This is the "sending to chat manager" function.

**Client_RecieveChatMEssage**(ChatMessage) is the corresponding intake. It receives the chat message struct that is flagged as heard by the chat manager for storage into the LocalChatLog.


**UpdateChatWidgetLog**() Calls an update after every append to the LocalChatLog.

**CycleChatChannel**() is used for cycling through the currently active chat channel enum.

**GetChannelColor**(Channel) reads the channel color that is set/managed by the chat channel configs in ChatManager.

---

## BP_PS_Player (PlayerState)
Replicated identity for now. Not a whole lot done here for chat purposes.

Fulfills **SenderName**
Also has the spectator bool flag stored here for ghost mode/spectators.


---


# Widgets
## WBP_Chat
The main chat UI.

**TypedChatPreview** is the main method of input text. It's focusable through an Input Action. It's monitored until enter is pressed and then it is passed for pre-processing before being thrown to the chat manager.

**ChatScrollBox** stores a bunch of below WBP_ChatLine.

**WBP_ChatLine**  is the rich text blocks that are formed through SetLineData(ChatMessage).

**FocusChatBox()** sets the kb/user focus onto the input method.
**UnfocusChatBox**() Read the tin.
**IsChatBoxFocused**() ^^

SetLineData(ChatMessage) is the main method of forming chatlines. ST_ChatMessages that were properly handled by the chat manager and relayed to the hearer. It properly sets the correct spoken verb (whispers, says, yells, etc.) where applicable, applies RP name, formatting, etc and forms it into a singular chatline RTB that is stored inside of the the ChatSB. It also interprets "decorators" like asterisks into bolded and slashes into italicized speech, instead of using rich markup.

**FormatMEssageForRichText**(nMessage)  (todo)
Parses inline markup into RichText tags.


# Data

EChatChannel (Enum)
Defines the chat channels that exist. Values are mapped in ChatManager with ST_ChannelConfig(Struct).

ST_ChatMessage (Struct)
SenderName, Message, Channel, OriginLocation, SenderPlayId, Timestamp, bFromServer

ST_ChannelConfig/ (Struct)
HeardRadius, Color, Icon, Flags (Spectator).


#gamedev #subsystem 