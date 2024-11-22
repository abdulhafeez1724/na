import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // For client-side navigation

// HOC to protect pages by checking if the user is authenticated
const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const token = Cookies.get("access_token");

    useEffect(() => {
      if (!token) {
        // Redirect to login if the user is not authenticated
        router.push(`/login?next=${router.asPath}`); // Redirect to login with the current page to redirect after login
      }
    }, [token, router]);

    if (!token) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
