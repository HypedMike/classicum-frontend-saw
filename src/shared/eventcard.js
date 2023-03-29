'use client'

import style from "../styles/cards.module.css";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";

export function EventCard(props){


    const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

    const getPrettyDate = (d) => {
        d = (new Date(d));
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    }

    return (
        <Card css={{ w: "300px", h: "300px", margin: "20px" }}>
            <Card.Header
                isblurred={"true"}
                css={{
                  position: "absolute",
                  bgBlur: "#0f111466",
                  borderBottom: "$borderWeights$light solid $gray800",
                  top: 0,
                  zIndex: 1,
                }}
            >
                <Col>
                    <Text color="white">
                        {"Evento privato " + getPrettyDate(props.event.date)}
                    </Text>
                </Col>
            </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={props.event.img}
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Relaxing app background"
          />
        </Card.Body>
        <Card.Footer
          isblurred
          css={{
            position: "absolute",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col>
                  <Text color="#d1d1d1" size={20}>
                    {props.event.name}
                  </Text>
                  <Text color="#d1d1d1" size={12}>
                    {props.event.description}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
            {
              Date.parse(props.event.date) < Date.now() ? 
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  disabled = {props.event.photos_link == null}
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                  onClick={() => {window.location.href = "/events/photos/" + props.event.photos_link}}
                >
                  <Col>
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Galleria
                  </Text>
                  </Col>
                </Button>
              </Row>
              :
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                  onClick={() => {window.location.href = props.event.book_link}}
                >
                  <Col>
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Iscriviti
                  </Text>
                  </Col>
                </Button>
              </Row>
            }
              
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    )

    return (
        <div className={style.eventcard} key={props.event.id}>
            <div className={style.card_img} style={{
                backgroundColor: "white",
                backgroundImage: "url(" + props.event.img + ")"
            }}>

            </div>
            <h2>{props.event.name}</h2>
            <div className={style.description}>
                {props.event.description}
            </div>
            {props.event.available && <button onClick={() => window.location.href = props.event.book_link}>Evento privato: ISCRIVITI <br></br> {getPrettyDate(props.event.date)}</button> || <button disabled>Non disponibile</button>}
        </div>
    )
}