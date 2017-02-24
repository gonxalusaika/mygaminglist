import CreateWanted from './CreateWanted';
import WantedList from './WantedList';

module.exports = class ApolloApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {gameList:[]};
		this.updateItems = this.updateItems.bind(this);
	}
	componentDidMount(){
		fetch('/api/v1/games')
			.then(result => {
				return result.json();
			})
			.then(result => {				
				this.setState({gameList:result});
			});
		
	}
	updateItems(newWanted){
		fetch('/api/v1/games')
			.then(result => result.json() )
			.then(result => {
				this.setState({gameList: result});
			});
		// fetch('/api/v1/games', {method: 'POST', body: JSON.stringify(newWanted), headers:{'Content-Type':'application/json'} })
		// 	.then(result => result.json() )
		// 	.then(result => {
		// 		var allItems = this.state.wantedList.concat([result]);
		// 		this.setState({wantedList: allItems});
		// 	});
	}
	render(){
		return (
			<div className="layout">
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="#">
				        Title
				      </a>
				    </div>
				  </div>
				</nav>
				<main className="container">
					<WantedList gameList={this.state.gameList} onFormSubmit={this.updateItems} />
				</main>
			</div>
		);
	}
}