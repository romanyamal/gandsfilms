export const Modal = ({ isVisible, bgColor, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <>
      {/* Backdrop */}
      <div
        id="wrapper"
        className="fixed inset-0 backdrop-blur-xs z-40"
        onClick={handleClose}
      ></div>

      {/* Modal content */}
      <div
        className={`fixed top-1/2 left-1/2 z-50 max-w-lg w-fit p-6 ${
          bgColor ? bgColor : "bg-white"
        }  rounded-md shadow-lg
                   transform -translate-x-1/2 -translate-y-1/2`}
      >
        <button
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </>
  );
};
