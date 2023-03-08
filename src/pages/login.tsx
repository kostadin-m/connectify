import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react"

//custom hooks
import { useThemeContext, useLogin } from '@features/hooks'


//components
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormInput, FormWrapper } from "@features/ui"
import { Spinner } from "react-chat-engine-advanced"


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  const { theme } = useThemeContext()

  const handleChange = (setValue: Dispatch<SetStateAction<string>>, value: string) => {
    setValue(value)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }
  if (isPending) {
    debugger
  }
  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
    <>
      <FormWrapper title="Login" theme={theme}>
        <form onSubmit={submit}>
          <FormInput value={email} onChange={handleChange.bind(null, setEmail)} label='Email' type='email' />
          <FormInput value={password} onChange={handleChange.bind(null, setPassword)} label='Password' type='password' />
          <button
            disabled={isPending}
            className={`form-btn btn ${theme}`}>
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
        {isPending && <Spinner />}
      </FormWrapper >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme} />
    </>
  )
}
