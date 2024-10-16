
const BASE_URL = 'https://dummyjson.com';

//fetch posts
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


//{
//    "title": "Post Title",
//    "body": "Post Body",
//    "userId": 1 
//}

//create a new post
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


//update endpoint: URL: PUT /posts/{id}
//{
//    "title": "Updated Title",
//    "body": "Updated Body"
//}

//Update post
export const updatePost = (id, title, body) => {
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .catch(error => {
            console.error('Error updating post:', error);
            return null;
        });
}


