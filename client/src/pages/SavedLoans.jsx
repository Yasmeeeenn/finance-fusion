import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { useQuery , useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { saveLoanIds , getSavedLoanIds, removeLoanId } from '../utils/localStorage';
import { REMOVE_LOAN } from '../utils/mutations';

const savedLoans = () => {
  const { username } = useParams();
  const { loading, error, data } = useQuery(GET_ME, {
    variables: {username}
  });
  const [removeLoan] = useMutation(REMOVE_LOAN)
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  const {me} = data
  console.log(me)
  let userData = me

  const handleDeleteLoan = async (loanId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }

    try {
      const {data} = await removeLoan({
        variables: {loanId}
      })

      console.log(data)
      let userData = data

      removeLoanId(loanId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved loans!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedLoans.length
            ? `Viewing ${userData.savedLoans.length} saved ${userData.savedLoans.length === 1 ? 'loan' : 'loans'}:`
            : 'You have no saved loans!'}
        </h2>
        <Row>
          {userData.savedLoans.map((loan) => {
            return (
              <Col md="4">
                <Card key={loan.loanId} border='dark'>
                  <Card.Body>
                    <Card.Title>{loan.loanPrinciple}</Card.Title>
                    <Card.Text>
                        {loan.totalLoanAmount}
                        {loan.loanTerm}
                        {loan.interestRate}
                        {loan.totalInterest}
                        {loan.depositAmount}
                        {loan.createdAt}
                    </Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteLoan(loan.loanId)}>
                      Delete this Loan!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default savedLoans;