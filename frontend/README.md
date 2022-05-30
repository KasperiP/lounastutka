# Solidabis koodihaaste 2022

## Toteutuksesta:

Frontend toteutettu käyttäen Next.js React-frameworkkia. Päädyin tähän ratkaisuun, koska Next tuo ns "vanilla" Reactin päälle kivoja ominaisuuksia, kuten kansiorakenteeseen perustuvan routetuksen "out of the box". Tässä toteutuksessa Nextin kaikista kuumimmat ominaisuuden eivät tule juurikaan esille (ssr, isr), joten myös perus Reactilla olisi voinut saavuttaa saman ratkaisun. Olen kommentoinut koodiin **suomeksi** hieman ajatuksenjuoksuani joissakin kohdissa.

Bäkkäriin en tehnyt muutoksia, koska Java skills 404. Bäkkärin puolella olisi kuitenkin syytä tehdä muutoksia, mikäli tästä olisi halunnut paremman.

Toteutus on hostattuna VPS-palvelimellani: https://koodihaaste.kassq.dev/

## Käynnistys / käyttö:

###### Huomioita:

- Node.js 16+ vaadittu
- yarn-paketinhallintatyökalu

###### Asennus:

1. Kloonaa repository

```
git clone https://github.com/KasperiP/lounastutka.git
```

2. Asenna riippuvuudet frontend hakemistossa

```
cd frontend && yarn
```

Testit voi ajaa komennolla `yarn test` .

2. Käynnistä backend sen omien ohjeiden mukaan (docker / gradlew)

3. Käynnistä frontend

```
yarn dev
```

4. Navigoi sivulle selaimessa: http://localhost:3000

## Teknologiat:

- Next.js 12.1.6 (React 18.1.0)
- Material UI
- Jest