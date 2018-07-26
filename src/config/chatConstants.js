import ChatEngineCore from 'chat-engine'

const config = {
  publishKey: 'pub-c-9ebfdf0e-4bea-4f0f-aabe-1b2d2d896994',
  subscribeKey: 'sub-c-aaba2262-8c3b-11e8-a15f-2efe3b6c3d95'
}

export const ChatEngine = ChatEngineCore.create(config)
