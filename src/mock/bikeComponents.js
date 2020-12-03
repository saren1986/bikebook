const bikeComponents = [
  {
    id: 'c1',
    bikeId: 'n1',
    retired: false,
    type: '1',
    brand: 'KMC',
    model: 'XC10',
    weight: 1000,
    startDate: '2019-11-16T13:40:29.089Z',
    distance: 220000,
    alerts: [
      {
        id: 1,
        name: 'Wyczyść łańcuch',
        description: 'Notatka',

        distanceAlert: true,
        startDistance: 10000,
        endDistance: 200000,

        dateAlert: false,
        endDate: null,

        triggered: true,
        requireAction: true,
        serviced: false,

        repeat: true,
        repeatedPeriod: 200 * 1000,
      },
      {
        id: 2,
        name: 'Zmiana opon',

        distanceAlert: true,
        startDistance: 10000,
        endDistance: 320000,

        dateAlert: false,
        endDate: null,

        triggered: false,
        requireAction: false,
        serviced: false,
        description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the.',
      },
      {
        id: 3,
        name: 'Ciśnienie w przednim kole do sprawdzenia stodole',
        description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the.',

        distanceAlert: false,
        startDistance: null,
        endDistance: null,

        dateAlert: true,
        endDate: '2020-12-16',

        triggered: false,
        requireAction: false,
        serviced: false,

        repeat: true,
        repeatedPeriod: 30,
      },
      {
        id: 4,
        name: 'Ciśnienie w tylnym kole',

        distanceAlert: false,
        startDistance: null,
        endDistance: null,

        dateAlert: true,
        endDate: '2020-11-05',

        triggered: false,
        requireAction: false,
        serviced: false,
        description: 'Notatka',
      },
    ],
    logs: [],
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
  },
  {
    id: 'c2',
    bikeId: 'n1',
    retired: false,
    type: '2',
    brand: 'Shimano',
    model: '105',
    weight: 1200,
    startDate: '2020-10-16T13:40:29.089Z',
    distance: 30000,
    alerts: [
      {
        id: 1,
        name: 'Wymiana opon',

        distanceAlert: true,
        startDistance: 10000,
        endDistance: 520000,

        dateAlert: false,
        endDate: null,

        triggered: true,
        requireAction: true,
        serviced: false,
        description: 'Notatka',
      },
      {
        id: 2,
        name: 'Test 2',

        distanceAlert: true,
        startDistance: 10000,
        endDistance: 320000,

        dateAlert: false,
        endDate: null,

        triggered: false,
        requireAction: false,
        serviced: false,
        description: 'Notatka',
      },
      {
        id: 3,
        name: 'Test 3',

        distanceAlert: false,
        startDistance: null,
        endDistance: null,

        dateAlert: true,
        endDate: '2020-12-16',

        triggered: false,
        requireAction: false,
        serviced: false,
        description: 'Notatka',
      },
      {
        id: 4,
        name: 'Test 4',

        distanceAlert: false,
        startDistance: null,
        endDistance: null,

        dateAlert: true,
        endDate: '2020-11-01',

        triggered: false,
        requireAction: false,
        serviced: false,
        description: 'Notatka',
      },
    ],
    logs: [],
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
  },
  {
    id: 'c3',
    bikeId: 'n1',
    retired: false,
    type: '3',
    brand: 'SRAM',
    model: 'DD',
    weight: 2050,
    startDate: '2019-12-16T13:40:29.089Z',
    distance: 13000,
    alerts: [],
    logs: [],
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
  },
  {
    id: 'c4',
    bikeId: 'n1',
    retired: true,
    type: '4',
    brand: 'KMC',
    model: 'XC10',
    weight: 3010,
    startDate: '2019-12-11T13:40:29.089Z',
    distance: 50000,
    alerts: [],
    logs: [],
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
  },
  {
    id: 'c5',
    bikeId: 'n2',
    retired: false,
    type: '5',
    brand: 'KMC',
    model: 'XC10',
    weight: 1010,
    startDate: '2017-12-11T13:40:29.089Z',
    distance: 2000,
    alerts: [],
    logs: [],
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
  },
  {
    id: 'c6',
    bikeId: 'n2',
    retired: false,
    type: '6',
    brand: 'KMC',
    model: 'XC10',
    weight: 3201,
    startDate: '2016-12-11T13:40:29.089Z',
    distance: 2000,
    alerts: [],
    logs: [],
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
  },
];

export default bikeComponents;
