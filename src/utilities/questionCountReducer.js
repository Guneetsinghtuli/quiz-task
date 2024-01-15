const questionCountReducer = (state, action) => {
    switch (action.type) {
      case "NEXT_QUESTION":
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
      case "NAVIGATE_QUESTION":
        return { ...state, currentQuestionIndex: action.payload };
      default:
        return state;
    }
  };
  
  export default questionCountReducer;
  