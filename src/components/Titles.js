import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Titles extends Component {
  render() {
    return (
      <ul className='clearfix'>
        {this.props.titles.map((item, i) =>
          <li key={i}>
            <div className='image'>{item.Poster !== 'N/A' ?
                      <img src={item.Poster} alt={item.Title} />
                    : <span className='missingImg'> Image Coming Soon </span>
                  }
            </div>
            <div className='details'>
              <h2>{item.Title}</h2>
              <h2>Type : {item.Type}</h2>
              <h2>Year : {item.Year}</h2>
            </div>
          </li>
        )}
      </ul>
    )
  }
}

Titles.propTypes = {
  titles: PropTypes.array.isRequired
}
