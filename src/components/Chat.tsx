import React, { useState, useEffect, useRef } from 'react';
import openAIService from '../services/openAIService'; // Ajuste o caminho conforme necessário
import './Chat.css';
import loadingGif from '../../assets/loading.gif';
import BotImage from '../assets/bot.png';

interface ChatProps {
  userId: string;
}

interface Message {
  sender: string;
  text: string;
  createdAt?: string;
}

const Chat: React.FC<ChatProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('.');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'openai', text: `Olá, meu nome é Lavanda, como posso te ajudar?` }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoading) {
      const loadingInterval = setInterval(() => {
        setLoadingText(prev => prev.length < 3 ? prev + '.' : '.');
      }, 500);

      return () => clearInterval(loadingInterval);
    }
  }, [isLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = async () => {
    if (isOpen) {
      await closeChat();
    }
    setIsOpen(!isOpen);
  };

  const closeChat = async () => {
    try {
      await openAIService.closeChat();
      setMessages([]);
    } catch (error) {
      console.error("Error closing chat", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = { sender: 'user', text: inputValue, createdAt: new Date().toISOString() };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await openAIService.sendMessageToAssistant({ input: inputValue });
      const responseMessages: Message[] = response.map((message: any) => {
        if (message.userMessage) {
          return { sender: 'user', text: message.userMessage, createdAt: message.createdAt };
        } else if (message.assistMessage) {
          return { sender: 'openai', text: message.assistMessage, createdAt: message.createdAt };
        }
        return null;
      }).filter((message: Message | null): message is Message => message !== null);

      setMessages(prevMessages => [...prevMessages, ...responseMessages]);
    } catch (error) {
      console.error("Error sending message to the API", error);
      setMessages(prevMessages => [...prevMessages, { sender: 'openai', text: 'There was an error processing your request. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <div className="chat-container">
      <div className="chat-icon" onClick={toggleChat}>
          <img style={{width:80, border:'none'}} className="btn rounded-circle" src="https://cdn.chatbot.com/widget/61f28451fdd7c5000728b4f9/2A8kicyF.png" alt="Chat Icon"/>
      </div>
      {isOpen && (
        <div className="chat-box card shadow">
          <div className="chat-header card-header d-flex align-items-center justify-content-between px-4">
            <div className='me-3' style={{width:25, backgroundColor:'white', display:'flex', justifyContent:'center', borderRadius:100}}>
              <img style={{width:50, borderRadius:100}} src="https://cdn.chatbot.com/widget/61f28451fdd7c5000728b4f9/2A8kicyF.png" alt="Chat Icon" />
            </div>
            <h4 className="mb-0 text-dark">Lavanda</h4>
            <button style={{textAlign:'right'}} className="btn-close" onClick={toggleChat}></button>
          </div>
          <div className="chat-body card-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'openai-message'}`}>
                {msg.sender === 'openai' && <div className="d-flex align-items-center mb-2">
                  <img style={{width:25,borderRadius:100}} className="me-2" src="https://cdn.chatbot.com/widget/61f28451fdd7c5000728b4f9/2A8kicyF.png" alt="Chat Icon"/>
                  <span>Lavanda</span>
                </div>}
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
            {isLoading && <div className="loading-text d-block mx-auto">{loadingText}</div>}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="chat-footer card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escreva sua mensagem"
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
