import Wanted from './Wanted';
import CreateWanted from './CreateWanted';

module.exports = class WantedList extends React.Component {
	render(){
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		return <ReactCSSTransitionGroup
          transitionName="wanted-cards"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          className="">
			<CreateWanted onFormSubmit={this.props.onFormSubmit} wantedTypes={this.props.wantedTypes} />
		
			{this.props.gameList.map(function(w){
				return <Wanted key={w.id} game={w} />
			})}
		</ReactCSSTransitionGroup>
	}
}