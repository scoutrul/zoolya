<script>
    import { FirebaseApp, User, Doc, Collection } from 'sveltefire';
    import firebase from "firebase/app";
    import 'firebase/firestore';
    import 'firebase/auth';
    import 'firebase/performance';
    import 'firebase/analytics';

	const firebaseConfig = {
        apiKey: "AIzaSyDeAhEFGL7QBS4u21ufr3K1cDqcFyo7TDI",
        authDomain: "zoolya.firebaseapp.com",
        databaseURL: "https://zoolya.firebaseio.com",
        projectId: "zoolya",
        storageBucket: "zoolya.appspot.com",
        messagingSenderId: "1065320094276",
        appId: "1:1065320094276:web:6f32c78bf0bfa08d67fa11"
    }

    firebase.initializeApp(firebaseConfig)
    let user = 'user';
</script>

<FirebaseApp {firebase}>
    <h1>Рыбный стафф</h1>

    <User let:user let:auth>

        <p>Howdy, {user.uid}</p>
        <button on:click={() => auth.signOut()}>Выйти</button>
    
        <div slot="signed-out">
          <button on:click={() => auth.signInAnonymously()}>Админ</button>
        </div>
    
        <Doc path={`categories/ikra`} let:data={ikra} let:ref={ikraRef} log>
    
          <h2>{ikra.title}</h2>
    
          <span slot="loading">Loading ikra...</span>
          <span slot="fallback">
            <p>Demo ikra not created yet...</p>
    
            <button on:click={() => ikraRef.set({ title: 'I like Svelte' })}>
              Create it Now
            </button>
          </span>
    
          <!-- 4. 💬 Get all the comments in its subcollection -->
          <Collection
            path={ikraRef.collection('comments')}
            let:data={comments}
            let:ref={commentsRef}
            log>
            
            {#each comments as comment}
              <p>{comment.text}</p>
              <button on:click={() => comment.ref.delete()}>Delete</button>
            {/each}
    
            <hr />
    
            <button on:click={() => commentsRef.add({ text: 'Cool!' })}>
              Add Comment
            </button>
    
            <span slot="loading">Loading comments...</span>
    
          </Collection>
        </Doc>
     </User>
</FirebaseApp>