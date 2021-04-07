import { UserState } from './user.model';

export const initialState: UserState = {
  user: {
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
    failureMessage: {
      error: {
        errors: []
      }
    }
  }
};
