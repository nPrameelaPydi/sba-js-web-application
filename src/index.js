import { fetchPosts, updatePostOnServer, deletePostOnServer } from './api.js';
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
            <button class="edit-btn" data-id="${post.id}">Edit</button>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
            ${post.isLocal ? '<span class="local-indicator"></span>' : ''}`;
        postsContainer.appendChild(postElement);
    });

    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = parseInt(button.getAttribute('data-id'));
            const postToEdit = allPosts.find(p => p.id === postId);

            if (postToEdit) {
                document.getElementById('title').value = postToEdit.title;
                document.getElementById('body').value = postToEdit.body;
                const addButton = document.getElementById('addOrUpdate-btn');
                addButton.textContent = 'Update Post';
                addButton.setAttribute('data-id', postId);
                //after setting the values of the input fields, focus on the title input field
                document.getElementById('title').focus();
            } else {
                alert('Error updating post. Please try again.');
            }
        });
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = parseInt(button.getAttribute('data-id'));
            const postToDelete = allPosts.find(post => post.id === postId);

            if (postToDelete.isLocal) {
                // Delete local post
                allPosts = allPosts.filter(post => post.id !== postId);
                savePostsToLocalStorage(allPosts);
                displayPosts(allPosts);
            } else {
                // Instead of immediately removing the post from the allPosts array, it marks the post as "deleted locally" by adding an isDeletedLocally: true flag to the post object.
                allPosts = allPosts.map(post =>
                    post.id === postId ? { ...post, isDeletedLocally: true } : post
                );
                savePostsToLocalStorage(allPosts);
                displayPosts(allPosts.filter(post => !post.isDeletedLocally));
            }

            //after deleting or marking a post as deleted, clear input fields and focus on the title input
            resetForm();
            document.getElementById('title').focus();
        });
    });
};

// Load initial posts from local storage
allPosts = loadPostsFromLocalStorage();
displayPosts(allPosts.filter(post => !post.isDeletedLocally));

document.getElementById('load-btn').addEventListener('click', async () => {
    const fetchedPosts = await fetchPosts();
    allPosts = [
        ...fetchedPosts.map(post => ({ ...post, isLocal: false })),
        ...allPosts.filter(post => post.isLocal)
    ];
    savePostsToLocalStorage(allPosts);
    displayPosts(allPosts.filter(post => !post.isDeletedLocally));
});

// Event listener for adding/updating posts
document.getElementById('addOrUpdate-btn').addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const addButton = document.getElementById('addOrUpdate-btn');
    const postId = addButton.getAttribute('data-id');

    if (title && body) {
        if (postId) {
            const postToUpdate = allPosts.find(post => post.id === parseInt(postId));

            if (postToUpdate.isLocal) {
                // Update local post
                allPosts = allPosts.map(post =>
                    post.id === parseInt(postId) ? { ...post, title, body } : post
                );
                savePostsToLocalStorage(allPosts);
                displayPosts(allPosts.filter(post => !post.isDeletedLocally));
            } else {
                // Update server post
                try {
                    const updatedPost = await updatePostOnServer(postId, title, body);
                    if (updatedPost) {
                        allPosts = allPosts.map(post =>
                            post.id === parseInt(postId) ? { ...updatedPost, isLocal: false } : post
                        );
                        savePostsToLocalStorage(allPosts);
                        displayPosts(allPosts.filter(post => !post.isDeletedLocally));
                    } else {
                        throw new Error('Failed to update post on server');
                    }
                } catch (error) {
                    console.error('Error updating post on server:', error);
                    // Fallback to local update if server update fails
                    allPosts = allPosts.map(post =>
                        post.id === parseInt(postId) ? { ...post, title, body, isModifiedLocally: true } : post
                    );
                    savePostsToLocalStorage(allPosts);
                    displayPosts(allPosts.filter(post => !post.isDeletedLocally));
                    alert('Failed to update post on server. Changes saved locally.');
                }
            }
            resetForm();
        } else {
            // Create new local post
            const newPost = { id: Date.now(), title, body, isLocal: true };
            allPosts.unshift(newPost);
            savePostsToLocalStorage(allPosts);
            displayPosts(allPosts.filter(post => !post.isDeletedLocally));
            resetForm();
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
        !post.isDeletedLocally &&
        (post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm))
    );
    displayPosts(filteredPosts);
});
