const BASE_URL = 'https://dummyjson.com';

// Fetch posts
export const fetchPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.posts; // Access the posts array
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};

// Create a new post
export const createPost = async (title, body) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, userId: 1 }),
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const newPost = await response.json();
        return newPost;
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
};

// Update post
export const updatePost = async (id, title, body) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error);
        return null;
    }
};
