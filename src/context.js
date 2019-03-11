import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload)
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [ action.payload, ...state.contacts ]
			};
		case 'EDIT_CONTACT':
			return {
				...state,
				contacts: state.contacts.map(
					(contact) => (contact.id === action.payload.id ? (contact = action.payload) : contact)
				)
			};
		default:
			return state;
	}
};

export class Provider extends Component {
	state = {
		contacts: [
			// {
			// 	id: 1,
			// 	name: 'John Smith',
			// 	email: 'sjohn@gmail.com',
			// 	phone: '1234-567-890'
			// },
			// {
			// 	id: 2,
			// 	name: 'Jane Smith',
			// 	email: 'sjane@gmail.com',
			// 	phone: '9876-543-210'
			// },
			// {
			// 	id: 3,
			// 	name: 'Stringer Bell',
			// 	email: 'sbell@gmail.com',
			// 	phone: '147-852-963'
			// }
		],
		dispatch: (action) => {
			this.setState((state) => reducer(state, action));
		}
	};

	async componentDidMount() {
		const res = await axios.get('https://jsonplaceholder.typicode.com/users');

		this.setState({ contacts: res.data });
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;
