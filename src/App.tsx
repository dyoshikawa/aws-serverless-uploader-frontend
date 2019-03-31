import * as React from 'react'
import styled from 'styled-components'
import { ApiAxios, Api } from './utils/Api'
import { base64Promise } from 'base64-promise'
import '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-regular'
import '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-solid'
import 'bulma/css/bulma.css'
import { AxiosError } from 'axios'

export interface Image {
  name: string
  url: string
  createdAt: string
}

enum UploadStateType {
  None,
  Now,
  Done,
  Error,
}

interface Props {}

interface State {
  inputFile: File | null
  images: Image[]
  uploadStateType: UploadStateType
  errors: string[]
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputFile: null,
      images: [],
      uploadStateType: UploadStateType.None,
      errors: [],
    }
  }

  componentDidMount = async () => {
    await this.fetchAll()
  }

  fetchAll = async (): Promise<any> => {
    const api: Api = new ApiAxios()
    const resData = await api.fetchAll()
    if (resData != null) {
      this.setState({ images: resData })
    } else {
      this.setState({ images: [] })
    }
  }

  upload = async (): Promise<any> => {
    const file: File | null = this.state.inputFile
    if (file == null) {
      return
    }

    this.setState({ uploadStateType: UploadStateType.Now })
    const base64Data = await base64Promise(file)
    const api: Api = new ApiAxios()
    await api
      .uploadImage({
        data: base64Data,
      })
      .catch((e: AxiosError) => {
        this.setState({ uploadStateType: UploadStateType.Error })
        if (e.response == null) {
          return Promise.reject(e)
        }
        this.setState({ errors: e.response.data.errors })
        return Promise.reject(e)
      })
    await this.fetchAll()
    this.setState({ uploadStateType: UploadStateType.Done, inputFile: null })
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) {
      return
    }
    this.setState({ inputFile: e.target.files[0] })
  }

  render() {
    const Wrapper = styled.section`
      .mb-20 {
        margin-bottom: 20px;
      }
    `
    return (
      <React.Fragment>
        <Wrapper>
          <section className="hero is-primary">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">AWS Serverless Uploader</h1>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="mb-20">
                <div className="file">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="resume"
                      onChange={this.handleChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload" />
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                  </label>
                </div>
                <div>{this.state.inputFile && this.state.inputFile.name}</div>
              </div>

              <button className="button is-primary" onClick={this.upload}>
                Upload
              </button>
              <div>
                {this.state.uploadStateType === UploadStateType.Now &&
                  'Uploading...'}
                {this.state.uploadStateType === UploadStateType.Done && 'Done!'}
                {this.state.uploadStateType === UploadStateType.Error &&
                  `Error! ${this.state.errors[0]}`}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              {this.state.images.map(image => (
                <div key={image.name}>
                  <img src={image.url} alt={image.name} />
                </div>
              ))}
            </div>
          </section>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default App
