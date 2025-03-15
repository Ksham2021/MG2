import React, { useState } from 'react';
import { X, Mail, Phone, Eye, EyeOff } from 'lucide-react';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthPopup({ isOpen, onClose, onSuccess }: AuthPopupProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to authenticate
    console.log('Form submitted:', formData);
    onSuccess();
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-md p-6 m-4 animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">
            {isSignIn ? 'Welcome Back!' : 'Join MindGrow'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              authMethod === 'email' ? 'bg-white/20 text-white' : 'text-white/60 hover:bg-white/10'
            }`}
            onClick={() => setAuthMethod('email')}
          >
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              authMethod === 'phone' ? 'bg-white/20 text-white' : 'text-white/60 hover:bg-white/10'
            }`}
            onClick={() => setAuthMethod('phone')}
          >
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMethod === 'email' ? (
            <div>
              <label className="block text-white/60 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                placeholder="Enter your email"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-white/60 text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}

          <div className="relative">
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-white/60 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {!isSignIn && (
            <div className="relative">
              <label className="block text-white/60 text-sm mb-2">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full neon-border py-2 px-4 rounded-lg text-white font-medium hover:scale-105 transition-transform"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-white/60">
          {isSignIn ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignIn(false)}
                className="text-white hover:gaming-gradient"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-white hover:gaming-gradient"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 