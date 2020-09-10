import { create } from 'apisauce'

const api = create({
  baseURL: 'https://api.spacexdata.com',
  headers: {
    accept: 'application/json',
    contentType: 'application/json',
  },
})

const ApiCall = async (action) => {
  const filterOption = action?.payload ? `&${action.payload.split('?')[1]}` : '';
  return await api.get(`/v3/launches?limit=100${filterOption}`).then((response) => {
    return response
  })
}

export default ApiCall;
