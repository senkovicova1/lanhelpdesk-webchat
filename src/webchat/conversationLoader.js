import React from 'react';
import {
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import Conversation from './conversation';
import Loading from 'components/loading';
import {
  ADD_WEBCHAT_MESSAGE,
  GET_USER_CONVERSATION,
  WEBCHAT_MESSAGES_SUBSCRIPTION,
} from './queries';

export default function ConversationContainer(props) {
  const {
    closeWebchat,
    webchatId,
  } = props;

  const [addWebchatMessage] = useMutation(ADD_WEBCHAT_MESSAGE);
  const {
    data: conversationData,
    loading: conversationLoading,
    refetch: conversationRefetch,
  } = useQuery(GET_USER_CONVERSATION, {
    variables: {
      webchatId,
    },
    fetchPolicy: 'network-only'
  });

  useSubscription(WEBCHAT_MESSAGES_SUBSCRIPTION, {
    variables: {
      webchatId,
    },
    onData: () => {
      conversationRefetch();
    }
  });

  if (conversationLoading) {
    return <Loading />;
  }

  const {
    messages,
    ...conversation
  } = conversationData.userConversation;

  return (
    <div>
      <Conversation
        conversation={conversation}
        messages={messages}
        sendMessage={addWebchatMessage}
        closeWebchat={closeWebchat}
        webchatId={webchatId}
      />
    </div>
  )
}