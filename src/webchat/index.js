import React from 'react';

import {
  useMutation,
} from "@apollo/client";

import Form from './form';
import Conversation from './conversationLoader';

import {
  ADD_WEBCHAT_CONVERSATION,
} from './queries';

import {
  useParams,
} from "react-router-dom";

export default function WebChat() {

  //create switch, if it has webchatID, open chat, if not, ask for data, create convo and relocate to chat, in both cases pass chat id to chat
  //chat gets id and loads conversation

  let {
    webchatId
  } = useParams();

  const [addWebchatConversation] = useMutation(ADD_WEBCHAT_CONVERSATION);

  const [id, setId] = React.useState(webchatId);
  const [saving, setSaving] = React.useState(false);


  return (
    <div className="webchatWindow" id="webchatWindow">
      {!id &&
        <Form
          createHelpdeskRequest={(data) => {
            setSaving(true);
            addWebchatConversation({
              variables: {
                email: data.email,
                fullName: data.name,
                message: data.description,
              },
            }).then((response) => {
              setId(response.data.addWebchatConversation.webchatId);
              setSaving(false);
            }).catch((error) => {
              console.log(error);
              setSaving(false);
            })
          }}
          saving={saving}
        />
      }
      {id &&
        <Conversation
          webchatId={id}
        />
      }
    </div>
  );
}