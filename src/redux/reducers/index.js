import { combineReducers } from "redux";

// Import reducers here


// Tạo ra biến rootReducer để lưu trữ các reducers
// Hàm combineReducer dùng để tạo ra một reducer chung cho các reducer do hàm createStore chỉ nhận vào một tham số
const rootReducer = combineReducers({
	// Reducers to combine
});

export default rootReducer;