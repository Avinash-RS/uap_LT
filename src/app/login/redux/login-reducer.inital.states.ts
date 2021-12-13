import { loginState } from "./login-model";


export const initialState: loginState = {
  assessmentId: null,
  user: 
  {
    data: {
      id: 0,
      type: '',
      attributes: {
        email: '',
        firstName: '',
        id: 0,
        lastName: '',
        organisations: [
          {
            orgId: 0,
            orgName: '',
            logoUrl:'',
            roles: [
              {
                roleCode: '',
                permissions: [
                  {
                    code: '',
                    description: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    loginId : '',
    token: {
      access_token: '',
      expires_in: 0,
      'not-before-policy': 0,
      refresh_expires_in: 0,
      refresh_token: '',
      scope: '',
      session_state: '',
      token_type: ''  
    }
  //   failureMessage: {
  //     error: {
  //       errors: []
  //     }
  //   }
  }
};
