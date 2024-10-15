

const BASE_URL = 'https://dummyjson.com';

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


