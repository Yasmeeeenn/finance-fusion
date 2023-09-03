import { useState , useMutation } from 'react';

const Home = () => {
  const [formState, setFormState] = useState({
        loanTitle: '',
        loanPrincipal: '',
        interestRate: '',
        depositAmount: '',
        loanTerm: '',
        monthlyPayment: '',
      });
      const [characterCount, setCharacterCount] = useState(0);

      const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
          const { data } = await addThought({
            variables: { ...formState },
          });

          setFormState({
            loanTitle: '',
            loanPrincipal: '',
            interestRate: '',
            depositAmount: '',
            loanTerm: '',
            monthlyPayment: '',
          });
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'loanTerm' || name === 'interestRate') {
          // Handle calculations for monthlyPayments and totalAmount
          // You need to implement the calculation logic here
        }

        setFormState({ ...formState, [name]: value });
      };

  return (
    <div className='home'>
    <h1>Loan Calculator</h1>
    <p>🤓 ➕➗✖️🟰➖ ✨</p>

    <form
      className="flex-row justify-center justify-space-between-md align-center"
      onSubmit={handleFormSubmit}
    > 
      <div className="col-12"> 
        <p className='loan-fields'>Title</p>
        <input
          name="loanTitle"
          placeholder="Title of Loan"
          value={formState.loanTitle}
          className="form-input w-100"
          onChange={handleChange}
        />
      </div>
      <div className="col-12"> 
      <p className='loan-fields'>Loan Principal</p>
        <input
          name="loanPrincipal"
          placeholder="Principal Amount"
          value={formState.loanPrincipal}
          className="form-input w-100"
          onChange={handleChange}
        />
      </div>
      <div className="col-12"> 
      <p className='loan-fields'>Interest Rate</p>
        <input
          name="interestRate"
          placeholder="Interest Rate"
          value={formState.interestRate}
          className="form-input w-100"
          onChange={handleChange}
        /> 
      </div>
      <div className="col-12">
      <p className='loan-fields'>Down Payment</p>
        <input
          name="depositAmount"
          placeholder="Down Payment"
          value={formState.depositAmount}
          className="form-input w-100"
          onChange={handleChange}
        /> 
      </div>
      <div className="col-12">
      <p className='loan-fields'>Loan Term</p>
        <input
          name="loanTerm"
          placeholder="Duration of Loan"
          value={formState.loanTerm}
          className="form-input w-100"
          onChange={handleChange}
        />
        
      </div>
      <div className="col-12">
      <p className='loan-fields'>Payments</p>
        <input
          name="monthlyPayment"
          placeholder="Monthly Payments"
          value={formState.monthlyPayment}
          className="form-input w-100"
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-primary btn-block py-3" type="submit">
          CALCULATE
        </button>
      </div>
    </form>
  </div>
);
};

export default Home;
