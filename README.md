# Explorer's Log Web Application

## Description
Explorer's Log is a simple, client-side web application for managing posts. It allows users to create, read, update, and delete posts, with the ability to work offline and sync with a server when online. This application demonstrates the use of local storage and server interactions in a web context.

## Features
- Create new posts locally
- View a list of all posts
- Edit existing posts (both local and server-based)
- Delete posts (marking server posts as deleted locally)
- Search posts by title or content
- Offline functionality with local storage & sync's with server when online

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API
- Fetch API for server communication

## Setup and Installation
Clone the repository:
```bash
git clone https://github.com/nPrameelaPydi/sba-js-web-application.git
```
## Usage
- Adding a Post: Fill in the title and body fields at the top of the page and click "Add Post".
- Editing a Post: Click the "Edit" button on a post, make your changes in the form fields, then click "Update Post".
- Deleting a Post: Click the "Delete" button on a post to remove it.
- Searching Posts: Enter a search term in the search field and click "Search" to filter posts.
- Loading Server Posts: Click the "Load Posts" button to fetch posts from the server and merge them with local posts.

## API Integration
The application is designed to work with a RESTful API. Ensure that your API endpoints match the following structure:
- GET /posts: Fetch all posts
- POST /posts: Create a new post
- PUT /posts/:id: Update an existing post
- DELETE /posts/:id: Delete a post

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
None, not applicable.

## Acknowledgments
This project was created as a demonstration of client-side storage and server synchronization techniques.
Thanks to DummyJSON for providing a fake API for testing purposes.