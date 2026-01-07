import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
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
