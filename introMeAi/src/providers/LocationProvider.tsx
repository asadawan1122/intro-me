import React, { createContext, useContext, useState, useEffect } from 'react'
import BackgroundGeolocation from 'react-native-background-geolocation'
import Geolocation from '@react-native-community/geolocation'
import { useQuery } from '@apollo/client'
import { gqlUrl } from '../networking/environment'
import { USER_QUERY, APP_CONFIG } from '../networking/gql'
import { useAuth } from './AuthProvider'
import { useAppSelector } from '../store/store'
import { selectMove } from '../store/slices/move'
import { selectUser } from '../store/slices/user'
import { useActiveMove } from './ActiveMoveProvider'
import { getDataFromStorage, storeDataToStorage } from '../utils/storage'
import { Keys } from '../constants/keys'
import { locationConfig } from '../constants/location'
import { event } from 'react-native-reanimated'
const LocationContext = createContext({})

function LocationProvider({ children }) {
  const { user }: any = useAuth()
  const { activeMove }: any = useActiveMove()

  const loggedInUser: any = useAppSelector(selectUser)
  const move = useAppSelector(selectMove)
  const [location, setLocation] = useState()
  const [currentLocation, setCurrentLocation] = useState()
  const [appConfig, setAppConfig] = useState<any>()

  const { loading, error, data, refetch } = useQuery(
    APP_CONFIG,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: 1,
      },
    },
  )

  useEffect(() => {
    if (!data) { return }

    const fetchConfig = async () => {
      setAppConfig(data?.driverappconfig[0])
    }
    fetchConfig()
  }, [data])

  useEffect(() => {
    const execute = async () => {
      await restoreCurrentLocation()
    }
    execute()
  }, [])

  useEffect(() => {
    const updateLocation = async () => {
      if (currentLocation) {
        await storeDataToStorage(Keys.location, currentLocation)
      }
    }
    updateLocation()
  }, [currentLocation])

  useEffect(() => {
    // return
    if (!user || !loggedInUser || !activeMove || !appConfig) {
      return
    }
    // 1.  Wire up event-listeners
    //
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(onLocation, onError);
    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(onMotionChange);
    // autoSync
    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(onActivityChange);
    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(onProviderChange);
    BackgroundGeolocation.onHttp(onHttpRequest)

    BackgroundGeolocation.onEnabledChange(onEnabledChange);

    ////
    // 2.  Execute #ready method (required)
    //

    BackgroundGeolocation.ready(
      {
        autoSync: true,
        autoSyncThreshold: Math.floor(appConfig?.config?.gps_breadcrumb_interval_ms / 1000),
        batchSync: true,
        maxBatchSize: 50,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: appConfig?.config?.gps_breadcrumb_meters,
        notificationText: 'disable',
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      },
      (state) => {
        console.log('- 1 BackgroundGeolocation is configured and ready: ', state.enabled);
        if (!state.enabled) {
          // 3. Start tracking!
          BackgroundGeolocation.start(function () {
            console.log('1: LOCATION STARTED');
          });
        }
      },
    );
  }, [user, activeMove, loggedInUser, appConfig])
  // You must remove listeners when your component unmounts
  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      BackgroundGeolocation.removeListeners();
      // Anything in here is fired on component unmount.
    }
  }, [])

  const onLocation = async (event: any) => {
    let coords = event?.coords
    let battery = event?.battery
    saveCurrentLocation(coords)
    try {
      // "coordinates": [coords?.latitude, coords?.longitude]
      // "coordinates": [41.91073343, 20.91312531]
      BackgroundGeolocation.setConfig(
        {
          // Geolocation Config
          url: gqlUrl,
          autoSyncThreshold: Math.floor(appConfig?.config?.gps_breadcrumb_interval_ms / 1000),
          httpRootProperty: 'variables',
          params: {
            "query": "mutation driverApp_insertDriverLocationsBatch($breadcrumbs: [driverlocations_insert_input!] = {}) {insert_driverlocations(objects: $breadcrumbs) {affected_rows returning {id location }}}",
            "variables": {
              "breadcrumbs": [
                {
                  "time": event?.timestamp,
                  "location": {
                    "type": "Point",
                    "coordinates": [coords?.latitude, coords?.longitude]
                  },
                  "speed": coords?.speed,
                  "heading": coords?.heading,
                  "accuracy": coords?.accuracy,
                  "altitude": coords?.altitude,
                  "altitude_accuracy": coords?.altitude_accuracy,
                  "odometer": event?.odometer,
                  "id": event?.uuid,
                  "event": event?.event,
                  "activity_type": "in_vehicle",
                  "activity_confidence": 79,
                  "battery_level": Math.floor((battery?.level) * 100),
                  "battery_is_charging": battery?.is_charging,
                  "mock": false,
                  "is_moving": event?.is_moving,
                  "driver_id": loggedInUser?.driver?.id,
                  "move_id": activeMove?.id
                }
              ]
            }, 
            "operationName": "driverApp_insertDriverLocationsBatch"
          },
          headers: {
            authorization: `Bearer ${user?.token}`
          },
          distanceFilter: 0, //  appConfig?.config?.gps_breadcrumb_meters,
        })
    }
    catch (error) {
      console.log('MOTION EVENT ERROR------:', error)
    }
  }

  const onError = async (error: any) => {
    console.log('[location] ERROR -', error);
  }

  const onActivityChange = async (event: any) => {
    console.log('[activitychange] -', event); // eg: 'on_foot', 'still', 'in_vehicle'
  }

  const onProviderChange = async (provider: any) => {
    console.log('[providerchange] -', provider);
  }

  const onMotionChange = async (event: any) => {
    // console.log('[MOTION CHANGE LOCATION 2] -', event.location);
    console.log('[MOTION CHANGE]')
  }

  const onHttpRequest = async (httpResponse: any) => {
    console.log("[HTTP] CONFIG RESPONSE")
  }

  const onEnabledChange = async (event: any) => {
    console.log('[onEnabledChange] -', event)
  }

  const restoreCurrentLocation = async () => {
    try {
      //restore location from storage on start of application if is stored
      const coords = await getDataFromStorage(Keys.location)
      setCurrentLocation(coords)
    } catch (error) {
      console.error('Location fetching error : ', error)
    }
  }

  const startBackgroundLocation = async () => {
    BackgroundGeolocation.start(function () {
      console.log('LOCATION STARTED');
    });
  }

  const stopBackgroundLocation = async () => {
    try {
      BackgroundGeolocation.stop(async (res) => {
        console.log('LOCATION STOPPED, ', res)
      })
    } catch (error) {
      console.log('error:', error)
    }

  }

  const saveCurrentLocation = async (coords: any) => {
    setCurrentLocation(coords)
  }

  return <LocationContext.Provider value={{ location, currentLocation, startBackgroundLocation, stopBackgroundLocation }}>{children}</LocationContext.Provider>
}

const useLocation = () => useContext(LocationContext)

export { useLocation, LocationProvider }
