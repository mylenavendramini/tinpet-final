import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <div className='auth-modal'>
      <div onClick={handleClick}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default AuthModal;
