import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

export const loginRequest = async (
  email: string,
  password: string
) => {
  const { data } = await api.post('/arqueros/login', {
    email,
    password
  })
  
  
  return data
}

export const passwordRecoveryRequest = async (email: string) => {
  const { data } = await api.post('/arqueros/recuperar-password', { email })
  return data
}


