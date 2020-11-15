import Head from "next/head";
import Link from "next/link";
import { Button, Container, Icon } from "semantic-ui-react";

const Ticket = () => {
  return (
    <>
      <Head>Ticket Name - Zendesk Tickets</Head>
      <Container>
        <div>This is a Ticket.</div>
        <Link href="/">
          <Button animated>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default Ticket;
