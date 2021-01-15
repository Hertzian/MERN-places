import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
// import { AuthContext } from '../../shared/context/auth-context'

export const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers is the world!',
    imageUrl:
      'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous skyscrapers is the world!',
    imageUrl:
      'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 22,
  },
]

const UserPlaces = () => {
  // const auth = useContext(AuthContext)
  const [loadedPlaces, setLoadedPlaces] = useState(undefined)

  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const userId = useParams().userId

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        )

        setLoadedPlaces(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPlaces()
  }, [sendRequest, userId])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces}></PlaceList>
      )}
    </>
  )
}

export default UserPlaces
