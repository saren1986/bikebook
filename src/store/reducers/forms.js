import * as actionTypes from '../actions/actionTypes';

const defaultState = {
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
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      default: '',
      label: 'Frame mass /',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: false,
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
      default: '',
      label: 'Distance / ',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      type: 'select',
      default: '',
      label: 'Component type',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      default: '',
      label: 'Weight /',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: false,
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
      default: new Date(),
      label: 'Installed',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: 'fromBegining',
      validation: {
        type: 'date',
        required: true,
        rules: [
          {
            key: 'min',
            params: ['2010-01-01', 'The date cannot be earlier than 2010'],
          },
          {
            key: 'max',
            params: [new Date(), 'The date cannot be from the future!'],
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
      default: 0,
      label: 'Distance / ',
      edit: {
        visible: false,
        editable: false,
      },
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      controlledBy: false,
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
      default: 1,
      label: 'Distance / ',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: false,
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
      controlledBy: false,
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
      default: new Date(),
      label: 'Activity date',
      edit: {
        visible: true,
        editable: true,
      },
      controlledBy: false,
      validation: {
        type: 'date',
        required: true,
        rules: [
          {
            key: 'min',
            params: ['2010-01-01', 'The date cannot be earlier than 2010'],
          },
          {
            key: 'max',
            params: [new Date(), 'The date cannot be from the future!'],
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
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
