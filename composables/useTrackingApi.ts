export default async function (endpoint: string, {method, body}: { method: 'GET'|'POST'|'PUT'|'DELETE', body?:{ [key: string]: string } 
}) {

  try {

      const response = await fetch(`http://localhost:4000${endpoint}`, {
          method,
          headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
          },


          ...body && {
            body: JSON.stringify(body)  // Convert body to JSON string for POST, PUT requests
          }
      })

      if (!response.ok) throw new Error('Une erreur est survenue')

      return await response.json()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return null
  }

  // return ...
}