import apisauce from 'apisauce'

let instance = null

const create = (baseURL = 'http://localhost:3000') => {
  if (instance !== null) {
    return instance
  }

  const api = apisauce.create({
    baseURL,
    timeout: 10000
  })

  api.addMonitor((response) => {
    Reactotron.apiLog(response)
  })

  api.scrapeLink = (url) => api.get('/links/infos', {url})
  api.createDraft = (payload) => api.post('/stories', {story: payload})
  api.updateDraft = (id, payload) => api.put(`/stories/${id}`, {story: payload})
  api.publishDraft = (id, payload) => api.post(`/stories/${id}/publish`, {story: payload})

  instance = api

  return instance
}

export default {
  create
}
