import Head from "next/head";
import { Container, Icon, Label, Menu, Table } from "semantic-ui-react";

function Main({ tickets, users, groups }) {
  return (
    <>
      <Head>
        <title>Zendesk Tickets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Subject</Table.HeaderCell>
              <Table.HeaderCell>Requester</Table.HeaderCell>
              <Table.HeaderCell>Requester updated</Table.HeaderCell>
              <Table.HeaderCell>Group</Table.HeaderCell>
              <Table.HeaderCell>Assignee</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tickets.tickets.map((ticket) => (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>{ticket.status.toUpperCase()}</Label>
                </Table.Cell>
                <Table.Cell>{ticket.id}</Table.Cell>
                <Table.Cell>{ticket.subject}</Table.Cell>
                <Table.Cell>
                  {
                    users.users.find((user) => user.id === ticket.requester_id)
                      .name
                  }
                </Table.Cell>
                <Table.Cell>
                  {new Date(ticket.updated_at).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {
                    groups.groups.find((group) => group.id === ticket.group_id)
                      .name
                  }
                </Table.Cell>
                <Table.Cell>
                  {
                    users.users.find((user) => user.id === ticket.assignee_id)
                      .name
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="12">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const get_tickets = await fetch(
    `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2/tickets.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.USING_API_AUTH === "true"
              ? `${process.env.EMAIL}/token:${process.env.API_TOKEN}`
              : `${process.env.EMAIL}:${process.env.PASSWORD}`
          ).toString("base64"),
      },
    }
  );

  const get_users = await fetch(
    `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2/users.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.USING_API_AUTH === "true"
              ? `${process.env.EMAIL}/token:${process.env.API_TOKEN}`
              : `${process.env.EMAIL}:${process.env.PASSWORD}`
          ).toString("base64"),
      },
    }
  );

  const get_groups = await fetch(
    `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2/groups.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.USING_API_AUTH === "true"
              ? `${process.env.EMAIL}/token:${process.env.API_TOKEN}`
              : `${process.env.EMAIL}:${process.env.PASSWORD}`
          ).toString("base64"),
      },
    }
  );

  const tickets = await get_tickets.json();
  const users = await get_users.json();
  const groups = await get_groups.json();

  return {
    props: {
      tickets,
      users,
      groups,
    },
    revalidate: 5, // check for updates every 5 seconds at most
  };
}

export default Main;
