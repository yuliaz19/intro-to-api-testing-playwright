import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'

test.describe('Positive and negative tests for POST/login/student', () => {
  test('should return valid token with correct username and password', async ({ request }) => {
    // Prepare request body
    const requestBody = LoginDto.createLoginDto()
    // Send a POST request to the server
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    // Create constant for response body
    const jwtValue = await response.text()
    // Define the regular expression for validating JWT token structure
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    // Log the response body and token
    console.log('response body and token:', jwtValue)
    // Check StatusCode
    expect(response.status()).toBe(StatusCodes.OK)
    // Check that JWT is valid
    expect(jwtValue).toMatch(jwtRegex)
  })

  test('should not return token with incorrect username and password', async ({ request }) => {
    // prepare request body
    const requestBody = new LoginDto('zimovnova', '')
    // Send a PUT request to the server
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    // Log the response status and body
    console.log('response body and token:', await response.text())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not return token by sending a request with an incorrect HTTP method PUT', async ({
    request,
  }) => {
    // Prepare request body
    const requestBody = LoginDto.createLoginDto()
    // Send a incorrect request PUT to the server
    const response = await request.put('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    // Log the response body
    console.log('response body:', await response.json())
    // Check StatusCode
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('should not return token by sending a request with an incorrect HTTP method GET', async ({
    request,
  }) => {
    // Prepare request body
    const requestBody = LoginDto.createLoginDto()
    // Send a incorrect request GET to the server
    const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    // Log the response body
    console.log('response body:', await response.json())
    // Check StatusCode
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('should not return token by sending a request with an incorrect body structure (only username)', async ({
    request,
  }) => {
    // Prepare request body
    const requestBody = LoginDto.createLoginDto()
    // Create request body with incorrect structure
    const invalidRequestBody = { username: requestBody.username }
    // Send a incorrect request  to the server
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: invalidRequestBody,
    })
    // Log the response body
    console.log('response body:', await response.text())
    // Check StatusCode
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not return token by sending a request with an incorrect body structure (only password)', async ({
    request,
  }) => {
    // Prepare request body
    const requestBody = LoginDto.createLoginDto()
    // Create request body with incorrect structure
    const invalidRequestBody = { password: requestBody.password }
    // Send a incorrect request  to the server
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: invalidRequestBody,
    })
    // Log the response body
    console.log('response body:', await response.text())
    // Check StatusCode
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
