import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Roboto } from '@next/font/google'
import Logo from '@/shared/logo'
import { Collapse, Fade } from '@mui/material'

const roboto = Roboto({
  weight: '100',
  subsets: ['latin'],
})


export default function Home() {

  const [mobile, setMobile] = useState(false);

  const [descriptionVisible, setDescriptionVisibility] = useState(false);

    useEffect(() => {
      if(window.innerWidth < 800){
        setMobile(true);
      }
    }, [])


  return (
    <>
      <Head>
        <title>Classicum</title>
        <meta name="description" content="Classicum events. Join Classicum, the exclusive assosiation that unlocks the 
        secrets of Lucca's cultural scene with its enigmatic and avant-garde parties. Immerse yourself in an atmosphere 
        of mystery and allure as we lead you on a journey through the city's hidden gems, all while upholding our mission
         to preserve and promote the rich cultural heritage of Lucca.
        Come, let us awaken your senses and kindle your passion for the breathtaking classic way" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icon.png" />
        <link rel="manifest" href="/manifest.json"></link>




        
        <link href="splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
      </Head>
      <main className={[roboto.className, styles.main].join(" ")}>
        <div>
          <Logo title />
        </div>
        <div className={styles.description} onMouseOver={() => setDescriptionVisibility(true)} onMouseLeave={() => setDescriptionVisibility(false)}>
          {
            <Collapse in={descriptionVisible}>
              <div>
              Classicum is an esteemed association dedicated to the commemoration and exaltation of the rich cultural heritage and artistic magnificence of the illustrious city of Lucca. With the primary goal of engaging and inspiring the youth of the region, Classicum offers a comprehensive platform for showcasing the city&apos;s unparalleled art, history, and cultural traditions through an array of thoughtfully curated events and activities.
              </div>
              <div>
              From captivating music and dance performances to art exhibitions and historical tours, Classicum provides an immersive and engaging space for young people to connect with and appreciate the vibrant cultural tapestry of Lucca. By honoring the city&apos;s storied past and vibrant present, Classicum seeks to foster a deep sense of community pride and identity among its members and inspire a new generation of cultural enthusiasts. Through its unwavering commitment to the preservation and celebration of the city&apos;s cultural heritage, Classicum serves as a beacon of excellence and inspiration for all those who share a passion for the arts and culture.

              </div>
            </Collapse>
          }
          {
            <Fade in={!descriptionVisible}>
              <button onClick={() => null}>{"Ex nihilo nihil fit".toUpperCase()}</button>
            </Fade>
          }
        </div>
      </main>
    </>
  )
}
