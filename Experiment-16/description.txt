EXPERIMENT 16: Bank Account Transfer System
==========================================

Project Type: Node.js REST API
Technologies: Express.js, MongoDB, Mongoose
Purpose: Secure money transfer system with balance validation

CORE FEATURES:
- Account management with unique account numbers
- Money transfer between accounts with validation
- Balance checking and insufficient funds prevention
- Rollback mechanism for failed transfers
- Comprehensive error handling

API ENDPOINTS:
- GET /api/health - Health check
- POST /api/users - Create user account
- GET /api/users - Get all users
- POST /api/transfer - Transfer money between accounts
- GET /api/balance/:accountNumber - Check account balance

KEY IMPLEMENTATION:
- Sequential database updates (debit first, then credit)
- Automatic rollback if transfer fails partway
- Input validation for amounts and account numbers
- Prevents same-account transfers and negative amounts

TESTING:
- Comprehensive test suite with sample accounts
- Tests successful transfers, insufficient balance scenarios
- Validates error handling for invalid accounts/amounts

SECURITY FEATURES:
- Balance validation before transfers
- Account existence verification
- Input sanitization and validation
- Data consistency through rollback logic

FILES:
- server.js: Main API server
- models/User.js: User account schema
- test-api.js: Test suite with sample scenarios
- Bank-Transfer-API.postman_collection.json: API testing collection

USAGE:
1. Start MongoDB
2. Run: npm run dev
3. Server runs on http://localhost:3000
4. Test with: npm test

This experiment demonstrates secure financial transaction handling without database-level transactions, using application-level validation and rollback mechanisms.