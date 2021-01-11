import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const activeHttpRequest = useRef([])

  const sedRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)

      const httpAbortCtrl = new AbortController()
      activeHttpRequest.current.push(httpAbortCtrl)

      try {
        const response = await fetch(url, {
          method: {
            method,
            body,
            headers,
            signal: httpAbortCtrl.signal
          },
        })

        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        return responseData
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => { // cleanup function
      activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort())
    }
  },[])

  return { isLoading, error, sedRequest, clearError }
}
