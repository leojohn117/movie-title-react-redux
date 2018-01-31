import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onEnter(text)
      this.setState({ text: '' })
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
    this.handleBlur(e)
  }

  handleBlur(e) {
    this.props.onEnter(e.target.value)
  }

  render() {
    return (
      <input className="keyword"
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
}

TextInput.propTypes = {
  onEnter: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  newText: PropTypes.bool
}