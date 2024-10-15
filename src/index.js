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

import { fetchPosts } from './api.js';

document.getElementById('load-btn').addEventListener('click', async () => {
    const posts = await fetchPosts();
    displayPosts(posts); //function call to display posts
});

// Function to display posts in the UI or appView
const displayPosts = (posts) => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postsContainer.appendChild(postElement);
    });
};




