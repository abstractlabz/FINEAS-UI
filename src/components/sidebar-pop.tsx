import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Bold } from 'lucide-react';

// Define Props
interface SidebarProps {
  credits?: number;
  chats?: string[];
}

const SidebarPop: React.FC<SidebarProps> = ({ credits = 0, chats = [] }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  return (
    <div style={styles.sidebarContainer}>
      {/* Header Divider */}
      <div style={styles.header}>
        <div style={styles.iconContainer} className='flex justify-between'>
          <span className='ml-[65%] mt-[5%]' style={styles.textWithIcon}>{credits}</span>
          <Image src="/credit.png" alt="Credits Icon" width={10} height={10} />
        </div>
        <div style={styles.newChatContainer}>
          <Image src="/new.png" alt="New Chat Icon" width={40} height={45} />
          <span className='mt-[15%] ml-[10%]' style={styles.createNewChatText}>Create a new chat</span>
        </div>
      </div>

      {/* Chat List Divider (Scrollable) */}
      <div className="custom-scrollbar" style={styles.chatListContainer}>
        <div style={styles.chatList}>
          {chats.map((chat, index) => (
            <div
              key={index}
              style={{
                ...styles.chatItem,
                backgroundColor: selectedChat === chat ? '#080733' : '#2E1D85',
                color: '#FFFFFF',
              }}
              onClick={() => setSelectedChat(chat)}
            >
              {chat}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Divider */}
      <div style={styles.footer}>
        <Image src="/delete.png" alt="Delete Icon" width={20} height={20} />
        <span style={styles.deleteText}>Delete chat</span>
      </div>
    </div>
  );
};

// Define styles using inline CSS as an example
const styles = {
  sidebarContainer: {
    width: '300px',
    height: '100vh',
    backgroundColor: '#2E1D85',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    borderRight: '0px solid #E0E0E0',
    boxSizing: 'border-box' as const,
  },
  header: {
    height: '16.66%',
    padding: '10px',
    borderBottom: '0px solid #E0E0E0',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWithIcon: {
    fontSize: '15px',
    color: '#7092FF',
    fontWeight: 'bold',
    marginLeft: '75%',
  },
  newChatContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    cursor: 'pointer',
    marginLeft: '3%',
  },
  createNewChatText: {
    marginLeft: '10px',
    fontSize: '16px',
    color: '#7092FF',
    fontWeight: 'bold',
  },
  chatListContainer: {
    flexGrow: 1,
    overflowY: 'auto' as const,
    padding: '10px',
  },
  chatList: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  chatItem: {
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#F0F0F0',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  footer: {
    height: '15%',
    padding: '10px',
    borderTop: '0px solid #E0E0E0',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  deleteText: {
    marginLeft: '8px',
    fontSize: '14px',
    color: '#D91FFF',
    fontWeight: 'bold',
  },
};

export default SidebarPop;
