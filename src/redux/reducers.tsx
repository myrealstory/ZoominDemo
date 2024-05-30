import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './slice/product'; // Import the missing productSlice

const rootReducer = combineReducers({
    product: productReducer,
});

export default rootReducer;