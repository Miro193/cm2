import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

function SignupComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [success, setSuccess] = useState(false);
  const { signup, error, setError, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    await signup(email, password); // Use the signup function from the hook
    if (!error && !isLoading) {
      // setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };
  //   // Simulate API call (replace with your actual API endpoint)
  // try {
  //   // Simulate API call using fetch or axios.
  //   const response = await fetch('/api/users/signup', { // replace with your API endpoint
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (response.ok) {
  //     setSuccess(true);
  //     setError('');
  //     setEmail('');
  //     setPassword('');
  //     setConfirmPassword('');
  //   }
  //   else {
  //     const errorData = await response.json();
  //     setError(errorData.message || 'Signup failed.'); // handle server errors, and provide a message
  //   }
  //   } catch (err) {
  //     setError('An error occurred. Please try again.');
  //     // console.error('Signup error:', err);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isLoading}>Sign Up</button>
          {error && <div className="p-2 bg-rose-50 border border-rose-500 text-rose-500 rounded-md my-5">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;