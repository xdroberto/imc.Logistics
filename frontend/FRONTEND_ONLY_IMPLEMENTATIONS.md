# Temporary Frontend-Only Implementations

This document lists the implementations that are for frontend development only and should be replaced or removed when integrating with a real backend.

## 1. ID Generation for Shipments and Comments

**Location**: `components/AdminShipments.tsx`

**Description**: Currently, IDs for shipments and comments are generated in the frontend as follows:
- For shipments: The last ID from the shipments list is taken, the number is extracted and incremented by one.
- For comments: The number of existing comments plus one is used.

**Reason**: This implementation simulates auto-incrementing IDs for frontend development.

**Required action for production**: 
- Remove the ID generation logic from the frontend.
- Implement ID generation in the backend, possibly using a database sequence or UUIDs.

## 2. Date Assignment for New Shipments and Comments

**Location**: `components/AdminShipments.tsx`

**Description**: The creation date for a new shipment or comment is assigned in the frontend using `new Date().toLocaleString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })`.

**Reason**: This allows assigning a current date for new shipments and comments during frontend development.

**Required action for production**:
- Remove date assignment in the frontend.
- Implement date assignment in the backend to ensure accuracy and consistency.

## 3. Local State Management for Shipments and Comments

**Location**: `components/AdminShipments.tsx`

**Description**: Shipments and comments are managed with React's local state (`useState`) and modified directly in the component.

**Reason**: Allows data manipulation for demonstration without needing a backend.

**Required action for production**:
- Replace local state management with calls to a real API.
- Implement error handling and loading states for network operations.

## 4. Authenticated User Simulation

**Location**: `components/AdminShipments.tsx`

**Description**: When adding a comment, "Admin" is used as the default author.

**Reason**: Simulates an authenticated user for frontend development.

**Required action for production**:
- Implement a real authentication system.
- Obtain the authenticated user's name from the authentication system when adding comments.

---

Note: This document should be reviewed and updated regularly during development. All implementations listed here must be addressed before backend integration and deployment to production.

