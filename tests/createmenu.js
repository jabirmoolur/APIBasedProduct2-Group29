const request = require('supertest');
const app = require('../app'); // assuming your app is in app.js

describe('Menus API', () => {
  describe('POST /api/v1/eats/stores/:storeId/menus', () => {
    it('should create a new menu', async () => {
      const storeId = 123;
      const menuData = {
        name: 'Summer Menu',
        description: 'Our seasonal menu featuring fresh summer ingredients',
        items: [
          {
            foodItemId: '12345',
            name: 'Grilled Chicken Salad',
            price: 12.99,
            description: 'Mixed greens, grilled chicken, cherry tomatoes, and balsamic vinaigrette'
          },
          {
            foodItemId: '67890',
            name: 'Summer Soup',
            price: 6.99,
            description: 'Creamy tomato soup with a hint of basil'
          },
          {
            foodItemId: '34567',
            name: 'Grilled Steak Sandwich',
            price: 14.99,
            description: 'Grilled steak, lettuce, tomato, and mayo on a toasted baguette'
          }
        ],
        tags: ['summer', 'seasonal', 'fresh'],
        image: 'https://example.com/menu-image.jpg',
        status: 'active'
      };

      const response = await request(app)
        .post(`/api/v1/eats/stores/${storeId}/menus`)
        .send(menuData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', menuData.name);
      expect(response.body).toHaveProperty('description', menuData.description);
      expect(response.body).toHaveProperty('items');
      expect(response.body.items).toHaveLength(menuData.items.length);
    });

    it('should return an error if storeId is missing', async () => {
      const menuData = {
        name: 'Summer Menu',
        description: 'Our seasonal menu featuring fresh summer ingredients',
        items: [
          {
            foodItemId: '12345',
            name: 'Grilled Chicken Salad',
            price: 12.99,
            description: 'Mixed greens, grilled chicken, cherry tomatoes, and balsamic vinaigrette'
          }
        ]
      };

      const response = await request(app)
        .post('/api/v1/eats/stores//menus')
        .send(menuData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('storeId is required');
    });
  });
});

describe('GET /api/v1/eats/stores/:storeId/menus/:menuId', () => {
    it('should return a single menu', async () => {
      const storeId = 123;
      const menuId = 1;
  
      const response = await request(app)
        .get(`/api/v1/eats/stores/${storeId}/menus/${menuId}`)
        .expect(200);
  
      expect(response.body).toHaveProperty('id', menuId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('items');
    });
  
    it('should return an error if storeId is missing', async () => {
      const menuId = 1;
  
      const response = await request(app)
        .get(`/api/v1/eats/stores//menus/${menuId}`)
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('storeId is required');
    });
  
    it('should return an error if menuId is missing', async () => {
      const storeId = 123;
  
      const response = await request(app)
        .get(`/api/v1/eats/stores/${storeId}/menus/`)
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('menuId is required');
    });
  
    it('should return an error if menuId is invalid', async () => {
      const storeId = 123;
      const menuId = ' invalid-menu-id ';
  
      const response = await request(app)
        .get(`/api/v1/eats/stores/${storeId}/menus/${menuId}`)
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid menuId');
    });
  });
  
  describe('PUT /api/v1/eats/stores/:storeId/menus/:menuId', () => {
    it('should update a single menu', async () => {
      const storeId = 123;
      const menuId = 1;
      const updatedMenuData = {
        name: 'Updated Menu Name',
        description: 'Updated menu description',
        items: [
          {
            foodItemId: '12345',
            name: 'Updated Food Item Name',
            price: 12.99,
            description: 'Updated food item description'
          }
        ]
      };
  
      const response = await request(app)
        .put(`/api/v1/eats/stores/${storeId}/menus/${menuId}`)
        .send(updatedMenuData)
        .expect(200);
  
      expect(response.body).toHaveProperty('id', menuId);
      expect(response.body).toHaveProperty('name', updatedMenuData.name);
      expect(response.body).toHaveProperty('description', updatedMenuData.description);
      expect(response.body).toHaveProperty('items');
    });
  
    it('should return an error if storeId is missing', async () => {
      const menuId = 1;
      const updatedMenuData = {
        name: 'Updated Menu Name',
        description: 'Updated menu description',
        items: [
          {
            foodItemId: '12345',
            name: 'Updated Food Item Name',
            price: 12.99,
            description: 'Updated food item description'
          }
        ]
      };
  
      const response = await request(app)
        .put(`/api/v1/eats/stores//menus/${menuId}`)
        .send(updatedMenuData)
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('storeId is required');
    });
  
    it('should return an error if menuId is missing', async () => {
      const storeId = 123;
      const updatedMenuData = {
        name: 'Updated Menu Name',
        description: 'Updated menu description',
        items: [
          {
            foodItemId: '12345',
            name: 'Updated Food Item Name',
            price: 12.99,
            description: 'Updated food item description'
          }
        ]
      };
  
      const response = await request(app)
        .put(`/api/v1/eats/stores/${storeId}/menus/`)
        .send(updatedMenuData)
        .expect(400);
  
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('menuId is required');
    });
  
    it('should return an error if menuId is invalid', async () => {
      const storeId = 123;
      const menuId = ' invalid-menu-id ';
      const updatedMenuData = {
        name: 'Updated Menu Name',
        description: 'Updated menu description',
        items: [
          {
            foodItemId: '12345',
            name: 'Updated Food Item Name',
            price: 12.99,
            description: 'Updated food item description'
            it('should return an error if menuId is invalid', async () => {
                const storeId = 123;
                const menuId = ' invalid-menu-id ';
                const updatedMenuData = {
                  name: 'Updated Menu Name',
                  description: 'Updated menu description',
                  items: [
                    {
                      foodItemId: '12345',
                      name: 'Updated Food Item Name',
                      price: 12.99,
                      description: 'Updated food item description'
                    }
                  ]
                };
            
                const response = await request(app)
                  .put(`/api/v1/eats/stores/${storeId}/menus/${menuId}`)
                  .send(updatedMenuData)
                  .expect(400);
            
                expect(response.body).toHaveProperty('error');
                expect(response.body.error).toBe('Invalid menuId');
              });
            });
            
            describe('DELETE /api/v1/eats/stores/:storeId/menus/:menuId', () => {
              it('should delete a single menu', async () => {
                const storeId = 123;
                const menuId = 1;
            
                const response = await request(app)
                  .delete(`/api/v1/eats/stores/${storeId}/menus/${menuId}`)
                  .expect(204);
            
                expect(response.body).toBeUndefined();
              });
            
              it('should return an error if storeId is missing', async () => {
                const menuId = 1;
            
                const response = await request(app)
                  .delete(`/api/v1/eats/stores//menus/${menuId}`)
                  .expect(400);
            
                expect(response.body).toHaveProperty('error');
                expect(response.body.error).toBe('storeId is required');
              });
            
              it('should return an error if menuId is missing', async () => {
                const storeId = 123;
            
                const response = await request(app)
                  .delete(`/api/v1/eats/stores/${storeId}/menus/`)
                  .expect(400);
            
                expect(response.body).toHaveProperty('error');
                expect(response.body.error).toBe('menuId is required');
              });
            
              it('should return an error if menuId is invalid', async () => {
                const storeId = 123;
                const menuId = ' invalid-menu-id ';
            
                const response = await request(app)
                  .delete(`/api/v1/eats/stores/${storeId}/menus/${menuId}`)
                  .expect(400);
            
                expect(response.body).toHaveProperty('error');
                expect(response.body.error).toBe('Invalid menuId');
              });
            });