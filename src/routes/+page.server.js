import { fail, redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const mobile = formData.get('mobile');
		const organisation = formData.get('organisation');
		const messageText = formData.get('messageText');

		const body =
			'{ "name": "' +
			name +
			'", "email": "' +
			email +
			'", "mobile": "' +
			mobile +
			'", "organisation": "' +
			organisation +
			'", "project_description": "' +
			messageText +
			'"}';

		fetch(env.HASURA_PROJECT_ENDPOINT, {
			method: 'POST',
			body: body,
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((res) => {
				console.log(res);
				if (!res.ok) {
					throw new Error('An error occurred, please try again!');
				}
				return res.json();
			})
			.catch((err) => {
				console.log(err);
			});

		if (name.length < 2) {
			return fail(400, {
				error: true,
				message: 'Please enter your full name. First name and surname are required.',
				name,
				email,
				organisation,
				messageText
			});
		}

		throw redirect(303, '/');
	}
};
