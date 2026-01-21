// Clear Local Storage Script
// Run this in your browser console to clear all stored data

// Method 1: Clear only TripMaster data
localStorage.removeItem('boys-trip-2026');
console.log('✅ TripMaster localStorage cleared');

// Method 2: Clear ALL localStorage (use with caution)
// localStorage.clear();
// console.log('✅ All localStorage cleared');

// Reload the page
window.location.reload();
