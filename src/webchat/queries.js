import {
  gql
} from '@apollo/client';

export const GET_USER_CONVERSATION = gql`
query userConversation($webchatId: String!) {
  userConversation (
    webchatId: $webchatId
  ) {
    active
    read
    email
    fullName
    messages{
      id
      createdAt
      fromCustomer
      read
      message
    }
  }
}
`;

export const ADD_WEBCHAT_CONVERSATION = gql`
mutation addWebchatConversation(
  $email: String!
  $fullName: String!
  $message: String!
) {
  addWebchatConversation(
    email: $email
    fullName: $fullName
    message: $message
  ){
    active
    read
    email
    fullName
    webchatId
    messages{
      id
      createdAt
      fromCustomer
      read
      message
    }
  }
}
`;

export const ADD_WEBCHAT_MESSAGE = gql`
mutation userAddWebchatMessage(
  $message: String!
  $webchatId: String!
) {
  userAddWebchatMessage(
    message: $message
    webchatId: $webchatId
  ){
    id
    createdAt
    fromCustomer
    read
    message
  }
}
`;

export const WEBCHAT_MESSAGES_SUBSCRIPTION = gql`
subscription webchatMessagesSubscription ($webchatId: String) {
  webchatMessagesSubscription( webchatId: $webchatId ){
      id
      createdAt
      fromCustomer
      read
      message
  }
}
`;