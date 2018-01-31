import React from 'react'
import PropTypes from 'prop-types'

const PagePicker = ({ value, onChange, options }) => (
  <section>
    <span>Page Selected: {value}</span>
    <span> Go to Page </span>
    <select onChange={e => onChange(e.target.value)}
            value={value}>
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>)
      }
    </select>
  </section>
)

PagePicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PagePicker
