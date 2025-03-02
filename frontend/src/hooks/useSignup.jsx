import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { json } from 'react-router-dom'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)
    // try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })
      // update loading state
      setIsLoading(false);
    }
    // }
    // catch (error) {
    //   setError(json.error);
    //   // setError('An error occurred. Please try again.');
    // };
  };
  return { signup, isLoading, error, setError };
}