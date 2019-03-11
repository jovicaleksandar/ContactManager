import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import { Consumer } from '../../context';
import axios from 'axios';

export default class Contact extends Component {
	state = {
		showContactInfo: false
	};

	onShowClick = (e) => {
		this.setState({ showContactInfo: !this.state.showContactInfo });
	};

	onDeleteClick = async (id, dispatch) => {
		await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

		dispatch({ type: 'DELETE_CONTACT', payload: id });
	};

	render() {
		const { showContactInfo } = this.state;
		// const { contact } = this.props;
		const { name, email, phone, id } = this.props.contact;

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4>
								{name}
								<button
									className="btn btn-default dropdown-toggle"
									type="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
									style={{ marginLeft: '20px' }}
									onClick={this.onShowClick}
								/>
								<button
									className="btn btn-danger "
									type="button"
									aria-haspopup="true"
									aria-expanded="false"
									style={{ float: 'right' }}
									onClick={this.onDeleteClick.bind(this, id, dispatch)}
								>
									X
								</button>
								<Link to={`contact/edit/${id}`}>
									<i
										className="material-icons"
										style={{
											cursor: 'pointer',
											float: 'right',
											color: 'black',
											marginRight: '2rem'
										}}
									>
										border_color
									</i>
								</Link>
							</h4>
							{showContactInfo ? (
								<ul className="list-group">
									<li className="list-group-item">Email: {email}</li>
									<li className="list-group-item">Phone: {phone}</li>
								</ul>
							) : null}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
};
