<script>
	import { langDict } from './../../../stores/localizationStore.js';
	import { auth } from '$lib/firebaseConfig/firebase';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { addNotification } from '/src/stores/notificationStore';
	import AvatarManager from '$lib/components/AvatarManager/AvatarSelector.svelte';

	import avatars from '$lib/components/avatarManager/avatars';
	import Spinner from '../utils/Spinner.svelte';

	const errors = {
		'auth/email-already-in-use': 'The email address is already in use by another account.',
		'auth/admin-restricted-operation': 'This operation is restricted to administrators only.',
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/weak-password': 'Password should be at least 6 characters.',
		'auth/password-confirmation': 'Passwords do not match.',
		'auth/internal-error': 'An internal error has occurred.',
		'auth/avatar': 'You must choose an avatar'
	};
	let email = '';
	let pwd = '';
	let pwdConfirmation = '';
	let userAvatar = avatars[0];

	let teacher = false;
	let admin = false;

	let loading = false;

	/**
	 * Sign up the user if all the information are correct
	 * @param e - event
	 */
	const submit = (e) => {
		loading = true;
		e.preventDefault();
		if (!passwordIsValid()) {
			addNotification({ text: errors['auth/password-confirmation'] });

			loading = false;
			return;
		}
		if (!userAvatar) {
			addNotification({ text: errors['auth/avatar'] });
			loading = false;
			return;
		}
		signUpUser();
	};

	/**
	 * Sign up the user in Firestore - redirect the user to the card view page
	 */
	const signUpUser = () => {
		createUserWithEmailAndPassword(auth, email.trim(), pwd)
			.then((data) => {
				console.log('userAvatar', userAvatar);
				setDoc(doc(db, 'users', data.user.uid), {
					avatar: userAvatar,
					email: email,
					admin: true
				}).then(() => {
					loading = false;
					goto('/cardview/environment/null/null/false/true');
				});
			})
			.catch((error) => {
				addNotification({ text: errors[error.code] });
				loading = false;
			});
	};

	/**
	 * Verify if the password and the password validation match
	 */
	const passwordIsValid = () => {
		return pwd === pwdConfirmation;
	};
</script>

<img
	src="/tickle.svg"
	alt="tickle-logo"
	class="flex-grow m-auto my-3 h-96 sm:max-h-72 p-12 sm:p-0"
/>

<form class="flex flex-col p-3 w-full" action="" method="post" on:submit={(e) => submit(e)}>
	<input
		class="w-full m-auto py-2 px-3 mb-3 outline-c-dark-gray border-black border-2 custom-shadow"
		bind:value={email}
		type="text"
		id="email"
		placeholder="Email Address"
	/>
	<input
		class="w-full m-auto py-2 px-3 mb-3 outline-c-dark-gray border-black border-2 custom-shadow"
		bind:value={pwd}
		type="password"
		id="password"
		placeholder={$langDict.sign_up.choose_pw}
	/>
	<input
		class="w-full m-auto py-2 px-3 mb-3 outline-c-dark-gray border-black border-2 custom-shadow"
		bind:value={pwdConfirmation}
		type="password"
		id="passwordConfirmation"
		placeholder={$langDict.sign_up.confirm_pw}
	/>

	<div class="w-full mx-auto my-2 flex text-lg">
		<div>Administrator</div>
		<input class="ml-auto" type="checkbox" bind:value={admin} />
	</div>
	<div class=" mx-auto w-full my-2 flex text-lg">
		<div>Teacher</div>
		<input class="ml-auto" type="checkbox" bind:value={teacher} />
	</div>
	<div class="w-full mx-auto my-2 flex flex-col">
		<h2 class="text-lg mb-1">Choose your Avatar:</h2>
		<AvatarManager {userAvatar} onChange={(av) => (userAvatar = av)} />
	</div>

	<button
		class="w-full m-auto mb-3 px-3 py-3 font-bold uppercase btn border-2 border-black custom-shadow
				bg-white hover:bg-c-light-gray flex"
		type="submit"
	>
		<div class="m-auto">
			{#if loading === true}
				<Spinner width="20px" height="20px" />
			{:else}
				{$langDict.sign_up.title}
			{/if}
		</div>
	</button>
	<p class="mx-auto">
		Already have an account ?
		<a href="/" class="underline">Sign In</a>
	</p>
</form>

<style>
	.custom-shadow {
		box-shadow: 5px 5px 5px #a6a29f;
	}
</style>
