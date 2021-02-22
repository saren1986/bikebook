const defaultState = {
  login: [
    {
      id: 'username',
      type: 'text',
      default: '',
      label: 'Username',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
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
          sm: 12,
        },
        inputDesign: {
          margin: 'normal',
          variant: 'outlined',
        },
      },
    },
    {
      id: 'password',
      type: 'password',
      default: '',
      label: 'Password',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
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
          sm: 12,
        },
        inputDesign: {
          margin: 'normal',
          variant: 'outlined',
        },
      },
    },
  ],
  addBike: [
    {
      id: 'name',
      type: 'text',
      default: '',
      label: 'Bike name',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
      id: 'weight',
      type: 'number',
      seedType: 'weight',
      default: '',
      label: 'Frame mass /',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
      validation: {
        type: 'number',
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
      seedType: 'distance',
      default: '',
      label: 'Distance / ',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'number',
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
          multiline: true,
          rows: 4,
        },
      },
    },
  ],
  components: [
    {
      id: 'bikeId',
      type: 'select',
      default: '',
      label: 'Bike',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
      selectOption: [],
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
          sm: 12,
        },
        inputDesign: {
          margin: 'normal',
          variant: 'outlined',
        },
      },
    },
    {
      id: 'type',
      type: 'autocomplete',
      default: null,
      label: 'Component type',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
      selectOption: [
        {
          id: '1',
          label: 'Front Wheel',
        },
        {
          id: '2',
          label: 'Rear Wheel',
        },
        {
          id: '3',
          label: 'Fork',
        },
        {
          id: '4',
          label: 'Saddle',
        },
        {
          id: '5',
          label: 'Cassette',
        },
        {
          id: '6',
          label: 'Chain',
        },
        {
          id: '7',
          label: 'Pedals',
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
      id: 'weight',
      type: 'number',
      seedType: 'weight',
      default: '',
      label: 'Weight /',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
      validation: {
        type: 'number',
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
      id: 'startDate',
      type: 'date',
      default: () => new Date(),
      label: 'Installed',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: {
        checkboxId: 'fromBegining',
        default: 'enabled',
      },
      validation: {
        type: 'date',
        disableFuture: true,
        disablePast: false,
        required: true,
        rules: [
          {
            key: 'min',
            params: ['2010-01-01', 'The date cannot be earlier than 2010'],
          },
          {
            key: 'max',
            params: [() => new Date(), 'The date cannot be from the future!'],
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
      seedType: 'distance',
      default: 0,
      label: 'Distance / ',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'number',
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
      id: 'fromBegining',
      type: 'checkbox',
      default: false,
      label: 'On the bike from the beginning',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'boolean',
        required: false,
        rules: [
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
          multiline: true,
          rows: 4,
        },
      },
    },
  ],
  activity: [
    {
      id: 'title',
      type: 'text',
      default: '',
      label: 'Title',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
            params: [150, 'cannot be more than 150 characters'],
          },
        ],
      },
      uiStyle: {
        width: {
          xs: 12,
          sm: 12,
        },
        inputDesign: {
          margin: 'normal',
          variant: 'outlined',
        },
      },
    },
    {
      id: 'bikeId',
      type: 'select',
      default: '',
      label: 'Bike',
      edit: {
        visible: true,
        editable: false,
      },
      controlledBy: null,
      selectOption: [],
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
      id: 'distance',
      type: 'number',
      seedType: 'distance',
      default: 1,
      label: 'Distance / ',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
      validation: {
        type: 'number',
        required: true,
        rules: [
          {
            key: 'required',
            params: ['This field is required'],
          },
          {
            key: 'moreThan',
            params: [0, 'Can\'t be less or equal 0!'],
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
      id: 'movingTime',
      type: 'string',
      default: '00:01',
      label: 'Activity Time / HH:MM',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
      validation: {
        type: 'string',
        required: false,
        rules: [
          {
            key: 'required',
            params: ['This field is required'],
          },
          {
            key: 'matches',
            params: [/^(\d{2}):([0-5][0-9])$/, 'Time should be HH:MM format!'],
          },
          {
            key: 'matches',
            params: [/^(?!00:00$)/, 'Time have to be more than 00:00!'],
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
      id: 'startDate',
      type: 'date',
      default: () => new Date(),
      label: 'Activity date',
      edit: {
        visible: true,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'date',
        disableFuture: true,
        disablePast: false,
        required: true,
        rules: [
          {
            key: 'min',
            params: ['2010-01-01', 'The date cannot be earlier than 2010'],
          },
          {
            key: 'max',
            params: [() => new Date().toJSON(), 'The date cannot be from the future!'],
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
  ],
  distanceAlert: [
    {
      id: 'name',
      type: 'text',
      default: '',
      label: 'Alert name',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
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
            params: [3, 'cannot be less than 3 characters'],
          },
          {
            key: 'max',
            params: [50, 'cannot be more than 50 characters'],
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
      seedType: 'distance',
      default: 200,
      label: 'Distance / ',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'number',
        required: false,
        rules: [
          {
            key: 'required',
            params: ['This field is required'],
          },
          {
            key: 'moreThan',
            params: [50, 'Can\'t be less than 50!'],
          },
          {
            key: 'max',
            params: [50000, 'cannot be more than 50000'],
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
      id: 'repeat',
      type: 'checkbox',
      default: false,
      label: 'Repeat every ',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'boolean',
        required: false,
        rules: [
        ],
      },
      uiStyle: {
        width: {
          xs: 12,
          sm: 6,
        },
        inputDesign: {
          labelPlacement: 'end',
        },
      },
    },
    {
      id: 'repeatDistance',
      type: 'number',
      seedType: 'distance',
      default: 200,
      label: 'distance /',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: {
        checkboxId: 'repeat',
        default: 'disabled',
      },
      validation: {
        type: 'number',
        required: false,
        rules: [
          {
            key: 'moreThan',
            params: [50, 'Can\'t be less than 50!'],
          },
          {
            key: 'max',
            params: [10000, 'cannot be more than 10000'],
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
          multiline: true,
          rows: 4,
        },
      },
    },
  ],
  dateAlert: [
    {
      id: 'name',
      type: 'text',
      default: '',
      label: 'Alert name',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
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
            params: [3, 'cannot be less than 3 characters'],
          },
          {
            key: 'max',
            params: [50, 'cannot be more than 50 characters'],
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
      id: 'alertDate',
      type: 'date',
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      label: 'Alert date',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'date',
        disableFuture: false,
        disablePast: true,
        required: true,
        rules: [
          {
            key: 'min',
            params: [() => new Date(), 'The date cannot be from the past!'],
          },
          {
            key: 'max',
            params: [() => new Date('01-01-2030'), 'Date cannot be greater than 01-01-2030'],
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
      id: 'repeat',
      type: 'checkbox',
      default: false,
      label: 'Repeat every',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: null,
      validation: {
        type: 'boolean',
        required: false,
        rules: [
        ],
      },
      uiStyle: {
        width: {
          xs: 12,
          sm: 6,
        },
        inputDesign: {
          labelPlacement: 'end',
        },
      },
    },
    {
      id: 'repeatTimes',
      type: 'number',
      default: 30,
      label: 'days',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: {
        checkboxId: 'repeat',
        default: 'disabled',
      },
      validation: {
        type: 'number',
        required: false,
        rules: [
          {
            key: 'moreThan',
            params: [10, 'Minimum days is 10'],
          },
          {
            key: 'max',
            params: [365, 'cannot be more than 365 days'],
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
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: null,
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
          multiline: true,
          rows: 4,
        },
      },
    },
  ],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
