//fetch('https://dummyjson.com/posts')
//    .then(response => response.json())
//    .then(data => console.log(data))
//    .catch(error => console.error('Error:', error));

//to fetch posts from DummyJSON
const fetchPosts = async () => {
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();
    return data.posts; // Access the posts array
};

fetchPosts().then(posts => {
    console.log(posts); // Log the posts to see the output
});






