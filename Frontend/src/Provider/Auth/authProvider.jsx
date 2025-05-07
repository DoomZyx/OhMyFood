import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAuthModal, showAuthModal } from "../../Store/User/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const showModal = useSelector((state) => state.auth.showAuthModal);
  const dispatch = useDispatch();

  const requireAuth = () => {
    if (!token) {
      dispatch(showAuthModal());
      return false;
    } else {
      dispatch(hideAuthModal());
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        requireAuth,
        showModal,
        hideModal: () => dispatch(hideAuthModal()),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
