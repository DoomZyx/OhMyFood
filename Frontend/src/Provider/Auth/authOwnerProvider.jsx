// context/AuthOwnerContext.jsx
import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showOwnerModal, hideOwnerModal } from "../../Store/User/authSlice";
import { useNavigate } from "react-router-dom";

const AuthOwnerContext = createContext();

export const AuthOwnerProvider = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const showOwnerModalValue = useSelector((state) => state.auth.showOwnerModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requireToBeOwner = () => {
    if (!user?.owner) {
      dispatch(showOwnerModal());
      navigate("/");
      return false;
    }
    return true;
  };

  return (
    <AuthOwnerContext.Provider
      value={{
        requireToBeOwner,
        showOwnerModal: showOwnerModalValue,
        hideOwnerModal: () => dispatch(hideOwnerModal()),
      }}
    >
      {children}
    </AuthOwnerContext.Provider>
  );
};

export const useAuthOwner = () => useContext(AuthOwnerContext);
