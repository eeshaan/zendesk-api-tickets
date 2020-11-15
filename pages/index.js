import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Container, Label, Pagination, Table } from "semantic-ui-react";

const Main = ({ tickets, users, groups }) => {
  const [page, setPage] = useState(1);
  const pageSize = 25;

  return (
    <>
      <Head>
        <title>Zendesk Tickets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Table celled selectable>
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
            {tickets.tickets
              .slice((page - 1) * pageSize, page * pageSize)
              .map((ticket) => (
                <Link
                  href={{
                    pathname: "/ticket",
                    query: {
                      id: ticket.id,
                      subject: ticket.subject,
                      desc: ticket.description,
                    },
                  }}
                  as={{
                    pathname: "/ticket",
                    query: {
                      id: ticket.id,
                    },
                  }}
                >
                  <Table.Row key={ticket}>
                    <Table.Cell collapsing>
                      <Label
                        ribbon
                        color={ticket.status === "open" ? "orange" : null}
                      >
                        {ticket.status.toUpperCase()}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>{ticket.id}</Table.Cell>
                    <Table.Cell>{ticket.subject}</Table.Cell>
                    <Table.Cell>
                      {
                        users.users.find(
                          (user) => user.id === ticket.requester_id
                        ).name
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(ticket.updated_at).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>
                      {
                        groups.groups.find(
                          (group) => group.id === ticket.group_id
                        ).name
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        users.users.find(
                          (user) => user.id === ticket.assignee_id
                        ).name
                      }
                    </Table.Cell>
                  </Table.Row>
                </Link>
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="12">
                <Pagination
                  floated="right"
                  onPageChange={(event, data) => {
                    setPage(data.activePage);
                  }}
                  firstItem={null}
                  lastItem={null}
                  totalPages={Math.ceil(tickets.tickets.length / pageSize)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
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

  const tickets = await get_tickets.json().catch((err) => {
    console.log(err);
  });
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
};

export default Main;
