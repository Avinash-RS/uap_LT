import { ReferenceState } from './reference-data.model';

export const initialState: ReferenceState = {
  reference: {
    id: '',
    type: '',
    attributes: [
      {
        category: {
          name: '',
          refData: [
            {
              code: '',
              decode: '',
              description: '',
              category: '',
              children: []
            }
          ]
        }
      }
    ]
  },
  categoryWithMenuOptions: {
    data: [
      {
        name: '',
        menuOptions: [
          {
            code: '',
            decode: ''
          }
        ]
      }
    ]
  }
};
