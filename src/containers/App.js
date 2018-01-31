import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { enterKeyword, pageSelected, fetchTitlesIfNeeded, invalidateKeyword } from '../actions'
import TextInput from '../components/TextInput'
import PagePicker from '../components/PagePicker'
import Titles from '../components/Titles'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, enteredText, selectedPage } = this.props
    dispatch(fetchTitlesIfNeeded(enteredText, selectedPage))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.enteredText !== this.props.enteredText || nextProps.selectedPage !== this.props.selectedPage) {
      const { dispatch, enteredText, selectedPage } = nextProps
      dispatch(fetchTitlesIfNeeded(enteredText, selectedPage))
    }
  }

  handleChange(text) {
    if (text.length !== 0) {
      this.props.dispatch(pageSelected('1'))
      this.props.dispatch(enterKeyword(text))
    }
  }

  handlePageChange(val){
    if (val.length !== 0) {
      this.props.dispatch(pageSelected(val))
    }
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, enteredText, selectedPage } = this.props
    dispatch(invalidateKeyword(enteredText, selectedPage))
    dispatch(fetchTitlesIfNeeded(enteredText, selectedPage))
  }

  render() {
    const { enteredText, selectedPage, numberOfPages, titles, isFetching, lastUpdated } = this.props
    const isEmpty = titles.length === 0
    const arrOptions = numberOfPages ? Array.from(new Array(numberOfPages), (x,i) => i+1) : []
    return (
      <div className="wrapper">
        <Header />
        <TextInput onEnter={this.handleChange}
                       placeholder="Enter Movie Title" />
        <PagePicker value={selectedPage}
                onChange={this.handlePageChange}
                options={arrOptions} /> 
        <p>
          {lastUpdated &&
            <span>
              Last updated at {lastUpdated}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div className="contents" style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Titles titles={titles} />
            </div>
        }
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  enteredText: PropTypes.string.isRequired,
  selectedPage: PropTypes.string.isRequired,
  titles: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { enteredText, selectedPage, titlesByKeyword } = state
  const {
    isFetching,
    lastUpdated,
    numberOfPages,
    items: titles
  } = titlesByKeyword[enteredText + selectedPage] || {
    isFetching: true,
    items: []
  }

  return {
    enteredText,
    selectedPage,
    numberOfPages,
    titles,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
