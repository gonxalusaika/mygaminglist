module.exports = class Selectable extends React.Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.setState({value:false});
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	render(){
		return(<li className="mdl-list__item" key={this.props.item.id}>
	    <span className="mdl-list__item-primary-content">
	      <i className="material-icons  mdl-list__item-avatar">person</i>
	      {this.props.item.name}
	    </span>
	    <span className="mdl-list__item-secondary-action">
	      <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="list-checkbox-1">
	        <input type="checkbox" id="list-checkbox-1" className="mdl-checkbox__input" value={this.state.value} onChange={this.handleChange} ref={this.props.item} />
	      </label>
	    </span>
	  </li>);
	}
}