import { useQuery } from '@apollo/client';
import LoginPage from './LoginPage';


const Home = () => {
  const [formState, setFormState] = useState({
        loanTitle: '',
        loanAmount: '',
        interestRate: '',
        downPayment: '',
        loanMonths: '',
        monthlyPayments: '',
        totalAmount: '',
      });
      const [characterCount, setCharacterCount] = useState(0);

      const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        refetchQueries: [QUERY_THOUGHTS, 'getThoughts'],
      });

      const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
          const { data } = await addThought({
            variables: { ...formState },
          });

          setFormState({
            loanTitle: '',
            loanAmount: '',
            interestRate: '',
            downPayment: '',
            loanMonths: '',
            monthlyPayments: '',
            totalAmount: '',
          });
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'loanAmount' || name === 'interestRate') {
          // Handle calculations for monthlyPayments and totalAmount
          // You need to implement the calculation logic here
        }

        setFormState({ ...formState, [name]: value });
      };

  return (
    <main>
      <div className="flex-row justify-center">
       
        <div className="col-12 col-md-8 mb-3">
      <div>
        <h3>Loan Calculator</h3>

        <p
          className={`m-0 ${
            characterCount === 280 || error ? 'text-danger' : ''
          }`}
        > 
          Character Count: {characterCount}/280
          {error && <span className="ml-2">That's not going to work!</span>}
        </p> Title
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        > 
          <div className="col-12"> 
            <input
              name="loanTitle"
              placeholder="Title of Loan"
              value={formState.loanTitle}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12"> Amount
            <input
              name="loanAmount"
              placeholder="Loan Amount"
              value={formState.loanAmount}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12"> Interest Rate
            <input
              name="interestRate"
              placeholder="Interest Rate"
              value={formState.interestRate}
              className="form-input w-100"
              onChange={handleChange}
            /> Down Payment
          </div>
          <div className="col-12">
            
            <input
              name="downPayment"
              placeholder="Down Payment"
              value={formState.downPayment}
              className="form-input w-100"
              onChange={handleChange}
            /> Duration of Loan
          </div>
          <div className="col-12">
            <input
              name="loanMonths"
              placeholder="Months"
              value={formState.loanMonths}
              className="form-input w-100"
              onChange={handleChange}
            />
            Payments
          </div>
          <div className="col-12">
            <input
              name="monthlyPayments"
              placeholder="Payments"
              value={formState.monthlyPayments}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            Amount that will be paid
            <input
              name="totalAmount"
              placeholder="Total Amount"
              value={formState.totalAmount}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-block py-3" type="submit">
              CALCULATE
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Review entry and try again...
            </div>
          )}
        </form>
      </div>



        </div>
      </div>
    </main>
  );
};

export default Home;
