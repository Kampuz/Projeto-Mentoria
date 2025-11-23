import { Navigate } from "react-router-dom";
import { getUser } from "./session";

export default function ProtectedRoute({ children, role }) {
    const user = getUser();

    if (!user) {
        return <Navigate to="/login" />
    }

    if (role && user.tipo !== role) {
        return <Navigate to="/" />;
    }

    return children;
}