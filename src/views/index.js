import asyncComponent from 'components/AsyncComponent'

const Home = asyncComponent(() => import(/* webpackChunkName: "home" */ 'views/Home'))
const About = asyncComponent(() => import(/* webpackChunkName: "about" */ 'views/About'))

export default {
    Home, About
}