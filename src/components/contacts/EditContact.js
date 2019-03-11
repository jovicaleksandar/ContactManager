import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layouts/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

export default class EditContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {
			name: '',
			email: '',
			phone: ''
		}
	};

	async componentDidMount() {
		const { id } = this.props.match.params;
		const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

		const contact = res.data;

		this.setState({
			name: contact.name,
			email: contact.email,
			phone: contact.phone
		});
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (dispatch, e) => {
		const { name, email, phone } = this.state;
		e.preventDefault();

		// Check for errors
		if (name === '') {
			this.setState({ errors: { name: 'Name is required...' } });
			return;
		}

		if (email === '') {
			this.setState({ errors: { email: 'Email is required...' } });
			return;
		}

		if (phone === '') {
			this.setState({ errors: { phone: 'Phone is required...' } });
			return;
		}

		const updateContact = {
			name,
			email,
			phone
		};
		const { id } = this.props.match.params;

		const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);

		dispatch({ type: 'EDIT_CONTACT', payload: res.data });

		this.setState({
			name: '',
			email: '',
			phone: '',
			errors: {
				name: '',
				email: '',
				phone: ''
			}
		});

		this.props.history.push('/');
	};

	render() {
		const { name, email, phone, errors } = this.state;

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card mb-3">
							<div className="card-header">Edit Contact</div>
							<div className="card-body">
								<form onSubmit={this.onSubmit.bind(this, dispatch)}>
									<TextInputGroup
										label="Name"
										name="name"
										placeholder="Enter name..."
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextInputGroup
										label="Email"
										name="email"
										type="email"
										placeholder="Enter email..."
										value={email}
										onChange={this.onChange}
										error={errors.email}
									/>
									<TextInputGroup
										label="Phone"
										name="phone"
										placeholder="Enter phone..."
										value={phone}
										onChange={this.onChange}
										error={errors.phone}
									/>
									<input type="submit" value="Edit Contact" className="btn btn-block btn-primary" />
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}
