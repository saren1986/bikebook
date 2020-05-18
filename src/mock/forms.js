const forms = {
  addBike: {
    form: {
      label: 'Add new bike',
    },
    inputs: [
      {
        id: 'name',
        type: 'text',
        default: '',
        label: 'Bike name',
        validation: {
          type: 'string',
          required: true,
          rules: [
            {
              key: 'required',
              params: ['This field is required'],
            },
            {
              key: 'min',
              params: [2, 'cannot be less than 2 characters'],
            },
            {
              key: 'max',
              params: [25, 'cannot be more than 25 characters'],
            },
          ],
        },
        uiStyle: {
          width: {
            xs: 12,
            sm: 6,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
      {
        id: 'type',
        type: 'select',
        default: '',
        label: 'Bike type',
        selectOption: [
          {
            id: '1',
            type: 'road',
            label: 'Road',
          },
          {
            id: '2',
            type: 'mtb',
            label: 'MTB',
          },
          {
            id: '3',
            type: 'cross',
            label: 'Cross',
          },
          {
            id: '4',
            type: 'city',
            label: 'City',
          },
        ],
        validation: {
          type: 'string',
          required: true,
          rules: [
            {
              key: 'required',
              params: ['This field is required'],
            },
          ],
        },
        uiStyle: {
          width: {
            xs: 12,
            sm: 6,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
      {
        id: 'brand',
        type: 'text',
        default: '',
        label: 'Brand name',
        validation: {
          type: 'string',
          required: false,
          rules: [],
        },
        uiStyle: {
          width: {
            xs: 12,
            sm: 6,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
      {
        id: 'model',
        type: 'text',
        default: '',
        label: 'Model',
        validation: {
          type: 'string',
          required: false,
          rules: [],
        },
        uiStyle: {
          width: {
            xs: 12,
            sm: 6,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
      {
        id: 'frameWeight',
        type: 'number',
        default: '',
        label: 'Frame mass /',
        validation: {
          type: 'string',
          required: false,
          rules: [
            {
              key: 'moreThan',
              params: [0, 'Can\'t be less than 0!'],
            },
          ],
        },
        uiStyle: {
          width: {
            xs: 12,
            sm: 6,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
      {
        id: 'distance',
        type: 'number',
        default: '',
        label: 'Distance / ',
        validation: {
          type: 'string',
          required: false,
          rules: [
            {
              key: 'required',
              params: ['This field is required'],
            },
            {
              key: 'moreThan',
              params: [-1, 'Can\'t be less than 0!'],
            },
          ],
        },
        uiStyle: {
          width: {
            xs: 12,
            sm: 6,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
      {
        id: 'description',
        type: 'text',
        default: '',
        label: 'Description',
        validation: {
          type: 'string',
          required: false,
          rules: [],
        },
        uiStyle: {
          width: {
            xs: 12,
          },
          inputDesign: {
            margin: 'normal',
            variant: 'outlined',
          },
        },
      },
    ],
    button: {
      label: 'Add new bike',
      variant: 'outlined',
      color: 'primary',
      type: 'submit',
    },
  },
};

export default forms;
