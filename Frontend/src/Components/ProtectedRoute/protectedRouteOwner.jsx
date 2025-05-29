import { useEffect } from "react";
import { useAuthOwner } from "../../Provider/Auth/authOwnerProvider";

const ProtectedRouteOwner = ({ children }) => {
  const { requireToBeOwner } = useAuthOwner();

  useEffect(() => {
    requireToBeOwner();
  }, []);

  return children
};

export default ProtectedRouteOwner;
