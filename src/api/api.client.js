import axios from 'axios'

const instance = axios.create()

instance.interceptors.response.use(
  resp => resp,
  error => {
    return Promise.reject(error)
  }
)

class ApiError extends Error {
  constructor (status, message, underlying) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.underlying = underlying
  }
}

const api = {
  get (url, data) {
    return instance.get(url, data).catch(error => {
      throw new ApiError(error.response.status, `GET ${url} fetch ${error}`, error)
    })
  },
  post (url, data) {
    return instance.post(url, data).catch(error => {
      throw new ApiError(error.response.status, `POST ${url} fetch ${error}`, error)
    })
  },
  put (url, data) {
    return instance.put(url, data).catch(error => {
      throw new ApiError(error.response.status, `PUT ${url} fetch ${error}`, error)
    })
  },
  delete (url, data) {
    return instance.delete(url, data).catch(error => {
      throw new ApiError(error.response.status, `DELETE ${url} fetch ${error}`, error)
    })
  },
  uploadFile (url, file, key) {
    const formData = new FormData()
    formData.append(key, file)
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  multiUploadFile (url, files, key) {
    const formData = new FormData()
    Object.values(files).forEach(file => {
      formData.append(key, file)
    })
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default api
