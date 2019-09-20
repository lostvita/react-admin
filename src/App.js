import React, { Component } from 'react'

import Routers from 'router'

import SideBar from 'components/SideBar'

class App extends Component {
    render () {
        return (
            <div className="container">
                <section className="sidebar">
                    <SideBar />
                </section>
                <div className="main-wrapper">
                    <header className="main-header"><span className="username">Hi, 安歌</span></header>
                    <section className="main-body">
                        <Routers />
                    </section>
                    <footer className="main-footer"><span className="copyright">Copyright@2019 安歌</span></footer>
                </div>
            </div>
        )
    }
}

export default App