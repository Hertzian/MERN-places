import { useState } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import Card from '../../shared/components/UIElements/Card'
import { useForm } from '../../shared/hooks/form-hook'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import './Auth.css'

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      )
    }
    setIsLoginMode((prevMode) => !prevMode)
  }

  const authSubmitHandler = (event) => {
    event.preventDefault()
    console.log('login...')
    console.log(formState.inputs)
  }

  return (
    <Card className='authentication'>
      <h2>{isLoginMode ? 'Welcome again!' : 'Signup'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your name'
            validators={[VALIDATOR_REQUIRE]}
            errorText='Please enter a valid name'
            onInput={inputHandler}
          />
        )}
        <Input
          id='email'
          element='input'
          type='email'
          label='Email'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email.'
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText='Please enter a valid password (at least 6 characters).'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? 'Login' : 'Signup'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLoginMode ? 'Signup' : 'Login'}
      </Button>
    </Card>
  )
}

export default Auth
