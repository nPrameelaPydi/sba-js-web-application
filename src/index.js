import { fetchPosts, createPost, updatePost } from './api.js';
import { loadPostsFromLocalStorage, savePostsToLocalStorage } from './storage.js';

let allPosts = [];

// Function to display posts
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
            if (postToEdit) {
                document.getElementById('title').value = postToEdit.title;
                document.getElementById('body').value = postToEdit.body;
                const addButton = document.getElementById('addOrUpdate-btn');
                addButton.textContent = 'Update Post';
                addButton.setAttribute('data-id', postId);
            }
        });
    });
};

// Load initial posts from local storage
allPosts = loadPostsFromLocalStorage();
displayPosts(allPosts);

document.getElementById('load-btn').addEventListener('click', async () => {
    const fetchedPosts = await fetchPosts();
    allPosts = [...fetchedPosts, ...allPosts.filter(post => !fetchedPosts.find(p => p.id === post.id))];
    savePostsToLocalStorage(allPosts);
    displayPosts(allPosts);
});

// Event listener for adding/updating posts
document.getElementById('addOrUpdate-btn').addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const addButton = document.getElementById('addOrUpdate-btn');
    const postId = addButton.getAttribute('data-id');

    if (title && body) {
        if (postId) {
            // Update post
            const updatedPost = await updatePost(postId, title, body);
            if (updatedPost) {
                allPosts = allPosts.map(post => (post.id === parseInt(postId) ? updatedPost : post));
                savePostsToLocalStorage(allPosts);
                displayPosts(allPosts);
                resetForm();
            } else {
                alert('Error updating post. Please try again.');
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
    const addButton = document.getElementById('addOrUpdate-btn');
    addButton.textContent = 'Add Post';
    addButton.removeAttribute('data-id');
};

// Event listener for searching posts based on title
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm)
    );
    displayPosts(filteredPosts);
});
