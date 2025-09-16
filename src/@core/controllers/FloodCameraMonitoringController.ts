interface ICamera {
  id: string
  name: string
  url: string
  lng: number
  lat: number
  embed_url?: string
  flood_percentage: number
  status: string
  link: string
}

const cameras: ICamera[] = [
  {
    id: 'avenida-jk',
    name: 'Avenida JK - Centro',
    url: 'https://connect-92.servicestream.io:8050/bcc84c859ab7.m3u8',
    lng: -48.84799478818965,
    lat: -26.301488088946193,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/83e3785a96f4e4a6f4b92b74ecf6a398e54ef285998f4d130aefa755f4155d66896770236366590e3975f90e4a00',
    flood_percentage: 10,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'praca-da-bandeira',
    name: 'Praça da Bandeira - Centro',
    url: 'https://connect-120.servicestream.io:8050/e7f57bcc97a2.m3u8',
    lng: -48.843745058066915,
    lat: -26.301637239913898,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/8ee5d57ad06e2061f0f6903a7654f8922b2c26b9098bbe535182d9085e110faf78eb8772f018b50a712e92bd95e6',
    flood_percentage: 50,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'terminal-central',
    name: 'Terminal Central - Centro',
    url: 'https://connect-579.servicestream.io:8050/af40aca3a9f5.m3u8',
    lng: -48.844827710812304,
    lat: -26.301645718372086,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/5c66bc8e221159732d5bbe758995800a8aebedd43d116695a32d19ec28bde07188211f37c8b4243f221f4f1d0fff',
    flood_percentage: 80,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'rio-cachoeira-terminal-norte',
    name: 'Rio Cachoeira - Terminal Norte',
    url: 'https://connect-92.servicestream.io:8050/85148626746f.m3u8',
    lng: -48.84981079761562,
    lat: -26.272573511196754,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/31237a32ad9912f2e817708c1875a9058fece000d303b4943f356db1a958ec17b39ada66462fdb3fcb917fd6486a',
    flood_percentage: 10,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'leopoldo-beninca',
    name: 'Rua Leopoldo Beninca - Águas Vermelhas',
    url: 'https://connect-369.servicestream.io:8050/74117f48e66e.m3u8',
    lng: -48.89619558776599,
    lat: -26.292079675592188,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/c654b0714cc1a080db45a60678ecc951af3e8a531847756b9ab1b3f916a32869207aa363704fd9b5967a4aadf178',
    flood_percentage: 50,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: '6-de-janeiro',
    name: 'Paranaguamirim: Rua 6 de Janeiro',
    url: 'https://connect-451.servicestream.io:8050/6272496274c1.m3u8',
    lng: -48.79105942168681,
    lat: -26.346719706566272,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/984be5c620e7d2cc5571aa84f560b11558c4c2fd5ebf6ee547a55f579a5ebbeb05898dc008437e2124498ed96e8b',
    flood_percentage: 80,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'minas-gerais',
    name: 'Rio Águas Vermelhas: Rua Minas Gerais',
    url: 'https://connect-524.servicestream.io:8050/84b8b97bcdde.m3u8',
    lng: -48.889186970324765,
    lat: -26.337840010970712,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/39858ef78be1f3117cd2dbd2f343bd3eabd9137fe6365ee64a99f7e316d07f4a08c50b51833b52e28c12288efde6',
    flood_percentage: 10,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'rio-do-braço',
    name: 'Rio do Braço: Jardim Sofia',
    url: 'https://connect-524.servicestream.io:8050/9980ca324f48.m3u8',
    lng: -48.834506504574115,
    lat: -26.240114194675723,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/7d2551870cb4ca9f5a27b84391243775eaedad995dfd7e181d5430a000f0833961ba58cfcd5dbb88c9dd431cfc74',
    flood_percentage: 50,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'ponte-quiriri',
    name: 'Rio Cubatão: Ponte Quiriri',
    url: 'https://connect-524.servicestream.io:8050/d350ed83141b.m3u8',
    lng: -49.01251736504492,
    lat: -26.147494911589785,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/0036bc1e904dd525448d9ae00a3c6fed7376e4205484fe2c01dc6f0392e657822c55cbf8e2775fc904a95b7f8013',
    flood_percentage: 80,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'rio-cubatao',
    name: 'Rio Cubatão: Canal',
    url: 'https://connect-92.servicestream.io:8050/3ab8e7fd6566.m3u8',
    lng: -48.90778497207297,
    lat: -26.19535630390123,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/2e10c3f047ee6c80ae1ab16007263263006deedc08b2cf0fd401f43ee84bd4f9bea27d13f154969fea863650e16f',
    flood_percentage: 10,
    status: 'Online',
    link: '/cameras',
  },
  {
    id: 'rio-cachoeira-prefeitura',
    name: 'Rio Cachoeira: Prefeitura',
    url: 'https://connect-272.servicestream.io:8050/919bd92b8436.m3u8',
    lng: -48.84109469618179,
    lat: -26.30181422755672,
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/e4fc2988b4bd8f292163de0ac6e46d6074bc223d3b9d096f645050e97eed3161c94abc6827cebb53bc924e4ed1b8',
    flood_percentage: 50,
    status: 'Online',
    link: '/cameras',
  },
]

export default cameras
