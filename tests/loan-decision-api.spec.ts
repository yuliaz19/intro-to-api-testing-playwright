import { LoanDecisionDto } from '../dto/loandecision-dto'
import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const url = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('min meanings for income, debt, age and loanperiod should get 200 OK with High risk and positive decision', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(1, 0, 17, true, 1, 3)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  const responseBody = await response.json()
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([3, 6])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('some valid meanings for income, debt, age and loanperiod should get 200 OK with Medium risk and positive decision', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(2, 1, 30, true, 1, 6)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  const responseBody = await response.json()
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('some valid meanings for income, debt, age and loanperiod should get 200 OK with Low risk and positive decision', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(1000, 100, 40, true, 500, 12)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  const responseBody = await response.json()
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskPeriods).toEqual([12, 18, 24, 30, 36])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('some valid meanings for income, debt, age and loanperiod + unemployed should get 200 OK with Medium risk and positive decision', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(1000, 100, 40, false, 500, 9)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  const responseBody = await response.json()
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('some valid meanings for income, debt, age and loanperiod should get 200 OK with negative decision', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(10, 100, 25, true, 10000, 18)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  const responseBody = await response.json()
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('negative')
})

test('invalid income = 0 should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(0, 100, 40, true, 500, 12)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('invalid income < 0  should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(-100, 0, 65, true, 500, 24)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('invalid debt < 0  should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(1000, -10, 65, true, 500, 30)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('invalid loanAmount = 0 should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(100, 0, 18, false, 0, 3)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('invalid loanPeriod = 0 should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(1000, 0, 18, false, 100, 0)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('invalid loanAmount < 0 should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(100, 0, 18, false, -10, 3)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('invalid loanPeriod < 0 should get 400 Bad request', async ({ request }) => {
  // prepare request body
  const requestBody = new LoanDecisionDto(1000, 0, 18, false, 100, -3)
  // send POST request to the server
  const response = await request.post(url, {
    data: requestBody,
  })
  // log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  // validate status and body
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
