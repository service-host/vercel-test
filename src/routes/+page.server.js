import { fail, redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name');

		const bodyJson = '{ "name": "' + name + '"}';
		const body = bodyJson;

		fetch(env.HASURA_PROJECT_ENDPOINT, {
			method: 'POST',
			body: body,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				'x-hasura-admin-secret': env.HASURA_ADMIN_SECRET
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

		throw redirect(303, '/thanks');
	}
};