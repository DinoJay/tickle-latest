<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, addDoc, updateDoc } from 'firebase/firestore';

	export let questions = [];
	export let title = '';

	export let responses;
</script>

<div class=" p-3  overflow-y-auto bg-white">
	{#each questions as q, i}
		<div class={i < questions.length ? 'mb-3' : ''}>
			<p class="text-lg">{q.text}</p>
			<div class="ml-6">
				{#each q.answers as a}
					<div class="flex items-center">
						<div class="mr-1">{a.text}</div>
						<div class="text-lg {responses[q.id][a.text] ? 'text-green-600' : 'text-red-600'}">
							{responses[q.id][a.text] ? '(✓)' : '(x)'}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
