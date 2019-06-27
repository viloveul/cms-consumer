import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'

import Blog from '@/pages/Blog'
import Archive from '@/pages/Archive'
import Author from '@/pages/Author'
import Singular from '@/pages/Singular'

import Search from '@/components/Search'
import Menu from '@/components/Menu'

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

  componentDidMount = () => {
    this.props.readToken()
    this.props.loadOptions()
    this.props.loadMenus()
    this.props.loadWidgets()
    this.props.fetchUserLogin()
  }

  handleSearch = (v) => {
    this.props.history.push({
      pathname: '/',
      search: '?search=' + v
    })
    console.log(this.props.history)
  }

  render = () => {
    return (
      <div className="wrapper">
        <header className="main-header">
          <div className="menu" rel="menu">
            <div className="container">
              <Menu
                items={this.props.site.menus}
                className="navmenu"
              >
              </Menu>
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
              <Search className="search" rel="search-form" handler={this.handleSearch}></Search>
            </div>
          </div>
        </header>
        <div className="main-content" key={this.props.location.pathname + this.props.location.search}>
          <Switch>
            <Route exact path="/" component={Blog} />
            <Route exact path="/:year(\d{4,})" component={Blog} />
            <Route exact path="/:year(\d{4,})/:month(\d{1,2})" component={Blog} />
            <Route exact path="/:year(\d{4,})/:month(\d{1,2})/:day(\d{1,2})" component={Blog} />
            <Route exact path="/:type/:slug\.html" component={Archive} />
            <Route exact path="/@:name" component={Author} />
            <Route path="/*" component={Singular} />
          </Switch>
        </div>
        <footer className="main-footer">
          <div className="container">
            <div className="credit">
              <p>
                Powered by 
                <a href="https://www.viloveul.com/" target="_blank" rel="noopener noreferrer">
                  <abbr title="Viloveul">Viloveul.com</abbr>
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
