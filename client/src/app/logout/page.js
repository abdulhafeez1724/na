import { logout } from "@/utils/auth";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    logout();
    window.location.href = "/login";
  }, []);

  return <p>Logging out...</p>;
}
