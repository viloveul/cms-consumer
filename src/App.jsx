import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import qs from 'qs'

import Blog from '@/pages/Blog'
import Author from '@/pages/Author'
import Archive from '@/pages/Archive'
import Singular from '@/pages/Singular'

import Navigation from '@/components/Navigation'
import SearchForm from '@/components/SearchForm'

import authAction from '@/services/auth.action'
import siteAction from '@/services/site.action'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/style.css'

const mapStateToProps = state => {
  return {
    site: state.site
  }
}

const mapDispatchToProps = dispatch => {
  return {
    readToken: () => {
      dispatch(authAction.readToken())
    },
    initPagination: (payload) => {
      dispatch(siteAction.initPagination(payload))
    },
    loadOptions: () => {
      dispatch(siteAction.loadOptions())
    },
    loadMenus: () => {
      dispatch(siteAction.loadMenus())
    },
    loadWidgets: () => {
      dispatch(siteAction.loadWidgets())
    },
    fetchUserLogin: () => {
      dispatch(authAction.fetchUserLogin())
    }
  }
}

class App extends React.Component {

  state = {
    menuOpened: false,
    menukey: 'mymenu'
  }

  UNSAFE_componentWillUpdate = (nextProps, nextState) => {
    if (nextProps.location.search !== this.props.location.search) {
      this.setPagination(nextProps.location)
    }
  }

  UNSAFE_componentWillMount = () => {
    this.setPagination(this.props.location)
  }

  setPagination = (location) => {
    let pagination = {
      page: 1,
      size: 10
    }
    if (location.search.length > 1) {
      let q = qs.parse(location.search.substr(1))
      if (q.page !== undefined) {
        pagination.page = parseInt(q.page)
      }
      if (q.size !== undefined) {
        pagination.size = parseInt(q.size)
      }
    }
    this.props.initPagination(pagination)
  }

  componentDidMount = () => {
    this.props.readToken()
    this.props.loadOptions()
    this.props.loadMenus()
    this.props.loadWidgets()
    this.props.fetchUserLogin()
  }

  handleSearch = (v) => {
    this.props.history.push('/search/' + v)
  }

  handleOpenMenu = (v) => {
    this.setState({
      menuOpened: true
    })
  }

  handleCloseMenu = (v) => {
    this.setState({
      menuOpened: false
    })
  }

  handleCloseMenuShadow = (e) => {
    this.handleCloseMenu(e)
    this.setState({
      menukey: 'menukey' + Math.random()
    })
  }

  render = () => {
    return (
      <div className="wrapper">
        <header className="main-header">
          <div className="menu" rel="menu">
            <div className="container">
              <Navigation
                items={this.props.site.menus}
                className="navmenu"
                key={this.state.menukey}
                openMenuHandler={this.handleOpenMenu}
                closeMenuHandler={this.handleCloseMenu}
              >
              </Navigation>
              {this.state.menuOpened === true && <div className="navmenu-shadow" onClick={this.handleCloseMenuShadow}></div>}
            </div>
          </div>
          <div className="container">
            <div className="col-sm-6">
              <h1 className="site-title" rel="title">
                <Link to="/">{ this.props.site.options.brand }</Link>
              </h1>
              <p className="site-description" rel="description">{ this.props.site.options.description }</p>
            </div>
            <div className="col-sm-6">
              <SearchForm className="search" rel="search-form" handler={this.handleSearch}></SearchForm>
            </div>
          </div>
        </header>
        <div className="main-content" key={this.props.location.pathname+this.props.location.search}>
          <Switch>
            <Route exact path="/" component={Blog} />
            <Route exact path="/:year(\d{4,})" component={Blog} />
            <Route exact path="/:year(\d{4,})/:month(\d{1,2})" component={Blog} />
            <Route exact path="/:year(\d{4,})/:month(\d{1,2})/:day(\d{1,2})" component={Blog} />
            <Route exact path="/search/:search" component={Blog} />
            <Route exact path="/:type/:slug\.html" component={Archive} />
            <Route exact path="/@:name" component={Author} />
            <Route path="/*" component={Singular} />
          </Switch>
        </div>
        <footer className="main-footer">
          <div className="container">
            <div className="credit">
              <p>
                Powered by <a href="https://www.viloveul.com/" target="_blank" rel="noopener noreferrer"><abbr title="Viloveul">Viloveul.com</abbr></a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
