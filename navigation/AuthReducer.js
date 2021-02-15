import { act } from "react-test-renderer";

export const AuthReducer = (prevState, action) => {
        switch (action.type){
          case 'REGISTER':
            return {
              ...prevState,
              userId: action.id,
              isLoading: false,
            };
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
              userId: action.id,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
          default:
            return prevState;
        }
}