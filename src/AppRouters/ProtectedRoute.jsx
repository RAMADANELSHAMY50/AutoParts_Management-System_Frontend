
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/Auth.jsx";

export default function ProtectedRoute({
  allowedRoles,
}) {
  const { user } = useAuth();

  console.log("=================================");
  console.log("PROTECTED ROUTE");
  console.log("USER:", user);
  console.log("ROLE:", user?.role);
  console.log("ROLE TYPE:", user?.role?.type);
  console.log("ALLOWED ROLES:", allowedRoles);
  console.log("=================================");

  // ==========================================
  // 1. User is NOT logged in
  // ==========================================
  if (!user) {
    console.log(
      "NO USER → REDIRECT TO LOGIN"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================================
  // 2. Get User Role
  // ==========================================
  const role = user?.role?.type;

  // ==========================================
  // 3. Role doesn't exist
  // ==========================================
  if (!role) {
    console.log(
      "USER HAS NO ROLE → LOGIN"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================================
  // 4. Check Permission
  // ==========================================
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    console.log(
      "ROLE NOT ALLOWED:",
      role
    );

    // Customer trying to access Admin
    if (role === "customer") {
      return (
        <Navigate
          to="/home"
          replace
        />
      );
    }

    // Admin trying to access Customer
    if (role === "admin") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================================
  // 5. User is allowed
  // ==========================================
  console.log(
    "ACCESS GRANTED"
  );

  return <Outlet />;
}

