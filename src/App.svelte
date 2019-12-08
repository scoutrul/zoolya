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
    
    let currentUser
    
    let changeCurrentUser = (user) => {
	    if (user) {
    	    currentUser = 'is admin';
        }
	    else {
	        currentUser = 'not loged'
        }
        logger(currentUser)
    }
    
    const logger = (currentUser) => {
	    console.log(currentUser)
    }

    firebase.initializeApp(firebaseConfig)
</script>

<FirebaseApp {firebase}>
    <User persist={sessionStorage} let:user={user} let:auth={auth}>
        <div slot="loading">Loading</div>
        
        {changeCurrentUser(true)}
        USER is: {currentUser}
        <h1>Рыбный стафф</h1>
        <Collection
                path={'catalog'}
                log
                let:data={categories}
                let:ref={categoriesRef}
        >
            {#each categories as category}
                [Add category]
                <Collection
                        path={`catalog/${category.id}/products`}
                        log
                        let:data={products}
                        let:ref={productsRef}
                >
                    <div>
                        <h2>{category.title}</h2>
                        <div>{category.id} - edit</div>
                    </div>
                    {#each products as product}
                        <h3>{product.title}</h3>
                        <div>{product.id}</div>
                    {/each}
                </Collection>
            {/each}
        </Collection>
        <hr/>
        <button on:click={() => auth.signOut()}>Выйти</button>

        <div slot="signed-out">
            {changeCurrentUser(false)}
            USER is: {currentUser}
            <h1>Рыбный стафф</h1>
            <Collection
                    path={'catalog'}
                    log
                    let:data={categories}
                    let:ref={categoriesRef}
            >
                {#each categories as category}
                    <Collection
                            path={`catalog/${category.id}/products`}
                            log
                            let:data={products}
                            let:ref={productsRef}
                    >
                        <div>
                            <h2>{category.title}</h2>
                            <div>{category.id} - edit</div>
                        </div>
                        {#each products as product}
                            <h3>{product.title}</h3>
                            <div>{product.id}</div>
                        {/each}
                    </Collection>
                {/each}
            </Collection>
            <hr/>
            <button on:click={() => auth.signInAnonymously()}>Админ</button>
        </div>
    </User>
</FirebaseApp>