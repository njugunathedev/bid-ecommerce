import gql from 'graphql-tag';


export const GET_TICKETS = gql`
query getTickets($userId: String!, $limit: Int, $text: String) {
    tickets(userId: $userId, limit: $limit, text: $text){
      id
      userId
      ticketType
      ticketNumber
      ticketStatus
      price
      roundNumber
    }
  }
`;
