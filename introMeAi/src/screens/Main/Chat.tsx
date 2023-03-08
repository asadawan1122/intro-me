import React from 'react';
import {Layout, Line} from '../../components';
import MessageContainer from '../../components/MessageContainer';
import Header from '../../components/navbar/Header';
import screens from '../../constants/screens';
import {Screen} from '../../constants/screens/screens';

const ChatScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const onPressChat = (isAI = false, name='Chat AI') => {
    navigation.navigate(Screen.Conversation, {isAI: isAI, name:name});
  };
  return (
    <Layout>
      <Header />
      <Line>Pinned Chat</Line>

      <MessageContainer
        onPress={() => onPressChat(true)}
        title1={'Intro Chat AI'}
        title2={'We see Figma as a digital..'}
      />

      <Line>Recent Chat</Line>

      <MessageContainer
        onPress={() => onPressChat(false,'John Cooper')}
        title1={'John Cooper'}
        title2={'Sure!'}
      />

      <MessageContainer
        onPress={() => onPressChat(false,'Serena Fox')}
        title1={'Serena Fox'}
        title2={'Yes we are available.'}
      />
    </Layout>
  );
};

export default ChatScreen;
