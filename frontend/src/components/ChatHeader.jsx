import LogoutIcon from '@mui/icons-material/Logout';

const ChatHeader = () => {
  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img
            src=''
            alt=''
          />
        </div>
        <h3>UserName</h3>
      </div>
      <i className='logout-icon'>
        <LogoutIcon />
      </i>
    </div>
  );
};

export default ChatHeader;
