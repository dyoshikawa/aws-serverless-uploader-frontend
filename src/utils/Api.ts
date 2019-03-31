import axiosBase, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { apiUrl } from '../env'
import { Image } from '../App'

export interface UploadImageData {
  data: string
}

export interface RegisterData {
  email: string
  idName: string
  name: string
  password: string
  custom: string
}

export interface ConfirmData {
  idName: string
  code: string
}

export interface Api {
  fetchAll(): Promise<Image[]>
  uploadImage(postData: UploadImageData): Promise<any>
}

export class ApiAxios implements Api {
  axios: AxiosInstance

  constructor() {
    this.axios = axiosBase.create({
      baseURL: apiUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async fetchAll(): Promise<Image[]> {
    const response: AxiosResponse<Image[]> = await this.axios.get('images')
    return Promise.resolve(response.data)
  }

  async uploadImage(postData: UploadImageData): Promise<any> {
    const response: AxiosResponse<any> | void = await this.axios
      .post('images', postData)
      .catch((e: AxiosError) => {
        return Promise.reject(e)
      })
    if (response == null) {
      return
    }
    return Promise.resolve(response.data)
  }
}
