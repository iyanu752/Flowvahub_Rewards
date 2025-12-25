import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("OAuth callback error:", error.message);
          setError(error.message);
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        if (session) {
          navigate("/dashboard/rewards");
        } else {
          setError("No session found");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleAuth();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-2">Authentication failed: {error}</p>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Logging you in...</p>
    </div>
  );
};

export default AuthCallback;