const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Helper function to make API calls
async function apiCall(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
}

async function runTests() {
  console.log('🏦 Bank Transfer System API Tests\n');
  
  // Test 1: Health check
  console.log('1. Health Check:');
  const health = await apiCall('GET', '/health');
  console.log(JSON.stringify(health, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Create sample user accounts
  console.log('2. Creating Sample User Accounts:');
  
  const users = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      accountNumber: 'ACC001',
      balance: 1000
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      accountNumber: 'ACC002',
      balance: 500
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      accountNumber: 'ACC003',
      balance: 0
    }
  ];
  
  for (const user of users) {
    const result = await apiCall('POST', '/users', user);
    console.log(`Creating ${user.name}:`, result.success ? '✅ Success' : '❌ Failed');
    if (!result.success) {
      console.log('Error:', result.message);
    }
  }
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Get all users
  console.log('3. Current User Accounts:');
  const allUsers = await apiCall('GET', '/users');
  if (allUsers.success) {
    allUsers.data.forEach(user => {
      console.log(`${user.name} (${user.accountNumber}): $${user.balance}`);
    });
  }
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Successful transfer
  console.log('4. Testing Successful Transfer (Alice → Bob, $200):');
  const successfulTransfer = await apiCall('POST', '/transfer', {
    fromAccount: 'ACC001',
    toAccount: 'ACC002',
    amount: 200
  });
  console.log(JSON.stringify(successfulTransfer, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 5: Check balances after successful transfer
  console.log('5. Balances After Successful Transfer:');
  const aliceBalance = await apiCall('GET', '/balance/ACC001');
  const bobBalance = await apiCall('GET', '/balance/ACC002');
  console.log('Alice:', aliceBalance.success ? `$${aliceBalance.data.balance}` : 'Error');
  console.log('Bob:', bobBalance.success ? `$${bobBalance.data.balance}` : 'Error');
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 6: Failed transfer - Insufficient balance
  console.log('6. Testing Failed Transfer - Insufficient Balance (Alice → Bob, $2000):');
  const insufficientTransfer = await apiCall('POST', '/transfer', {
    fromAccount: 'ACC001',
    toAccount: 'ACC002',
    amount: 2000
  });
  console.log(JSON.stringify(insufficientTransfer, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 7: Failed transfer - Account not found
  console.log('7. Testing Failed Transfer - Account Not Found (INVALID → Bob, $100):');
  const invalidTransfer = await apiCall('POST', '/transfer', {
    fromAccount: 'INVALID',
    toAccount: 'ACC002',
    amount: 100
  });
  console.log(JSON.stringify(invalidTransfer, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 8: Failed transfer - Same account
  console.log('8. Testing Failed Transfer - Same Account (Alice → Alice, $100):');
  const sameAccountTransfer = await apiCall('POST', '/transfer', {
    fromAccount: 'ACC001',
    toAccount: 'ACC001',
    amount: 100
  });
  console.log(JSON.stringify(sameAccountTransfer, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 9: Failed transfer - Invalid amount
  console.log('9. Testing Failed Transfer - Invalid Amount (Alice → Bob, $0):');
  const invalidAmountTransfer = await apiCall('POST', '/transfer', {
    fromAccount: 'ACC001',
    toAccount: 'ACC002',
    amount: 0
  });
  console.log(JSON.stringify(invalidAmountTransfer, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 10: Final balances
  console.log('10. Final Account Balances:');
  const finalUsers = await apiCall('GET', '/users');
  if (finalUsers.success) {
    finalUsers.data.forEach(user => {
      console.log(`${user.name} (${user.accountNumber}): $${user.balance}`);
    });
  }
  
  console.log('\n All tests completed!');
}

// Run tests only if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, apiCall };