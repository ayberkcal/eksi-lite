import React from 'react'
import { Brackets } from '../utils' // Todo: remove => move reducer

export default class ShowMore extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = { show: false, size: 300 }
  }

  show = (size) => this.setState({ show: true, size:this.props.text.length })

  render() {
    const { text } = this.props
    const len = text.length
    let mText = len > this.state.size ? text.slice(0, this.state.size) : text

    return (
      <React.Fragment>
        {Brackets(mText)}
        {!this.state.show && len > this.state.size && (
          <span
            style={{ fontWeight: 'bold', color: '#00000066', cursor: 'pointer', marginLeft:5 }}
            onClick={this.show}
          >
            devamını okuyayım...
          </span>
        )}
      </React.Fragment>
    )
  }
}
