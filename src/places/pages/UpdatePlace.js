import React from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import { DUMMY_PLACES } from './UserPlaces'

const UpdatePlace = () => {
  const placeId = useParams().placeId

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId)

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place!</h2>
      </div>
    )
  }

  return (
    <form>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE]}
        errorText='Please enter a valid title'
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min. 5 characters).'
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Button type='submit' disabled={true}>Update Place</Button>
    </form>
  )
}

export default UpdatePlace
