const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPID_API_KEY!;
const RAPID_API_HOST = process.env.EXPO_PUBLIC_RAPID_API_HOST!;

export interface Data {
  __typename: string
  accessibilityString: any
  clusterId: any
  sectionType: string
  stableDiffingType: string
  trackingKey: string
  trackingTitle: string
  heading: Heading
  isSaved: any
  label: any
  saveId: any
  secondaryTextLineOne: SecondaryTextLineOne
  secondaryTextLineTwo: any
  graphic: Graphic
  trackingItems: TrackingItems
  geoId: number
}

export interface Heading {
  __typename: string
  htmlString: string
}

export interface SecondaryTextLineOne {
  __typename: string
  string: string
  debugValueKey: any
}

export interface Graphic {
  __typename: string
  circle: boolean
  icon: string
}

export interface TrackingItems {
  __typename: string
  dataType: string
  documentId: string
  placeType: string
  value: string
  buCategory: any
  locationId: number
  route: any
  suggestionType: any
  text: string
}


type GetAutoCompleteType = {
  message: string
  status: boolean
  data: Data[]
}

export const getAutoComplete = async (location: string): Promise<GetAutoCompleteType> => {
  const url = 'https://tripadvisor-com1.p.rapidapi.com/auto-complete';
  const searchParams = new URLSearchParams({
    query: location,
  });

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  });

  const json = await response.json();
  console.log('getAutoComplete', json);
  return json;
}

export const getFilters = async () => {
  const url = 'https://tripadvisor-com1.p.rapidapi.com/restaurants/get-filters';
  const stuff = '?geoId=1954828&units=miles';

  const searchParams = new URLSearchParams({
    geoId: '1954828',
    units: 'miles',
  });

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  });

  const json = await response.json();
  console.log('getFilters', json);
}