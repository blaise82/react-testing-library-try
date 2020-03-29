import React, { Component } from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import SignIn from '../views/SignIn';
import userEvent from '@testing-library/user-event';

describe('testing sign in', () => {
	afterEach(cleanup);
	it('renders the component', () => {
		const { asFragment, debug } = render(<SignIn />);
		expect(asFragment(<SignIn />)).toMatchSnapshot();
	});
	it('should submit form', async () => {
		const { getByLabelText, getByText, container, debug } = render(<SignIn />);
		const change = jest.fn();
		const onSubmit = jest.fn();
		const email = getByLabelText('email');
		const password = getByLabelText('password');
		const submit = getByLabelText('submit');

		userEvent.type(email, 'octopusbn@gmail.com');
		expect(email.value).toBe('octopusbn@gmail.com');
		expect(password.value).toBe('');
		expect(change).toHaveBeenCalled();

		console.log(password)
		await userEvent.click(submit);
		expect(onSubmit).toHaveBeenCalled();
		
	});
});
