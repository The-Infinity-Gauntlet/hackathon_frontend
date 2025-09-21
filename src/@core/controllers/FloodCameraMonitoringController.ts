// Minimal camera info for Mapbox markers only
interface IMapCamera {
    id: string
    name: string
    lng: number
    lat: number
}

const cameras: IMapCamera[] = [
    {
        id: 'avenida-jk',
        name: 'Avenida JK - Centro',
        lng: -48.84799478818965,
        lat: -26.301488088946193,
    },
    {
        id: 'praca-da-bandeira',
        name: 'Praça da Bandeira - Centro',
        lng: -48.843745058066915,
        lat: -26.301637239913898,
    },
    {
        id: 'terminal-central',
        name: 'Terminal Central - Centro',
        lng: -48.844827710812304,
        lat: -26.301645718372086,
    },
    {
        id: 'rio-cachoeira-terminal-norte',
        name: 'Rio Cachoeira - Terminal Norte',
        lng: -48.84981079761562,
        lat: -26.272573511196754,
    },
    {
        id: 'leopoldo-beninca',
        name: 'Rua Leopoldo Beninca - Águas Vermelhas',
        lng: -48.89619558776599,
        lat: -26.292079675592188,
    },
    {
        id: '6-de-janeiro',
        name: 'Paranaguamirim: Rua 6 de Janeiro',
        lng: -48.79105942168681,
        lat: -26.346719706566272,
    },
    {
        id: 'minas-gerais',
        name: 'Rio Águas Vermelhas: Rua Minas Gerais',
        lng: -48.889186970324765,
        lat: -26.337840010970712,
    },
    {
        id: 'rio-do-braço',
        name: 'Rio do Braço: Jardim Sofia',
        lng: -48.834506504574115,
        lat: -26.240114194675723,
    },
    {
        id: 'ponte-quiriri',
        name: 'Rio Cubatão: Ponte Quiriri',
        lng: -49.01251736504492,
        lat: -26.147494911589785,
    },
    {
        id: 'rio-cubatao',
        name: 'Rio Cubatão: Canal',
        lng: -48.90778497207297,
        lat: -26.19535630390123,
    },
    {
        id: 'rio-cachoeira-prefeitura',
        name: 'Rio Cachoeira: Prefeitura',
        lng: -48.84109469618179,
        lat: -26.30181422755672,
    },
]

export default cameras
