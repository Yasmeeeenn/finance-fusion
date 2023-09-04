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

const SavedLoans = () => {
  const { username } = useParams();
  const { loading, error, data } = useQuery(GET_ME);
  const [removeLoan] = useMutation(REMOVE_LOAN)
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    console.error(error);
    return (
      <div>
        <h2>Error loading data</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const {me} = data
  console.log(me)
  let userData = me

  

  const handleDeleteLoan = async (loanId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      console.log('No Token')
      return false;
    }

    try {
      const {data} = await removeLoan({
        variables: {loanId}
      })

      console.log(data)

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
              console.log("Loan Data:", loan);
            return (
              <Col md="4">
                <Card key={loan.loanId} border='dark'>
                  <Card.Body>
                    <Card.Title>{loan.loanTitle ? loan.loanTitle : "Loan Title Not Available"}{console.log(loan.loanTitle)}</Card.Title>
                    <Card.Text>
                      Total Loan Amount: {loan.totalLoanAmount}
                      <br />
                      Loan Term: {loan.loanTerm}
                      <br />
                      Interest Rate: {loan.interestRate}
                      <br />
                      Total Interest: {loan.totalInterest}
                      <br />
                      Deposit Amount: {loan.depositAmount}
                      <br />
                      Created At: {loan.createdAt}
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

export default SavedLoans;