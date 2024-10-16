// Load posts from local storage
export const loadPostsFromLocalStorage = () => {
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : [];
};

// Save posts to local storage
export const savePostsToLocalStorage = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};
