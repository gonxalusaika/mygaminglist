import Selectable from './Selectable';

module.exports = class CreateWanted extends React.Component {
	constructor(props){
		super(props);
		this.state = {itemName:"", itemDescription:""};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		var item = {name:this.state.itemName, description:this.state.itemDescription};
		this.props.onFormSubmit(item);
		this.setState({itemName:"", itemDescription:""});
		return;
	}
	handleNameChange(event){
		this.setState({itemName:event.target.value});
	}
	handleDescriptionChange(event){
		this.setState({itemDescription:event.target.value});
	}
	handleWantedTypesChange(values){
		this.setState({
			items: update(this.state.items, {1: {selected: {$set: newVal}}})			
		});
	}
	handleStateChange(newState){
		this.setState(newState);
	}
	render(){
			return	<div className="mdl-cell mdl-cell--3-col mdl-card mdl-shadow--2dp create-wanted">
		 <div className="create-wanted-overlay">
					<form onSubmit={this.handleSubmit.bind(this)}>
					  <div className="mdl-card__title mdl-card--expand">
					    <h2 className="mdl-card__title-text"><b>¡CREA TU ANUN!</b></h2>
					  </div>
					  <div className="mdl-card__supporting-text">
							<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input className="mdl-textfield__input"  type='text' ref='item' value={this.state.itemName} onChange={this.handleNameChange} />
								<label className="mdl-textfield__label" htmlFor="sample4">Título</label>
							</div>
							<p />
							<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<textarea rows="5" className="mdl-textfield__input" type='text' ref='item' value={this.state.itemDescription} onChange={this.handleDescriptionChange} />
								<label className="mdl-textfield__label" htmlFor="sample4">Descripción</label>
							</div>
					  </div>
					  <div className="mdl-card__actions mdl-card--border">
						  <input className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type='submit' value='Crear'/>
					  </div>
					</form>
				</div>
			</div>
		
	}
}