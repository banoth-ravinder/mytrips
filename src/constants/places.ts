export interface PlaceInterface {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  start_date: string;
  description: string;
}

const PLACES = <PlaceInterface[]>[
  {
    name: 'Charminar, India',
    latitude: 17.361681, 
    longitude: 78.474501,
    type: 'hometown',
    start_date: '1997-14-07',
    description: 'The city I was born',
  },
  {
    name: 'SR edu center, India',
    latitude: 17.993887,
    longitude:  79.538789,
    type: 'hometown',
    start_date: '2012-04-30',
    description: 'primary education',
  },
  {
    name: 'Bangkok',
    latitude: 13.826442,
    longitude: 100.568305,
    type: 'travel',
    start_date: '2018-02-02',
    description:
      'Traveling place ',
  },
  {
    name: 'Toyoda, Japan',
    latitude: 35.659432,
    longitude:  139.381774,
    type: 'hometown',
    start_date: '2018-09-26',
    description: 'Started life in japan',
  },
  {
    name: 'Statue of Liberty National Monument',
    latitude: 40.700920, 
    longitude: -74.051299,
    type: 'visit',
    start_date: '2020-09-22',
    description: 'Best place to travel',
  },
  {
    name: 'Eiffel tower',
    latitude: 48.858224,
    longitude:  2.295723,
    type: 'visit',
    start_date: '2020-11-03',
    description: 'Best place to travel',
  },
  {
    name: 'Malaysia',
    latitude: 3.094024, 
    longitude: 101.612823,
    type: 'travel',
    start_date: '2021-02-02',
    description:
      'Traveling place ',
  },
];

export default PLACES;
