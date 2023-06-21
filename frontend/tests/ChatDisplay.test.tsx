import { vi, describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatDisplay from '../src/components/ChatDisplay';
import apiService from '../src/services/APIServices';
import { Message } from '../src/types/Types';





// vi.mock(apiService.sendMessage, 'sendMessage', vi.fn());
// vi.mock(apiService.getMessages, 'getMessages', vi.fn());

  describe('ChatDisplay', () => {

    it("renders the component", () => {
    render(<ChatDisplay />);
    })


    it('displays button to submit a message', () => {
      render(
        <ChatDisplay />
      );
      expect(
        screen.getByRole("button", { name: /Submit/i })
      ).toBeDefined()
      })
    });

  //   it('adds a new message', async () => {
  //     const mockSendMessage = vi.fn();
  //     // vi.mock(apiService.sendMessage, 'sendMessage', mockSendMessage);
  
  //     render(<ChatDisplay />);
  
  //     // Type a message and submit
  //     const inputElement = screen.getByRole('textbox');
  //     const submitButton = screen.getByRole('button', { name: 'Submit' });
  //     userEvent.type(inputElement, 'Test message');
  //     userEvent.click(submitButton);
  
  //     // Wait for the message to be sent
  //     await waitFor(() => {
  //       expect(mockSendMessage).toHaveBeenCalledTimes(1);
  //       expect(mockSendMessage).toHaveBeenCalledWith(expect.any(Number), {
  //         content: 'Test message',
  //         sender_id: expect.any(Number),
  //         sender_name: expect.any(String),
  //         receiver_id: expect.any(Number),
  //         receiver_name: expect.any(String),
  //       });
  //     });
  //   });

   
  // it('renders chat messages', async () => {
  //   const showMessages: Message[] = [
  //     {
  //       id: 1,
  //       content: 'Hello',
  //       sender_id: 1,
  //       sender_name: 'Sender',
  //       receiver_id: 2,
  //       receiver_name: 'Receiver',
  //     },
  //     {
  //       id: 2,
  //       content: 'Hi there',
  //       sender_id: 2,
  //       sender_name: 'Receiver',
  //       receiver_id: 1,
  //       receiver_name: 'Sender',
  //     },
  //   ];

  //   // Mock getMessages function to return showMessages
  //   // vi.mock(apiService, 'getMessages', () => Promise.resolve(showMessages));


  //   // Wait for messages to be fetched and displayed
   
  //     const messageElements = screen.getAllByText(/Hello|Hi there/);
  //     expect(messageElements).toHaveLength(2);
  
  //   // Ensure the messages are displayed correctly
  //   const senderNameElement = screen.getByText('Sender profile');
  //   const receiverNameElement = screen.getByText('Receiver profile');
  //   expect(senderNameElement).toBeDefined();
  //   expect(receiverNameElement).toBeDefined();
  // });













