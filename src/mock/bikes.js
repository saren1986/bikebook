const bikes = [
  {
    id: '1',
    StravaID: 'b1145059',
    name: 'KTM',
    resource_state: 3,
    distance: 11058280,
    brand_name: 'KTM',
    model_name: 'Strada',
    frame_type: 3,
    description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the ',
    components: [
      {
        id: 'c1',
        retired: false,
        type: 'chain',
        brand: 'KMC',
        model: 'XC10',
        weight: 1.01,
        startDate: '16-12-2019',
        initialDistance: 0,
        distance: 0,
        distanceAlert: 40000,
        description: 'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the. Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the',
      },
      {
        id: 'c2',
        retired: false,
        type: 'chain',
        brand: 'KMC',
        model: 'XC10',
        startDate: '16-12-2019',
        initialDistance: 50,
        distance: 1220,
        distanceAlert: 12200,
        weight: 1.01,
        description: 'text text text',
      },
      {
        id: 'c3',
        retired: true,
        type: 'chain',
        brand: 'KMC',
        model: 'XC10',
        startDate: '01-12-2019',
        retiredDate: '01-07-2020',
        initialDistance: 0,
        distance: 990,
        distanceAlert: 0,
        weight: 1.01,
      },
      {
        id: 'c4',
        retired: false,
        type: 'Front Tire',
        brand: 'schwalbe',
        model: 'ss',
        weight: '23.3',
        startDate: '2019-12-22',
        initialDistance: '0',
        description: '',
        distanceAlert: 100000,
        distance: 0,
      },
      {
        id: 'c5',
        retired: false,
        type: 'Stem',
        brand: 'elele',
        model: 'elele',
        weight: '33',
        startDate: '1',
        initialDistance: '0',
        description: 'test',
        distanceAlert: 0,
        distance: 11058280,
      },
      {
        id: 'c6',
        retired: false,
        type: 'Front Brake',
        brand: 'eee',
        model: 'eee',
        weight: '22',
        startDate: '1',
        initialDistance: '100',
        description: '',
        distanceAlert: 0,
        distance: 11158280,
      },
    ],
  },
  {
    id: '2',
    StravaID: 'b1145059',
    name: 'ROWEREK',
    resource_state: 3,
    distance: 11058280,
    brand_name: null,
    model_name: null,
    frame_type: 3,
    description: 'Opis',
    components: [
      {
        id: 'c100',
        retired: true,
        type: 'chain',
        brand: 'KMC',
        model: 'XC10',
        startDate: '01-12-2019',
        retiredDate: '01-07-2020',
        initialDistance: 0,
        distance: 990,
        distanceAlert: 0,
        weight: 1.01,
      },
    ],
  },
  {
    id: '3',
    StravaID: 'b1145059',
    name: 'STRZAŁA',
    resource_state: 3,
    distance: 11058280,
    brand_name: 'KTM',
    model_name: null,
    frame_type: 3,
    description: 'Opis',
    components: [],
  },
];

export default bikes;
