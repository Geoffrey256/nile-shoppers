import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";
import { Home } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (phone.startsWith("07")) errs.phone = "Do not start with 07. Use format like 7XXXXXXXX";
    else if (!/^\d{10,}$/.test(phone.replace(/\s/g, ""))) errs.phone = "Phone must be at least 10 digits";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    if (password !== confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearError = (field: string) => setErrors(e => { const n = {...e}; delete n[field]; return n; });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, phone },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to verify your account." });
      navigate("/login");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setGoogleLoading(false);
    if (error) {
      toast({ title: "Google sign-in failed", description: String(error), variant: "destructive" });
    }
  };

  const Field = ({ label, field, type = "text", placeholder, value, onChange }: any) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <input type={type} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange(e.target.value); clearError(field); }}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground ${errors[field] ? "border-destructive" : "border-secondary"}`} />
      {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-gradient-to-br from-primary/90 via-primary to-primary-darker">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="absolute top-10 left-10 text-primary-foreground/20 text-6xl hidden md:block">🛒</div>
      <div className="absolute bottom-20 right-16 text-primary-foreground/20 text-5xl hidden md:block">📦</div>
      <div className="absolute top-1/4 right-10 text-primary-foreground/20 text-4xl hidden lg:block">🏷️</div>
      <div className="absolute bottom-1/3 left-16 text-primary-foreground/20 text-5xl hidden lg:block">🛍️</div>

      <div className="w-full max-w-md bg-card/95 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl relative z-10 my-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-4">
          <Home className="w-4 h-4" /> Back to Home
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-foreground">Create an account</h2>

        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 border border-border bg-background text-foreground py-2.5 rounded font-medium hover:bg-secondary transition mb-4 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {googleLoading ? "Signing in…" : "Continue with Google"}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name" field="name" value={name} onChange={setName} placeholder="John Doe" />
          <Field label="Email address" field="email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Field label="Phone number" field="phone" value={phone} onChange={setPhone} placeholder="7XXXXXXXXX (10 digits)" />
          <Field label="Password" field="password" type="password" value={password} onChange={setPassword} />
          <Field label="Confirm password" field="confirm" type="password" value={confirm} onChange={setConfirm} />
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
