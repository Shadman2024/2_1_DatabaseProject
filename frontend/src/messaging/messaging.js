import React, { useState, useEffect,useRef  } from 'react';
import styles from '../messaging/messaging.module.css';

const Messaging = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const currentUserID = localStorage.getItem('userId'); // Assuming you store the current user's ID here
    const conversationRef = useRef(null);
    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('http://localhost:5000/messages/contacts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            }
        };
        fetchContacts();
    }, []);

    useEffect(() => {
        if (selectedContactId) {
            const intervalId = setInterval(() => {
                fetchMessagesForContact(selectedContactId);
            }, 100); // Refresh every 5 seconds, adjust as needed

            return () => clearInterval(intervalId); // Cleanup on unmount or contact change
        }
    }, [selectedContactId]); // Dependency array ensures effect runs when selectedContactId changes

    useEffect(() => {
        // Scroll to the bottom of the conversation whenever messages update
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [messages, selectedContactId]); 

    const fetchMessagesForContact = async (id) => {
        const response = await fetch(`http://localhost:5000/messages/conversation/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.token,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setMessages(prevMessages => ({
                ...prevMessages, [id]: data.map(msg => ({
                    ...msg,
                    alignment: msg.sender_role === 2 ? 'right' : 'left'
                }))
            }));
        }
    };

    const selectContact = (id) => {
        setSelectedContactId(id);
        fetchMessagesForContact(id);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        // Prepare the message payload according to the server's expected format
        const messageToSend = {
            user_id_sender: currentUserID, // The ID of the user sending the message
            user_id_receiver: selectedContactId, // The ID of the user receiving the message
            message: newMessage, // The actual message text
        };

        // Send the new message to the server
        try {
            const response = await fetch('http://localhost:5000/messages/send', { // Adjusted endpoint to match the server's route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.token, // Assuming authentication is required
                },
                body: JSON.stringify(messageToSend),
            });

            if (response.ok) {
                // The message was sent successfully, now add it to the UI
                const addedMessage = await response.json(); // Assuming the server returns the inserted message

                const updatedMessage = {
                    id: addedMessage.message_id, // Use the ID from the server response
                    message: addedMessage.message,
                    sender_role: 2, // Assuming messages sent via this function are always from the current user
                    alignment: 'right' // Directly set alignment for newly sent messages
                };

                const updatedMessages = {
                    ...messages,
                    [selectedContactId]: [...(messages[selectedContactId] || []), updatedMessage]
                };

                setMessages(updatedMessages);
                setNewMessage('');
            } else {
                console.error('Failed to send message');
                // Handle failure (e.g., by showing an error message)
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error (e.g., by showing an error message)
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.contactsList}>
                {contacts.map((contact) => (
                    <div
                        key={contact.user_id}
                        className={styles.contact}
                        onClick={() => selectContact(contact.user_id)}
                    >
                        {contact.last_name}
                    </div>
                ))}
            </div>
            <div className={styles.whitecontainer}>
                <div className={styles.conversation} ref={conversationRef}>
                    {selectedContactId && messages[selectedContactId] && messages[selectedContactId].map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${styles[msg.alignment]}`}
                        >
                            {msg.message}
                        </div>
                    ))}
                    {selectedContactId && (
                        <div className={styles.messageInput}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className={styles.input}
                            />
                            <button onClick={handleSendMessage} className={styles.animated_button}>Send</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messaging;
