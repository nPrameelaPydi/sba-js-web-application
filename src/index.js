//fetch('https://dummyjson.com/posts')
//    .then(response => response.json())
//    .then(data => console.log(data))
//    .catch(error => console.error('Error:', error));

////to fetch posts from DummyJSON
//const fetchPosts = async () => {
//    const response = await fetch('https://dummyjson.com/posts');
//    const data = await response.json();
//    return data.posts; // Access the posts array
//};

//fetchPosts().then(posts => {
//    console.log(posts); // Log the posts to see the output
//});


// src/index.js

import { fetchPosts, createPost, updatePost } from './api.js';
import { loadPostsFromLocalStorage, savePostsToLocalStorage } from './storage.js';

let allPosts = [];

////load posts from local storage
//const loadPostsFromLocalStorage = () => {
//    const storedPosts = localStorage.getItem('posts');
//    return storedPosts ? JSON.parse(storedPosts) : [];
//};

// Load initial posts from local storage
allPosts = loadPostsFromLocalStorage();
displayPosts(allPosts);

document.getElementById('load-btn').addEventListener('click', async () => {
    // Fetch posts from the API
    const fetchedPosts = await fetchPosts();

    // Combine fetched posts with any new posts in allPosts
    //allPosts = [...fetchedPosts, ...allPosts]; // Prepend existing posts with newly fetched posts

    // Update allPosts to include newly fetched posts followed by existing posts
    allPosts = loadPostsFromLocalStorage();
    allPosts = [...allPosts, ...fetchedPosts.filter(post => !allPosts.find(p => p.id === post.id))];

    // Save combined posts to local storage
    savePostsToLocalStorage(allPosts);

    displayPosts(allPosts); // Display the posts
});



//function to display posts in the UI or appView
const displayPosts = (posts) => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="edit-btn" data-id="${post.id}">Edit</button>`;
        postsContainer.appendChild(postElement);
    });

    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.getAttribute('data-id');
            const postToEdit = allPosts.find(p => p.id === parseInt(postId));
            document.getElementById('title').value = postToEdit.title;
            document.getElementById('body').value = postToEdit.body;

            // Update the add button to update post
            const addButton = document.getElementById('addOrUpdate');
            addButton.textContent = 'Update Post';
            addButton.setAttribute('data-id', postId);
        });
    });
};



////save posts to local storage
//const savePostsToLocalStorage = (posts) => {
//    localStorage.setItem('posts', JSON.stringify(posts));
//};

// Load initial posts from local storage
allPosts = loadPostsFromLocalStorage();

// Display posts from local storage on initial load
displayPosts(allPosts);



// Event listener to add/update a post
document.getElementById('addOrUpdate').addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const addButton = document.getElementById('addOrUpdate');

    if (title && body) {
        if (addButton.getAttribute('data-id')) {
            // Update post
            const postId = addButton.getAttribute('data-id');
            const updatedPost = await updatePost(postId, title, body);
            if (updatedPost) {
                allPosts = allPosts.map(post => (post.id === parseInt(postId) ? updatedPost : post));
                savePostsToLocalStorage(allPosts);
                displayPosts(allPosts);
                resetForm();
            }
        } else {
            // Create new post
            const newPost = await createPost(title, body);
            if (newPost) {
                allPosts.unshift(newPost);
                savePostsToLocalStorage(allPosts);
                displayPosts(allPosts);
                resetForm();
            }
        }
    } else {
        alert('Please fill in both fields');
    }
});

// Reset form function
const resetForm = () => {
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    const addButton = document.getElementById('addOrUpdate');
    addButton.textContent = 'Add Post';
    addButton.removeAttribute('data-id');
};


//event listener for searching posts basing on title
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm)
    );
    displayPosts(filteredPosts); //display filtered posts
});







