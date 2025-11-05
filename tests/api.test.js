const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Books API', () => {
  // Test GET /api/books
  test('GET /api/books should return all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /api/books/:id with a valid ID
  test('GET /api/books/:id should return a single book', async () => {
    const response = await request(app).get('/api/books/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  // Test GET /api/books/:id with an invalid ID
  test('GET /api/books/:id with invalid ID should return 404', async () => {
    const response = await request(app).get('/api/books/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Book not found');
  });

  // Test POST /api/books
  test('POST /api/books should create a new book', async () => {
    const newBook = {
      title: "Test Book",
      author: "Test Author",
      genre: "Test Genre",
      copiesAvailable: 5
    };
    const response = await request(app).post('/api/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Book');
  });

  // Test PUT /api/books/:id
  test('PUT /api/books/:id should update an existing book', async () => {
    const updatedBook = {
      title: "Updated Book",
      author: "Updated Author",
      genre: "Updated Genre",
      copiesAvailable: 10
    };
    const response = await request(app).put('/api/books/1').send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Book');
  });

  // Test DELETE /api/books/:id
  test('DELETE /api/books/:id should delete a book', async () => {
    const response = await request(app).delete('/api/books/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Book deleted successfully');
  });
});