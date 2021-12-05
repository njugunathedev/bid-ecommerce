import React from 'react';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
const GET_PRODUCT = gql`
    query getProduct($productId: String!) {
        getProduct(id: $productId) {
            id
            title
            totalTickets
            price
            description
            ticket{
                id
                ticketStatus
            }
        }
        
    }
`;
const CLOSE_TICKET = gql`
    mutation closeTicket($ticketId: String!) {
        closeTicket(id: $ticketId) {
            id
            ticketStatus
        }
    }
`;

type productProp = {
    productId: String
};
export default function CloseTicket ({ productId }: productProp) {
    
    const { data, error, loading } = useQuery(GET_PRODUCT, {
        variables: {
            productId
        }
    });
    const [closeTicket] = useMutation(CLOSE_TICKET);
    
    
    async function closeAllTickets(productId) {

        if (loading) return <div>Loading...</div>;
        if (error) {
            console.log(JSON.stringify(error, null, 2));
            return <div>Error! {error.message}</div>;
        }
        try {
            data.getProduct.ticket.map((ticket) => {
                let ticketId = ticket.id;
                closeTicket({
                    variables: {
                        ticketId
                    }
                });
            })
            
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));    
        }


        
        

            
        getWinningTicket();



    }
    function getWinningTicket() {
        const random = Math.floor(Math.random() * 100);
        console.log(random);

    }
    return (
        <div>
            
            <Button size="small" variant="contained" endIcon={<CloseIcon />} color="success" onClick={() => closeAllTickets(productId)}>
                Close Bid
            </Button>
        </div>
    );
    
}

