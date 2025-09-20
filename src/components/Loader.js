import React, { Component } from 'react'
import loading from './loading.gif'
export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" style={{width: '3rem', height: '3rem'}} />
      </div>
    )
  }
}
