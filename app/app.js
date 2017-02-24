import MainApp from './components/MainApp';


class App extends React.Component {
	render(){
		return <MainApp />
	}
}

ReactDOM.render(<App />, document.getElementById('app'));