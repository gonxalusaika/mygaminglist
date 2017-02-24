module.exports = class Wanted extends React.Component {
	render(){
		var style = {backgroundImage: "url('" + this.props.game.cover + "')"};
		return <div className="col-md-3 col-sm-6 col-xs-12" >
				  <div className="game-card">
					<img src={this.props.game.cover} className="img-responsive" alt="Responsive image" />
					<h4 className="mdl-card__title-text">{this.props.game.name}</h4>
					<div className="mdl-card__supporting-text">
					  {this.props.game.description}
					</div>
				  </div>
				</div>
	}
}