import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Icon } from "semantic-ui-react";

const Ticket = () => {
  const router = useRouter();
  const {
    query: { subject, desc },
  } = router;

  return (
    <>
      <Head>Ticket Name - Zendesk Tickets</Head>
      <Container>
        <h2>{subject}</h2>
        <p>{desc}</p>
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
