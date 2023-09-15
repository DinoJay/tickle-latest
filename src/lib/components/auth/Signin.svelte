<script>
	import { _ } from 'svelte-i18n';

	import { auth, db } from '$lib/firebaseConfig/firebase';
	import {
		signInWithEmailAndPassword,
		signInWithCredential,
		GoogleAuthProvider
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { doc, setDoc, getDoc } from 'firebase/firestore';
	import { addNotification } from '/src/stores/notificationStore';
	const errors = {
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/user-not-found': 'There is no user record corresponding to this identifier.',
		'auth/wrong-password': 'The password is invalid or the user does not have a password.',
		'auth/internal-error': 'An internal error has occurred.'
	};

	let email = '';
	let pwd = '';

	/**
	 * Sign in the user if all the information are correct
	 * @param e - event
	 */
	const submit = (e) => {
		e.preventDefault();
		signInUser();
	};

	/**
	 * Sign in the user - redirect the user to the card view page
	 */
	const signInUser = () => {
		signInWithEmailAndPassword(auth, email.trim(), pwd)
			.then(() => {
				goto('/cardview/environment');
			})
			.catch((error) => {
				addNotification({ text: errors[error.code] });
			});
	};

	async function handleCredentialResponse(response) {
		console.log('Encoded JWT ID token: ' + response.credential);
		// Build Firebase credential with the Google ID token.
		const idToken = response.credential;
		const credential = GoogleAuthProvider.credential(idToken);

		// Sign in with credential from the Google user.
		signInWithCredential(auth, credential)
			.catch((error) => {
				// Handle Errors here.
				const errorMessage = error.message;
				// ...
				addNotification({ text: errorMessage });
			})
			.then(async (res) => {
				const { user } = res;
				console.log('signed in with google', user.uid);

				try {
					const docRef = doc(db, 'users', user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						console.log('user already exists');
						goto('/cardview/environment');
					} else {
						setDoc(docRef, {
							avatar: 'responsibility',
							email: email,
							admin: true
						}).then(() => goto('/cardview/environment'));
					}
				} catch (error) {
					console.log(error);
				}
				// goto('/cardview/environment');
			});
	}

	function gl() {}

	onMount(() => {
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleCredentialResponse
		});
		google.accounts.id.renderButton(
			document.getElementById('buttonDiv'),
			{ theme: 'outline', size: 'large', longtitle: true, width: 100 } // customization attributes
		);
		google.accounts.id.prompt(); // also display the One Tap dialog
	});
</script>

<svelte:head>
	<script src="https://apis.google.com/js/platform.js?onload=renderButton"></script>
	<script>
		function renderButton() {
			gapi.signin2.render('buttonDiv', {
				scope: 'profile email',
				width: 240,
				height: 50,
				longtitle: true,
				theme: 'dark',
				onsuccess: onSuccess,
				onfailure: onFailure
			});
		}
	</script>
</svelte:head>
<div class="flex flex-col flex-grow">
	<div class="flex-grow flex flex-col p-12 2xl:p-52">
		<img src="/tickle.svg" alt="tickle-logo" class="flex-grow m-auto" />
	</div>

	<form class="flex flex-col my-auto" action="" method="post" on:submit={(e) => submit(e)}>
		<div class="w-full px-3 flex">
			<input
				class="flex-grow py-2 px-3 mb-3 outline-c-dark-gray
				border-black border-2 custom-shadow"
				bind:value={email}
				type="text"
				id="email"
				placeholder="Email Address"
			/>
		</div>
		<div class="w-full px-3 flex">
			<input
				class=" flex-grow m-auto py-2 px-3 mb-3
				outline-c-dark-gray
				border-black border-2 custom-shadow"
				bind:value={pwd}
				type="password"
				id="password"
				placeholder="Password"
			/>
		</div>

		<div class="w-full px-3 flex mb-1">
			<button
				class="flex-grow m-auto mb-1 px-3 py-3
				font-bold uppercase btn
			 	border-2 border-black custom-shadow
				bg-white hover:bg-c-light-gray"
				type="submit"
			>
				{$_('sign_in.title')}
			</button>
		</div>
		<div class="w-full mt-3 px-3 flex mx-auto items-center">
			<div class="mx-auto" id="buttonDiv" />
		</div>
		<div class="mt-3 mx-auto mb-3">
			Do not have an account ?
			<a href="/register-user" class="underline">Sign Up</a>
		</div>
	</form>
</div>

<style>
	.custom-shadow {
		box-shadow: 5px 5px 5px #a6a29f;
	}
</style>
