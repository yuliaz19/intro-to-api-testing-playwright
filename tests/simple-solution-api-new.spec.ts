import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from '../dto/order-dto'

test('PUT order with valid ID = 1 + valid 16-digit API key | 200 OK', async ({ request }) => {
  // prepare request body
  const requestBody = new OrderDto('OPEN', 0, 'Ann', '123456', 'test', 1)
  const requestHeaders = {
    api_key: '1234567891234567',
  }
  // Send a POST request to the server
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT order with valid ID = 10 + valid 16-digit API key | 200 OK', async ({ request }) => {
  // prepare request body
  const requestBody = new OrderDto('OPEN', 0, 'Ann', '123456', 'test', 10)
  const requestHeaders = {
    api_key: '1234567891234567',
  }
  // Send a POST request to the server
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT order with valid ID = 5 + valid 16-digit API key | 200 OK', async ({ request }) => {
  // prepare request body
  const requestBody = new OrderDto('OPEN', 0, 'Ann', '123456', 'test', 5)
  const requestHeaders = {
    api_key: '1234567891234567',
  }
  // Send a POST request to the server
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})
