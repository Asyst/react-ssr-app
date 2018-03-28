import React, { Component } from 'react'
import { Advertisement } from 'semantic-ui-react'

export default class AdvertisementContainer extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
        <Advertisement unit='medium rectangle' test='Medium Rectangle' />
    )
  }
}